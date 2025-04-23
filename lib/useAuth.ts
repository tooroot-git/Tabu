"use client"

import type React from "react"

import { useEffect, useState, createContext, useContext } from "react"
import { supabase, getCurrentUser } from "./supabase"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: Error | null
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Check active sessions and sets the user
    const getUser = async () => {
      setIsLoading(true)
      try {
        const user = await getCurrentUser()
        setUser(user)
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const value = {
    user,
    isLoading,
    error,
    signIn: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error }
      } catch (error: any) {
        return { error }
      }
    },
    signUp: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signUp({ email, password })
        return { error }
      } catch (error: any) {
        return { error }
      }
    },
    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut()
        return { error }
      } catch (error: any) {
        return { error }
      }
    },
    resetPassword: async (email: string) => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        return { error }
      } catch (error: any) {
        return { error }
      }
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Hook for protected routes
export function useRequireAuth(redirectUrl = "/login") {
  const { user, isLoading } = useAuth()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = redirectUrl
    } else if (!isLoading && user) {
      setIsAuthorized(true)
    }
  }, [user, isLoading, redirectUrl])

  return { isAuthorized, isLoading, user }
}
