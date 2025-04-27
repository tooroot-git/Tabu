import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

// Protected paths that require authentication
const protectedPaths = ["/dashboard", "/my-orders", "/settings", "/profile", "/admin"]

// Admin-only paths
const adminPaths = ["/admin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for auth callback route and static assets
  if (pathname.startsWith("/auth/callback") || pathname.includes("/_next/") || pathname.includes("/api/")) {
    return NextResponse.next()
  }

  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    try {
      // Create a Supabase client for the middleware
      const { supabase, response } = createClient(request)

      // Check if the user is authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        // If the user is not logged in, redirect to the login page
        console.log("No session found, redirecting to login")
        const loginUrl = `/login?returnTo=${encodeURIComponent(pathname)}`
        return NextResponse.redirect(new URL(loginUrl, request.url))
      }

      // For admin paths, check if the user is an admin
      if (isAdminPath) {
        try {
          // Use the service role to check user role
          const adminSupabase = createClient(request, { admin: true }).supabase
          const { data: user } = await adminSupabase.from("profiles").select("role").eq("id", session.user.id).single()

          if (user?.role !== "admin") {
            // If the user is not an admin, redirect to the dashboard
            return NextResponse.redirect(new URL("/dashboard", request.url))
          }
        } catch (error) {
          console.error("Error checking admin role:", error)
          // If there's an error checking the role, allow access and let the page handle it
          return NextResponse.next()
        }
      }

      return response
    } catch (error) {
      console.error("Middleware error:", error)
      // If there's an error in the middleware, allow the request to continue
      // and let the page handle authentication
      return NextResponse.next()
    }
  }

  // Handle login page - redirect to dashboard if already logged in
  if (pathname === "/login") {
    try {
      const { supabase } = createClient(request)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      console.error("Error checking session on login page:", error)
      // If there's an error checking the session, allow access to the login page
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/settings/:path*", "/profile/:path*", "/admin/:path*", "/login"],
}
