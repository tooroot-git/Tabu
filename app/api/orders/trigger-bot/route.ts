import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

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
      `Manual trigger: Sending order ${order.id} to bot service (attempt ${retryCount + 1}/${MAX_RETRIES}):`,
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

    console.log(`Manual trigger: Order ${order.id} successfully sent to bot service`)
    return true
  } catch (err: any) {
    console.error(
      `Manual trigger: Error sending order ${order.id} to bot service (attempt ${retryCount + 1}/${MAX_RETRIES}):`,
      err,
    )

    // If we haven't reached max retries, try again
    if (retryCount < MAX_RETRIES - 1) {
      console.log(`Manual trigger: Retrying order ${order.id}...`)
      // Exponential backoff: 1s, 2s, 4s...
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retryCount)))
      return sendOrderToBot(order, retryCount + 1)
    }

    console.error(
      `Manual trigger: Max retry attempts reached for order ${order.id}. Order will need to be processed manually.`,
    )
    return false
  }
}

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 })
    }

    // Get the order details from Supabase
    const supabase = createClient()
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (error || !order) {
      console.error("Error fetching order:", error)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Send order to bot service
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

      return NextResponse.json({ success: true, message: "Order sent to bot service successfully" })
    } else {
      await supabase
        .from("orders")
        .update({
          bot_processing_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)

      return NextResponse.json(
        { success: false, message: "Failed to send order to bot service after multiple attempts" },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Error triggering bot:", error)
    return NextResponse.json({ error: error.message || "Error triggering bot" }, { status: 500 })
  }
}
