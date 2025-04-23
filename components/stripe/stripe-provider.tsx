"use client"

import type { ReactNode } from "react"

// Mock Stripe provider that doesn't rely on the actual Stripe library
export function StripeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
