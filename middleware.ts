import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// בדיקת האם המשתמש מחובר באמצעות בדיקת קוקי
function isAuthenticated(request: NextRequest) {
  try {
    // בסביבת תצוגה מקדימה, נבדוק אם יש לנו נתוני משתמש מוקיים
    // בסביבת ייצור, נבדוק את הקוקי של Auth0
    const hasAuthCookie = request.cookies.has("appSession") || request.cookies.has("authed")
    return hasAuthCookie
  } catch (error) {
    console.error("Error checking authentication:", error)
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // נתיבים מוגנים שדורשים אימות
  const protectedPaths = ["/dashboard", "/my-orders", "/settings"]
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    // בדוק אם המשתמש מחובר
    const isLoggedIn = isAuthenticated(request)

    if (!isLoggedIn) {
      // אם המשתמש לא מחובר, הפנה אותו לדף ההתחברות
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("returnTo", pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // המשך לבקשה הבאה
  return NextResponse.next()
}

export const config = {
  matcher: [
    // דפים שדורשים אימות
    "/dashboard/:path*",
    "/my-orders/:path*",
    "/settings/:path*",
  ],
}
