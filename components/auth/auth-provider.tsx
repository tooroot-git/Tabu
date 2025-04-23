"use client"

import type { ReactNode } from "react"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // In the preview environment, we don't need to wrap with Auth0Provider
  // Our mock implementation in lib/auth0.ts will handle authentication
  return <>{children}</>
}
