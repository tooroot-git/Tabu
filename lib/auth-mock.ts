"use client"

import type React from "react"

// מוק פשוט לאימות משתמשים לסביבת התצוגה המקדימה
import { useState, useEffect } from "react"

export type User = {
  name?: string
  email?: string
  picture?: string
  sub?: string
  updated_at?: string
}

// מצב אימות מוק
let mockAuthState: {
  user: User | null
  isLoading: boolean
  error: Error | null
} = {
  user: null,
  isLoading: false,
  error: null,
}

// פונקציה להגדרת משתמש מוק
export const setMockUser = (user: User | null) => {
  mockAuthState = { ...mockAuthState, user }
}

// הוק מוק לשימוש במקום useUser של Auth0
export const useUser = () => {
  const [state, setState] = useState(mockAuthState)

  useEffect(() => {
    // בדיקה אם יש משתמש בלוקל סטורג'
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("mock_user")
      if (storedUser && !state.user) {
        try {
          const user = JSON.parse(storedUser)
          setState({ user, isLoading: false, error: null })
        } catch (e) {
          console.error("Failed to parse stored user", e)
        }
      }
    }
  }, [state.user])

  // פונקציות עזר לסימולציה של התחברות והתנתקות
  const login = () => {
    const mockUser: User = {
      name: "משתמש לדוגמה",
      email: "user@example.com",
      picture: "/vibrant-street-market.png",
      sub: "auth0|123456789",
      updated_at: new Date().toISOString(),
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("mock_user", JSON.stringify(mockUser))
    }

    setState({ user: mockUser, isLoading: false, error: null })
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mock_user")
    }

    setState({ user: null, isLoading: false, error: null })
  }

  return { ...state, login, logout }
}

// ספק אימות מוק
export function UserProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// מוק לפונקציית handleAuth
export const handleAuth = () => {
  return async () => {
    return new Response("Auth handler mock", { status: 200 })
  }
}

// מוק לפונקציית handleLogin
export const handleLogin = () => {
  return async () => {
    return new Response("Login handler mock", { status: 200 })
  }
}

// מוק לפונקציית handleCallback
export const handleCallback = () => {
  return async () => {
    return new Response("Callback handler mock", { status: 200 })
  }
}

// מוק לפונקציית withMiddlewareAuthRequired
export const withMiddlewareAuthRequired = () => {
  return async () => {
    return new Response("Middleware auth required mock", { status: 200 })
  }
}
