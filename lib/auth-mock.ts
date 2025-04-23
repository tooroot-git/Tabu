"use client"

import { useState, useEffect } from "react"
import type { User } from "./supabase"

// This is a mock implementation for the preview environment
export function useMockUser() {
  // Check if we're in the browser and if the auth cookie exists
  const hasAuthCookie = typeof window !== "undefined" && document.cookie.includes("authed=true")

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    try {
      if (hasAuthCookie) {
        setUser({
          name: "Preview User",
          email: "preview@tabuisrael.co.il",
          picture: "/abstract-user-icon.png",
          sub: "preview-user-id",
        })
      } else {
        setUser(null)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }, [hasAuthCookie])

  return {
    user,
    error,
    isLoading,
    loginWithRedirect: () => {
      document.cookie = "authed=true; path=/; max-age=86400"
      window.location.href = "/dashboard"
    },
    logout: () => {
      document.cookie = "authed=; path=/; max-age=0"
      window.location.href = "/"
    },
    getAccessTokenSilently: () => Promise.resolve("mock-access-token"),
  }
}

// Use the mock in preview
export const useUser = useMockUser
