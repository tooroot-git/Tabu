"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
// import { UserProvider } from "@auth0/nextjs-auth0/client"

// יצירת קונטקסט למוק של Auth0 בסביבת התצוגה המקדימה
type User = {
  name?: string
  email?: string
  picture?: string
  sub?: string
  updated_at?: string
}

type AuthContextType = {
  user: User | null | undefined
  error: Error | undefined
  isLoading: boolean
  checkSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// מוק לספק האימות בסביבת התצוגה המקדימה
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const checkSession = async () => {
    try {
      setIsLoading(true)
      // בסביבת התצוגה המקדימה, נבדוק אם יש משתמש בלוקל סטורג'
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("mock_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          setUser(null)
        }
      }
    } catch (err) {
      setError(err as Error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  // בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
  // return <UserProvider>{children}</UserProvider>

  return <AuthContext.Provider value={{ user, error, isLoading, checkSession }}>{children}</AuthContext.Provider>
}
