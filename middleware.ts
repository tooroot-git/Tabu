import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protected paths that require authentication
const protectedPaths = ["/dashboard", "/my-orders", "/settings"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    // Check for the presence of the Auth0 session cookie
    // In a real environment, this would be 'appSession'
    const hasAuthCookie = request.cookies.has("appSession") || request.cookies.has("authed")

    if (!hasAuthCookie) {
      // If the user is not logged in, redirect to the login page
      const loginUrl = `/api/auth/login?returnTo=${encodeURIComponent(pathname)}`
      return NextResponse.redirect(new URL(loginUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/settings/:path*"],
}
