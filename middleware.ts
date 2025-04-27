import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client for the middleware
  const supabase = createMiddlewareClient({ cookies })

  // Refresh session if expired
  await supabase.auth.getSession()

  // Protected routes logic can be added here if needed

  return res
}

// Configure which paths should be handled by this middleware
export const config = {
  matcher: [
    // Apply to all routes except those starting with:
    "/((?!_next/static|_next/image|favicon.ico|images|public).*)",
  ],
}
