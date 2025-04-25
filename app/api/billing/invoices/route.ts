import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Stripe from "stripe"

export async function GET() {
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

    // Get Stripe customer ID
    const { data: customerData } = await supabase
      .from("customers")
      .select("stripe_customer_id")
      .eq("user_id", session.user.id)
      .single()

    if (!customerData?.stripe_customer_id) {
      // No Stripe customer found, return empty invoices
      return NextResponse.json({ invoices: [] })
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2023-10-16",
    })

    // Fetch invoices from Stripe
    const invoices = await stripe.invoices.list({
      customer: customerData.stripe_customer_id,
      limit: 10,
    })

    return NextResponse.json({ invoices: invoices.data })
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 })
  }
}
