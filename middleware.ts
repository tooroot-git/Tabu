import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getSession(request, NextResponse)

  // Check if user is authenticated
  if (!session?.user) {
    // If trying to access protected routes, redirect to login
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/my-orders") ||
      request.nextUrl.pathname.startsWith("/profile")
    ) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/profile/:path*"],
}
