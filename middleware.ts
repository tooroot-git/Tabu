import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// בדיקת האם המשתמש מחובר באמצעות בדיקת קוקי
function isAuthenticated(request: NextRequest) {
  try {
    // בדיקה פשוטה של עוגיית האימות
    return request.cookies.has("authed")
  } catch (error) {
    console.error("Error checking authentication:", error)
    return false
  }
}

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    // נתיבים מוגנים שדורשים אימות
    const protectedPaths = ["/dashboard", "/my-orders", "/settings"]
    const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

    if (isProtectedPath) {
      // בדוק אם המשתמש מחובר
      const isLoggedIn = isAuthenticated(request)

      if (!isLoggedIn) {
        // אם המשתמש לא מחובר, הפנה אותו לדף ההתחברות
        return NextResponse.redirect(new URL("/login", request.url))
      }
    }

    // המשך לבקשה הבאה
    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // במקרה של שגיאה, נמשיך לבקשה הבאה
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    // דפים שדורשים אימות
    "/dashboard/:path*",
    "/my-orders/:path*",
    "/settings/:path*",
  ],
}
