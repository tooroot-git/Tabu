import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Stripe from "stripe"

export async function POST() {
  try {
    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies })

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2023-10-16",
    })

    // Get or create Stripe customer
    const { data: customerData } = await supabase
      .from("customers")
      .select("stripe_customer_id")
      .eq("user_id", session.user.id)
      .single()

    let customerId = customerData?.stripe_customer_id

    if (!customerId) {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          supabase_user_id: session.user.id,
        },
      })

      customerId = customer.id

      // Save the customer ID to the database
      await supabase.from("customers").insert({
        user_id: session.user.id,
        stripe_customer_id: customerId,
      })
    }

    // Create a SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
    })

    return NextResponse.json({ clientSecret: setupIntent.client_secret })
  } catch (error) {
    console.error("Error creating setup intent:", error)
    return NextResponse.json({ error: "Failed to create setup intent" }, { status: 500 })
  }
}
