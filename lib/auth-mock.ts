"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"

// Simplified mock user type
export interface User {
  sub?: string
  name?: string
  email?: string
  picture?: string
}

// Simplified context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: () => void
  logout: () => void
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
})

// Hook to use auth context
export function useUser() {
  return useContext(AuthContext)
}

// Auth provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored user on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("mock_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.error("Error loading user from storage:", err)
      }
      setIsLoading(false)
    }
  }, [])

  // Login function
  function login() {
    const mockUser = {
      sub: "auth0|123456789",
      name: "משתמש לדוגמה",
      email: "user@example.com",
      picture: "/vibrant-street-market.png",
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_user", JSON.stringify(mockUser))
    }
    setUser(mockUser)
  }

  // Logout function
  function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mock_user")
    }
    setUser(null)
  }

  // Create context object
  const contextValue = {
    user,
    isLoading,
    login,
    logout,
  }

  // Return provider
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Mock API handlers
export function handleAuth() {
  return async () => {
    return new Response("Auth handler mock", { status: 200 })
  }
}

export function handleLogin() {
  return async () => {
    return new Response("Login handler mock", { status: 200 })
  }
}

export function handleCallback() {
  return async () => {
    return new Response("Callback handler mock", { status: 200 })
  }
}

export function handleLogout() {
  return async () => {
    return new Response("Logout handler mock", { status: 200 })
  }
}

export function withMiddlewareAuthRequired() {
  return async () => {
    return new Response("Middleware auth required mock", { status: 200 })
  }
}
