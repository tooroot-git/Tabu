"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"

// Mock user type similar to Auth0 user
export interface User {
  sub?: string
  name?: string
  email?: string
  picture?: string
  updated_at?: string
}

// Context for auth state
interface AuthContextType {
  user: User | null
  error: Error | null
  isLoading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Hook to use auth context
export function useUser() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider")
  }
  return context
}

// Auth provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored user on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("mock_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Login function
  const login = () => {
    const mockUser: User = {
      sub: "auth0|123456789",
      name: "משתמש לדוגמה",
      email: "user@example.com",
      picture: "/vibrant-street-market.png",
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem("mock_user", JSON.stringify(mockUser))
    setUser(mockUser)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("mock_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, error, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

// Mock API handlers
export const handleAuth = () => {
  return async () => {
    return new Response("Auth handler mock", { status: 200 })
  }
}

export const handleLogin = () => {
  return async () => {
    return new Response("Login handler mock", { status: 200 })
  }
}

export const handleCallback = () => {
  return async () => {
    return new Response("Callback handler mock", { status: 200 })
  }
}

export const handleLogout = () => {
  return async () => {
    return new Response("Logout handler mock", { status: 200 })
  }
}

export const withMiddlewareAuthRequired = () => {
  return async () => {
    return new Response("Middleware auth required mock", { status: 200 })
  }
}
