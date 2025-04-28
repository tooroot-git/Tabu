import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { constructEventFromPayload } from "@/lib/stripe"

// Maximum number of retry attempts
const MAX_RETRIES = 3

// Helper function to send order to bot with retries
async function sendOrderToBot(order: any, retryCount = 0): Promise<boolean> {
  try {
    // Determine search type based on available fields
    const searchType = order.street && order.city ? "address" : "block"

    // Prepare payload based on the search type
    const payload = {
      user_id: order.user_id || "",
      email: order.email || "",
      search_type: searchType,
      city: searchType === "address" ? order.city || "" : "",
      street: searchType === "address" ? order.street || "" : "",
      house_number: searchType === "address" ? order.house_number || "" : "",
      block: searchType === "block" ? order.block || "" : "",
      parcel: searchType === "block" ? order.parcel || "" : "",
      subparcel: searchType === "block" ? order.subparcel || "" : "",
      service_type: order.service_type || "regular",
    }

    console.log(
      `Webhook: Sending order ${order.id} to bot service (attempt ${retryCount + 1}/${MAX_RETRIES}):`,
      payload,
    )

    const botServiceUrl = "https://order.tabuisrael.co.il/run-order"
    const response = await fetch(botServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed with status: ${response.status}`)
    }

    console.log(`Webhook: Order ${order.id} successfully sent to bot service`)
    return true
  } catch (err: any) {
    console.error(
      `Webhook: Error sending order ${order.id} to bot service (attempt ${retryCount + 1}/${MAX_RETRIES}):`,
      err,
    )

    // If we haven't reached max retries, try again
    if (retryCount < MAX_RETRIES - 1) {
      console.log(`Webhook: Retrying order ${order.id}...`)
      // Exponential backoff: 1s, 2s, 4s...
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retryCount)))
      return sendOrderToBot(order, retryCount + 1)
    }

    console.error(
      `Webhook: Max retry attempts reached for order ${order.id}. Order will need to be processed manually.`,
    )
    return false
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("stripe-signature") as string

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
    }

    // Verify the webhook signature and parse the event
    let event
    try {
      event = await constructEventFromPayload(payload, signature)
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Initialize Supabase client with service role key for admin access
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase credentials")
    }

    const supabase = createClient()

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const orderId = session.metadata?.order_id
        const customerEmail = session.customer_details?.email || session.metadata?.email

        console.log(`Payment succeeded for order ${orderId}`)

        if (!orderId) {
          console.error("Missing order_id in session metadata")
          return NextResponse.json({ error: "Missing order ID" }, { status: 400 })
        }

        // Update order status to paid
        const { data: order, error } = await supabase
          .from("orders")
          .update({
            status: "paid",
            payment_id: session.id,
            email: customerEmail,
            updated_at: new Date().toISOString(),
          })
          .eq("id", orderId)
          .select("*")
          .single()

        if (error) {
          console.error("Error updating order status:", error)
          return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
        }

        // Send order to bot service
        if (order) {
          const botSuccess = await sendOrderToBot(order)

          // Update order status based on bot processing result
          if (botSuccess) {
            await supabase
              .from("orders")
              .update({
                bot_processing_status: "sent",
                updated_at: new Date().toISOString(),
              })
              .eq("id", orderId)
          } else {
            await supabase
              .from("orders")
              .update({
                bot_processing_status: "failed",
                updated_at: new Date().toISOString(),
              })
              .eq("id", orderId)
          }
        }

        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object
        const orderId = paymentIntent.metadata?.order_id

        console.log(`Payment failed for order ${orderId}`)

        if (orderId) {
          // Update order status to failed
          await supabase
            .from("orders")
            .update({
              status: "payment_failed",
              updated_at: new Date().toISOString(),
            })
            .eq("id", orderId)
        }

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: error.message || "Error processing webhook" }, { status: 500 })
  }
}
