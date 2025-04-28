"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User, Session } from "@supabase/auth-helpers-nextjs"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
  refreshSession: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user || null)

        console.log("Auth context: Session loaded", session ? "authenticated" : "not authenticated")

        // Set up auth state listener
        const {
          data: { subscription },
        } = await supabase.auth.onAuthStateChange((_event, session) => {
          console.log("Auth state changed:", _event)
          setSession(session)
          setUser(session?.user || null)
        })

        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()
  }, [supabase])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const refreshSession = async () => {
    try {
      const { data } = await supabase.auth.refreshSession()
      setSession(data.session)
      setUser(data.session?.user || null)
    } catch (error) {
      console.error("Error refreshing session:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
