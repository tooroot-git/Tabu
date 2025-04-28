import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  // Create a response object
  const res = NextResponse.next()

  try {
    // Create a Supabase client for the middleware
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh session if expired
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Debug log
    console.log(
      `Middleware: Path ${request.nextUrl.pathname}, Auth: ${session ? "Authenticated" : "Not authenticated"}`,
    )

    // Check if user is authenticated for protected routes
    const isProtectedRoute =
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/my-orders") ||
      request.nextUrl.pathname.startsWith("/profile") ||
      request.nextUrl.pathname.startsWith("/settings")

    if (!session && isProtectedRoute) {
      // Redirect to login with return URL
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("returnTo", request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is authenticated and trying to access login/signup, redirect to dashboard
    if (session && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return res
  } catch (error) {
    console.error("Middleware error:", error)
    // Return the original response if there's an error
    return res
  }
}

// Configure which paths should be handled by this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/profile/:path*", "/settings/:path*", "/login", "/signup"],
}
