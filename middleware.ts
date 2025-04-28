import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  // Create a response object
  const res = NextResponse.next()

  try {
    // Get the hostname and pathname
    const hostname = request.headers.get("host") || ""
    const { pathname, search } = request.nextUrl

    // Handle www to non-www redirect (canonical domain)
    if (hostname.startsWith("www.")) {
      const nonWwwHostname = hostname.replace(/^www\./, "")
      return NextResponse.redirect(`https://${nonWwwHostname}${pathname}${search}`, 301)
    }

    // Handle incorrect /en redirects
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      const newPathname = pathname.replace(/^\/en\/?/, "/")
      return NextResponse.redirect(`https://${hostname}${newPathname}${search}`, 301)
    }

    // Skip Supabase client creation if disabled
    if (process.env.NEXT_PUBLIC_DISABLE_SUPABASE_CHECK === "true") {
      return res
    }

    // Create a Supabase client for the middleware
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh session if expired
    const { data } = await supabase.auth.getSession()
    const session = data.session

    // Check if user is authenticated for protected routes
    const isProtectedRoute =
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/my-orders") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/settings")

    if (!session && isProtectedRoute) {
      return NextResponse.redirect(`https://${hostname}/login?returnTo=${encodeURIComponent(pathname)}`)
    }

    // If user is authenticated and trying to access login/signup, redirect to dashboard
    if (session && (pathname === "/login" || pathname === "/signup")) {
      return NextResponse.redirect(`https://${hostname}/dashboard`)
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}
