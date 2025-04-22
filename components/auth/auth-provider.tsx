"use client"

import { UserProvider as MockUserProvider } from "@/lib/auth-mock"
import type { ReactNode } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
  // For the preview, we use our mock implementation
  return <MockUserProvider>{children}</MockUserProvider>
}
