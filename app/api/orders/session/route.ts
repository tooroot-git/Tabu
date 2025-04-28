import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/utils/supabase/server"
import { updateOrderStatus } from "@/lib/orders"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Get the order ID from the session metadata
    const orderId = session.metadata?.orderId

    if (!orderId) {
      return NextResponse.json({ error: "Order ID not found in session metadata" }, { status: 404 })
    }

    // Get the order details from Supabase
    const supabase = createClient()
    const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (error || !order) {
      console.error("Error fetching order:", error)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update order status if payment was successful
    if (session.payment_status === "paid" && order.status !== "completed") {
      await updateOrderStatus(orderId, "completed", session.id)
      order.status = "completed"
    }

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error("Error processing session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
