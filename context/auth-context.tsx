"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { supabase, signIn, signOut as supabaseSignOut, signUp } from "@/lib/supabase-auth"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  error: null,
  signIn: async () => ({ error: "AuthContext not initialized" }),
  signUp: async () => ({ error: "AuthContext not initialized" }),
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get initial session
        const { data } = await supabase.auth.getSession()
        setSession(data.session)
        setUser(data.session?.user || null)

        // Set up auth state listener
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          setSession(newSession)
          setUser(newSession?.user || null)
          setLoading(false)
        })

        setLoading(false)

        // Clean up subscription
        return () => {
          authListener.subscription.unsubscribe()
        }
      } catch (err) {
        console.error("Auth initialization error:", err)
        setError("Failed to initialize authentication")
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  // Sign in handler
  const handleSignIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const { user: authUser, error: signInError } = await signIn(email, password)

      if (signInError) {
        setError(signInError)
        return { error: signInError }
      }

      return { error: null }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to sign in"
      setError(errorMessage)
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Sign up handler
  const handleSignUp = async (email: string, password: string, metadata = {}) => {
    setLoading(true)
    setError(null)

    try {
      const { user: authUser, error: signUpError } = await signUp(email, password, metadata)

      if (signUpError) {
        setError(signUpError)
        return { error: signUpError }
      }

      return { error: null }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to sign up"
      setError(errorMessage)
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Sign out handler
  const handleSignOut = async () => {
    setLoading(true)

    try {
      const { error: signOutError } = await supabaseSignOut()

      if (signOutError) {
        setError(signOutError)
        console.error("Sign out error:", signOutError)
      } else {
        // Clear auth state
        setUser(null)
        setSession(null)

        // Redirect to home page
        router.push("/")
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign out")
      console.error("Sign out error:", err)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    loading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
