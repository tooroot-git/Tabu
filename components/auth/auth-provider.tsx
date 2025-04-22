"use client"

import { UserProvider as MockUserProvider } from "@/lib/auth-mock"
import type { ReactNode } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
  // In production, you would use the real Auth0 provider:
  // import { UserProvider } from "@auth0/nextjs-auth0/client"
  // return <UserProvider>{children}</UserProvider>

  // For the preview, we use our mock implementation
  return <MockUserProvider>{children}</MockUserProvider>
}
