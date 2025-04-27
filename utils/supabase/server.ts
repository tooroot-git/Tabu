import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { cookies } from "next/headers"

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  // Check if we're in development and have the flag to disable checks
  const disableCheck = process.env.NEXT_PUBLIC_DISABLE_SUPABASE_CHECK === "true"

  // Validate required environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error("Missing Supabase environment variables")

    // In development with disable flag, use dummy values to prevent errors
    if (process.env.NODE_ENV === "development" && disableCheck) {
      return createServerClient("https://placeholder-supabase-url.supabase.co", "placeholder-anon-key", {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: "", ...options })
            } catch (error) {
              // The `delete` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      })
    }
  }

  // Normal case - create with valid credentials
  return createServerClient(url!, key!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
