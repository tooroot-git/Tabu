import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const supabase = createClientComponentClient()

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  } catch (err: any) {
    return { user: null, error: err.message || "An error occurred during sign in" }
  }
}

export async function signUp(email: string, password: string, metadata = {}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) {
      return { user: null, error: error.message }
    }

    return { user: data.user, error: null }
  } catch (err: any) {
    return { user: null, error: err.message || "An error occurred during sign up" }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    return { error: error ? error.message : null }
  } catch (err: any) {
    return { error: err.message || "An error occurred during sign out" }
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error: error ? error.message : null }
  } catch (err: any) {
    return { error: err.message || "An error occurred during password reset" }
  }
}

export async function updatePassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    })
    return { error: error ? error.message : null }
  } catch (err: any) {
    return { error: err.message || "An error occurred during password update" }
  }
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      return { user: null, error: error.message }
    }
    return { user: data.user, error: null }
  } catch (err: any) {
    return { user: null, error: err.message || "An error occurred getting the current user" }
  }
}

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      return { session: null, error: error.message }
    }
    return { session: data.session, error: null }
  } catch (err: any) {
    return { session: null, error: err.message || "An error occurred getting the session" }
  }
}
