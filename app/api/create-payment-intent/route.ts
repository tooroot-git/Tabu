import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.stripe_api_key || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const { amount, description } = await request.json()

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amounts in cents
      currency: "ils",
      description,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 })
  }
}
