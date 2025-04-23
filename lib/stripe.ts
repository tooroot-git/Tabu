import Stripe from "stripe"

export const stripe = new Stripe(process.env.stripe_api_key || "", {
  apiVersion: "2023-10-16",
})
