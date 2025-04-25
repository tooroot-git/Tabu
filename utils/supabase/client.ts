import { createBrowserClient } from "@supabase/ssr"

export const createClient = () => {
  // Check if we're in development and have the flag to disable checks
  const disableCheck = process.env.NEXT_PUBLIC_DISABLE_SUPABASE_CHECK === "true"

  // Validate required environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error("Missing Supabase environment variables")

    // In development with disable flag, use dummy values to prevent errors
    if (process.env.NODE_ENV === "development" && disableCheck) {
      return createBrowserClient("https://placeholder-supabase-url.supabase.co", "placeholder-anon-key")
    }

    // Otherwise, try to create with whatever we have
    return createBrowserClient(url || "https://placeholder-supabase-url.supabase.co", key || "placeholder-anon-key")
  }

  // Normal case - create with valid credentials
  return createBrowserClient(url, key)
}
