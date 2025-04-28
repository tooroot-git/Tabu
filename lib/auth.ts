import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { User } from "@supabase/supabase-js"

// Server-side auth functions
export async function getServerSession() {
  const cookieStore = cookies()
  const supabase = createClientComponentClient({ cookies: () => cookieStore })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting server session:", error)
    return null
  }
}

export async function getUser() {
  try {
    const session = await getServerSession()
    return session?.user || null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

// Client-side auth functions
export function getSupabaseClient() {
  return createClientComponentClient()
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.error("Error getting current user:", error)
      return null
    }

    return data.user
  } catch (error) {
    console.error("Unexpected error getting current user:", error)
    return null
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message || "Failed to sign in" }
  }
}

export async function signUpWithEmail(email: string, password: string, metadata = {}) {
  try {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message || "Failed to sign up" }
  }
}

export async function signOut() {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error: any) {
    return { error: error.message || "Failed to sign out" }
  }
}

export async function resetPassword(email: string) {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error: any) {
    return { error: error.message || "Failed to send password reset email" }
  }
}

export async function updatePassword(password: string) {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error: any) {
    return { error: error.message || "Failed to update password" }
  }
}
