import { loadStripe } from "@stripe/stripe-js"

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_live_51R43bERufrEbUWEImjimDjTs5Ke8Iy0Fi8YNpNvcd7xEesmXpz3biE8z8Nybx5zLUj1XjXa9k5clDkaDXKo5iKXp003tafQBZJ",
)
