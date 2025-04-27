import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ cookies })

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if user is authenticated for protected routes
  if (!session) {
    // If trying to access protected routes, redirect to login
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/my-orders") ||
      request.nextUrl.pathname.startsWith("/profile")
    ) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return res
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/profile/:path*"],
}
