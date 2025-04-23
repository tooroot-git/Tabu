import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    // Get session to verify authentication
    const session = await getSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { amount, block, parcel, subparcel, service_type, email } = body

    if (!amount || !block || !parcel || !service_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new order in Supabase
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: session.user.sub,
        block,
        parcel,
        subparcel,
        service_type,
        price: amount,
        status: "pending",
        email: email || session.user.email,
      })
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "ils",
      metadata: {
        orderId: order.id,
        userId: session.user.sub,
        block,
        parcel,
        subparcel: subparcel || "",
        service_type,
      },
    })

    // Update order with payment intent ID
    await supabase.from("orders").update({ payment_intent_id: paymentIntent.id }).eq("id", order.id)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
