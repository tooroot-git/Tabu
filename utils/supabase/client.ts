import { createBrowserClient } from "@supabase/ssr"

export const createClient = () => {
  // Check if we're in development and have the flag to disable checks
  const disableCheck = process.env.NEXT_PUBLIC_DISABLE_SUPABASE_CHECK === "true"

  // Validate required environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate URL format
  const isValidUrl =
    url && (url.startsWith("http://") || url.startsWith("https://")) && !url.includes("your-supabase-url")

  // Validate key format
  const isValidKey = key && !key.includes("your-supabase")

  if (!isValidUrl || !isValidKey) {
    console.error("Missing or invalid Supabase environment variables")
    console.error(`URL valid: ${isValidUrl}, Key valid: ${isValidKey}`)

    // In development with disable flag, use dummy values to prevent errors
    if (process.env.NODE_ENV === "development" && disableCheck) {
      console.warn("Using placeholder Supabase client in development mode")
      return createBrowserClient("https://placeholder-supabase-url.supabase.co", "placeholder-anon-key", {
        auth: {
          persistSession: false,
        },
      })
    }

    // Otherwise, try to create with whatever we have
    if (url && key) {
      console.warn("Attempting to create Supabase client with potentially invalid credentials")
      return createBrowserClient(url, key)
    }

    // Last resort - create with dummy values but disable persistence
    console.warn("Creating disabled Supabase client with placeholder values")
    return createBrowserClient("https://placeholder-supabase-url.supabase.co", "placeholder-anon-key", {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  }

  // Normal case - create with valid credentials
  return createBrowserClient(url, key)
}
