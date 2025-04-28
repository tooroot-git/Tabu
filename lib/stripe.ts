import Stripe from "stripe"

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export interface CreateCheckoutOptions {
  orderId: string
  userId?: string
  email: string
  amount: number
  description: string
  metadata?: Record<string, string>
}

export async function createCheckoutSession({
  orderId,
  userId,
  email,
  amount,
  description,
  metadata = {},
}: CreateCheckoutOptions) {
  try {
    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ils",
            product_data: {
              name: description,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment?canceled=true`,
      customer_email: email,
      metadata: {
        order_id: orderId,
        user_id: userId || "guest",
        ...metadata,
      },
    })

    return { sessionId: session.id, url: session.url }
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    throw new Error(`Error creating checkout session: ${error.message}`)
  }
}

export async function retrieveCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "line_items"],
    })
    return session
  } catch (error: any) {
    console.error("Error retrieving checkout session:", error)
    throw new Error(`Error retrieving checkout session: ${error.message}`)
  }
}

export async function constructEventFromPayload(payload: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error("Missing Stripe webhook secret")
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error: any) {
    console.error("Error constructing webhook event:", error)
    throw new Error(`Webhook Error: ${error.message}`)
  }
}
