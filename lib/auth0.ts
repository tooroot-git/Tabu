"use client"

import { useState, useEffect } from "react"

// טיפוס למשתמש
export type User = {
  name?: string
  email?: string
  sub?: string
  picture?: string
}

// טיפוס לתוצאת useAuth
export type UseAuthResult = {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  loginWithRedirect: (options?: any) => Promise<void>
  logout: () => Promise<void>
  getAccessToken: () => Promise<string | null>
}

// פונקציית useAuth פשוטה שתעבוד בסביבת הייצור
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // בדוק אם יש לנו משתמש
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then((userData) => {
        setUser(userData)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching user:", error)
        setIsLoading(false)
      })
  }, [])

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
    loginWithRedirect: async (options = {}) => {
      window.location.href = getLoginUrl(options?.returnTo)
    },
    logout: async () => {
      window.location.href = getLogoutUrl()
    },
    getAccessToken: async () => {
      // בסביבת ייצור, זה יקרא ל-API של Auth0
      return null
    },
  }
}

// פונקציה לקבלת ה-URL של ה-API
export function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  return baseUrl ? `${baseUrl}${path}` : path
}

// פונקציה לבדיקה האם המשתמש מחובר
export function isAuthenticated(cookies: Record<string, string>): boolean {
  return !!cookies.appSession
}

// פונקציה לקבלת ה-URL של ההתחברות
export function getLoginUrl(returnTo?: string): string {
  const baseUrl = "/api/auth/login"
  return returnTo ? `${baseUrl}?returnTo=${encodeURIComponent(returnTo)}` : baseUrl
}

// פונקציה לקבלת ה-URL של ההתנתקות
export function getLogoutUrl(returnTo?: string): string {
  const baseUrl = "/api/auth/logout"
  return returnTo ? `${baseUrl}?returnTo=${encodeURIComponent(returnTo)}` : baseUrl
}
