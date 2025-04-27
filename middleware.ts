import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client for handling auth
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  await supabase.auth.getSession()

  return res
}

// Configure which paths should be handled by this middleware
export const config = {
  matcher: [
    // Apply to all routes except those starting with:
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images|public).*)",
  ],
}
