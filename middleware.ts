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

    // Handle language routing
    const pathname = request.nextUrl.pathname

    // Check if we're at the root domain with www subdomain
    if (request.headers.get("host")?.startsWith("www.")) {
      // Remove www and keep the path
      const url = new URL(pathname, "https://tabuisrael.co.il")
      return NextResponse.redirect(url)
    }

    // Check if user is authenticated for protected routes
    const isProtectedRoute =
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/my-orders") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/settings") ||
      pathname.startsWith("/en/dashboard") ||
      pathname.startsWith("/en/my-orders") ||
      pathname.startsWith("/en/profile") ||
      pathname.startsWith("/en/settings")

    if (!session && isProtectedRoute) {
      // Redirect to login with return URL
      const isEnglish = pathname.startsWith("/en/")
      const redirectUrl = new URL(isEnglish ? "/en/login" : "/login", request.url)
      redirectUrl.searchParams.set("returnTo", pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is authenticated and trying to access login/signup, redirect to dashboard
    if (session) {
      const isEnglish = pathname.startsWith("/en/")
      if (
        (isEnglish && (pathname === "/en/login" || pathname === "/en/signup")) ||
        (!isEnglish && (pathname === "/login" || pathname === "/signup"))
      ) {
        return NextResponse.redirect(new URL(isEnglish ? "/en/dashboard" : "/dashboard", request.url))
      }
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
