"use client"

import { useState, useEffect } from "react"

// Define User type
export type User = {
  name?: string
  email?: string
  sub?: string
  picture?: string
}

// Mock implementation of Auth0's useUser hook
export function useAuth() {
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

// Function to get the API URL
export function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  return baseUrl ? `${baseUrl}${path}` : path
}

// Function to check if the user is authenticated
export function isAuthenticated(cookies: Record<string, string>): boolean {
  return cookies.has("appSession") || cookies.has("authed")
}

// Function to get the login URL
export function getLoginUrl(returnTo?: string): string {
  const baseUrl = "/api/auth/login"
  return returnTo ? `${baseUrl}?returnTo=${encodeURIComponent(returnTo)}` : baseUrl
}

// Function to get the logout URL
export function getLogoutUrl(returnTo?: string): string {
  const baseUrl = "/api/auth/logout"
  return returnTo ? `${baseUrl}?returnTo=${encodeURIComponent(returnTo)}` : baseUrl
}

// Mock implementation of getSession
export function getSession() {
  return Promise.resolve(null)
}

// Mock implementation for preview environment
export const mockAuth0 = {
  getSession: () => {
    return Promise.resolve(null)
  },
  withPageAuthRequired: (component) => component,
  withApiAuthRequired: (handler) => handler,
}

// We're not directly importing Auth0 here anymore
// Instead, we'll use our mock implementation for all environments
// and the real Auth0 will be imported directly where needed
