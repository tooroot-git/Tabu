import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client for the middleware
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if user is authenticated for protected routes
  if (
    !session &&
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/my-orders") ||
      request.nextUrl.pathname.startsWith("/profile"))
  ) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("returnTo", request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Configure which paths should be handled by this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/profile/:path*", "/login", "/signup"],
}
