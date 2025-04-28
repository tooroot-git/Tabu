import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export function createClient(request: NextRequest, options: { admin?: boolean } = {}) {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Check if Supabase environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Validate URL format
  const isValidUrl =
    supabaseUrl &&
    (supabaseUrl.startsWith("http://") || supabaseUrl.startsWith("https://")) &&
    !supabaseUrl.includes("your-supabase-url")

  // Validate keys format
  const isValidAnonKey = supabaseAnonKey && !supabaseAnonKey.includes("your-supabase")
  const isValidServiceKey = supabaseServiceRoleKey && !supabaseServiceRoleKey.includes("your-supabase")

  if (!isValidUrl || (!isValidAnonKey && !options.admin) || (options.admin && !isValidServiceKey)) {
    console.warn("Missing or invalid Supabase environment variables in middleware")
    console.warn(`URL valid: ${isValidUrl}, Anon key valid: ${isValidAnonKey}, Service key valid: ${isValidServiceKey}`)
    return { supabase: null, response }
  }

  const supabaseKey = options.admin ? supabaseServiceRoleKey! : supabaseAnonKey!

  // Create a Supabase client
  const supabase = createServerClient(supabaseUrl!, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        // If the cookie is updated, update the cookies for the request and response
        request.cookies.set({
          name,
          value,
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        // If the cookie is removed, update the cookies for the request and response
        request.cookies.set({
          name,
          value: "",
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value: "",
          ...options,
        })
      },
    },
  })

  return { supabase, response }
}
