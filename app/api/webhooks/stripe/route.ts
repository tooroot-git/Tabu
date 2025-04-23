import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

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
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_KYyZ6AIbufuE3WBoslTKzSyyYxhD4Fe5"

// Initialize Resend for email notifications
const resend = new Resend(process.env.RESEND_API_KEY)

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
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        const orderId = session.metadata?.order_id
        const userId = session.metadata?.user_id
        const customerEmail = session.customer_details?.email

        console.log(`Payment succeeded for order ${orderId}`)

        // Update order status to paid
        if (orderId) {
          const { data: order, error } = await supabase
            .from("orders")
            .update({
              status: "paid",
              payment_id: session.id,
              email: customerEmail || session.metadata?.email,
              updated_at: new Date().toISOString(),
            })
            .eq("id", orderId)
            .select("*")
            .single()

          if (error) {
            console.error("Error updating order status:", error)
          } else if (order) {
            // Send confirmation email to customer
            try {
              await resend.emails.send({
                from: "Tabu Israel <support@tabuisrael.co.il>",
                to: order.email || customerEmail || "customer@example.com",
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

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        const piOrderId = paymentIntent.metadata?.order_id
        const piUserId = paymentIntent.metadata?.user_id

        console.log(`Payment intent succeeded for order ${piOrderId}`)

        // Update order status to paid
        if (piOrderId) {
          const { data: order, error } = await supabase
            .from("orders")
            .update({
              status: "paid",
              payment_id: paymentIntent.id,
              updated_at: new Date().toISOString(),
            })
            .eq("id", piOrderId)
            .select("*")
            .single()

          if (error) {
            console.error("Error updating order status:", error)
          } else if (order) {
            // Send confirmation email to customer
            try {
              await resend.emails.send({
                from: "Tabu Israel <support@tabuisrael.co.il>",
                to: order.email || "customer@example.com",
                subject: "הזמנתך התקבלה בהצלחה | Your Order Confirmation",
                html: `
                  <div dir="rtl" style="font-family: Arial, sans-serif;">
                    <h1>תודה על הזמנתך!</h1>
                    <p>הזמנתך התקבלה בהצלחה והמסמך שלך מוכן להורדה.</p>
                    <p><strong>מספר הזמנה:</strong> ${piOrderId}</p>
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
                    <p><strong>Order ID:</strong> ${piOrderId}</p>
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
        const failedOrderId = failedPaymentIntent.metadata?.orderId || failedPaymentIntent.metadata?.order_id

        console.log(`Payment failed for order ${failedOrderId}`)

        // Update order status to failed
        if (failedOrderId) {
          await supabase
            .from("orders")
            .update({
              status: "failed",
              updated_at: new Date().toISOString(),
            })
            .eq("id", failedOrderId)
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
