import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getLoginUrl } from "@/lib/auth0"

// נתיבים מוגנים שדורשים אימות
const protectedPaths = ["/dashboard", "/my-orders", "/settings"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // בדוק אם הנתיב הנוכחי דורש אימות
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    // בסביבת ייצור, זה יבדוק את עוגיית האימות של Auth0
    const hasAuthCookie = request.cookies.has("appSession")

    if (!hasAuthCookie) {
      // אם המשתמש לא מחובר, הפנה אותו לדף ההתחברות
      const loginUrl = getLoginUrl(pathname)
      return NextResponse.redirect(new URL(loginUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*", "/settings/:path*"],
}
