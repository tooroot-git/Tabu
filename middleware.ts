import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

// Protected paths that require authentication
const protectedPaths = ["/dashboard", "/my-orders", "/settings", "/profile"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    // Create a Supabase client for the middleware
    const { supabase, response } = createClient(request)

    // Check if the user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // If the user is not logged in, redirect to the login page
      const loginUrl = `/login?returnTo=${encodeURIComponent(pathname)}`
      return NextResponse.redirect(new URL(loginUrl, request.url))
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/settings/:path*", "/profile/:path*"],
}
