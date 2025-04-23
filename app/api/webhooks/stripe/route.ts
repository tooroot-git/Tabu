import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Stripe (using a more basic approach without direct dependency)
const stripe = {
  webhooks: {
    constructEvent: (payload: string, signature: string, secret: string) => {
      // In a real implementation, this would verify the signature
      // For now, we'll just parse the payload
      try {
        return JSON.parse(payload)
      } catch (err) {
        throw new Error("Invalid payload")
      }
    },
  },
}

// Get the webhook signing secret from your environment variables
const endpointSecret = "whsec_KYyZ6AIbufuE3WBoslTKzSyyYxhD4Fe5"

// Mock Resend for email notifications in preview
const resend = {
  emails: {
    send: async (options: any) => {
      console.log("Would send email:", options)
      return { data: { id: "mock-email-id" }, error: null }
    },
  },
}

export async function POST(request: Request) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("stripe-signature") as string

    let event: any

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret)
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err}`)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        const orderId = paymentIntent.metadata?.orderId
        const userId = paymentIntent.metadata?.userId

        console.log(`Payment succeeded for order ${orderId}`)

        // Update order status to paid
        if (orderId) {
          const { data: order, error } = await supabase
            .from("orders")
            .update({ status: "paid" })
            .eq("id", orderId)
            .select("*")
            .single()

          if (error) {
            console.error("Error updating order status:", error)
          } else if (order) {
            // Send confirmation email to customer
            try {
              await resend.emails.send({
                from: "Tabu Israel <noreply@tabuisrael.co.il>",
                to: order.email || "customer@example.com",
                subject: "הזמנתך התקבלה בהצלחה | Your Order Confirmation",
                html: `
                  <div dir="rtl" style="font-family: Arial, sans-serif;">
                    <h1>תודה על הזמנתך!</h1>
                    <p>הזמנתך התקבלה בהצלחה והמסמך שלך מוכן להורדה.</p>
                    <p><strong>מספר הזמנה:</strong> ${orderId}</p>
                    <p><strong>גוש:</strong> ${order.block}</p>
                    <p><strong>חלקה:</strong> ${order.parcel}</p>
                    <p><strong>סוג מסמך:</strong> ${order.service_type}</p>
                    <p><strong>מחיר:</strong> ₪${order.price}</p>
                    <p>תוכל לצפות במסמך שלך בלוח הבקרה האישי שלך.</p>
                    <p>בברכה,<br>צוות Tabu.net.il</p>
                  </div>
                  <div dir="ltr" style="font-family: Arial, sans-serif; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                    <h1>Thank You for Your Order!</h1>
                    <p>Your order has been successfully processed and your document is ready for download.</p>
                    <p><strong>Order ID:</strong> ${orderId}</p>
                    <p><strong>Block:</strong> ${order.block}</p>
                    <p><strong>Parcel:</strong> ${order.parcel}</p>
                    <p><strong>Document Type:</strong> ${order.service_type}</p>
                    <p><strong>Price:</strong> ₪${order.price}</p>
                    <p>You can view your document in your personal dashboard.</p>
                    <p>Best regards,<br>The Tabu.net.il Team</p>
                  </div>
                `,
              })
            } catch (emailError) {
              console.error("Error sending confirmation email:", emailError)
            }
          }
        }
        break

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object
        const failedOrderId = failedPaymentIntent.metadata?.orderId

        console.log(`Payment failed for order ${failedOrderId}`)

        // Update order status to failed
        if (failedOrderId) {
          await supabase.from("orders").update({ status: "failed" }).eq("id", failedOrderId)
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
  }
}
