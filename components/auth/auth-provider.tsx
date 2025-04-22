"use client"

import { UserProvider } from "@/lib/auth-mock"
import type { ReactNode } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
  // For the preview, we use our mock implementation
  return <UserProvider>{children}</UserProvider>
}
