import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  // Create a response object
  const res = NextResponse.next()

  try {
    // Get the hostname and pathname
    const hostname = request.headers.get("host") || ""
    const pathname = request.nextUrl.pathname

    // Handle www to non-www redirect (canonical domain)
    if (hostname.startsWith("www.")) {
      // Create the URL for the non-www version
      const newUrl = new URL(pathname, `https://${hostname.replace(/^www\./, "")}`)

      // Preserve search params
      newUrl.search = request.nextUrl.search

      // Return a redirect response
      return NextResponse.redirect(newUrl, 301)
    }

    // Handle incorrect /en redirects
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      // If someone tries to access /en directly, redirect to Hebrew version
      const newUrl = new URL(pathname.replace(/^\/en\/?/, "/"), `https://${hostname}`)

      // Preserve search params
      newUrl.search = request.nextUrl.search

      // Return a redirect response
      return NextResponse.redirect(newUrl, 301)
    }

    // Create a Supabase client for the middleware
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh session if expired
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if user is authenticated for protected routes
    const isProtectedRoute =
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/my-orders") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/settings")

    if (!session && isProtectedRoute) {
      // Redirect to login with return URL
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("returnTo", pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is authenticated and trying to access login/signup, redirect to dashboard
    if (session && (pathname === "/login" || pathname === "/signup")) {
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}
