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
      // No Stripe customer found, return empty payment methods
      return NextResponse.json({ paymentMethods: [] })
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2023-10-16",
    })

    // Fetch payment methods from Stripe
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerData.stripe_customer_id,
      type: "card",
    })

    // Get default payment method
    const customer = await stripe.customers.retrieve(customerData.stripe_customer_id)
    const defaultPaymentMethodId = customer.invoice_settings?.default_payment_method

    // Mark default payment method
    const paymentMethodsWithDefault = paymentMethods.data.map((method) => ({
      ...method,
      isDefault: method.id === defaultPaymentMethodId,
    }))

    return NextResponse.json({ paymentMethods: paymentMethodsWithDefault })
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 })
  }
}
