"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define a mock user type similar to Auth0's user
type MockUser = {
  sub?: string
  name?: string
  email?: string
  picture?: string
}

// Define the context type similar to Auth0's UserContext
type MockAuthContextType = {
  user?: MockUser
  error?: Error
  isLoading: boolean
}

// Create the context
const MockAuthContext = createContext<MockAuthContextType>({
  isLoading: true,
})

// Create a provider component
export function AuthProviderMock({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<MockAuthContextType>({
    isLoading: true,
  })

  useEffect(() => {
    // Check if there's a mock user in localStorage (for preview purposes)
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("mockUser")
        if (storedUser) {
          setAuth({
            user: JSON.parse(storedUser),
            isLoading: false,
          })
        } else {
          setAuth({ isLoading: false })
        }
      } catch (error) {
        setAuth({
          error: error instanceof Error ? error : new Error("An unknown error occurred"),
          isLoading: false,
        })
      }
    }

    // Listen for storage events to sync auth state across tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "mockUser") {
        checkAuth()
      }
    }

    // Set up listeners and check initial auth
    window.addEventListener("storage", handleStorageChange)
    checkAuth()

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return <MockAuthContext.Provider value={auth}>{children}</MockAuthContext.Provider>
}

// Hook to access the mock auth context
export function useMockUser() {
  return useContext(MockAuthContext)
}

// Export useUser for compatibility with the rest of the application
export const useUser = useMockUser

// Export useAuth for compatibility
export const useAuth = useMockUser

// Mock login and logout functions for API routes
export async function mockLogin() {
  const mockUser = {
    sub: "mock_user_id",
    name: "Demo User",
    email: "demo@tabuisrael.co.il",
    picture: "/abstract-user-icon.png",
  }
  localStorage.setItem("mockUser", JSON.stringify(mockUser))
  window.dispatchEvent(new StorageEvent("storage", { key: "mockUser" }))
  return mockUser
}

export async function mockLogout() {
  localStorage.removeItem("mockUser")
  window.dispatchEvent(new StorageEvent("storage", { key: "mockUser" }))
}
