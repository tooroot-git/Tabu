import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
// import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge"
// export default withMiddlewareAuthRequired()

export default function middleware(request: NextRequest) {
  // בדיקה אם המשתמש מחובר (בסביבה אמיתית זה יבדוק את הטוקן)
  // בסביבת התצוגה המקדימה, נאפשר גישה לכל הדפים

  // בסביבת ייצור, יש להשתמש ב-withMiddlewareAuthRequired במקום הקוד הזה

  // אם רוצים לדמות התנהגות של הפניה לדף התחברות בסביבת התצוגה המקדימה:
  // const isAuthenticated = false
  // if (!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
  //   const loginUrl = new URL("/login", request.url)
  //   loginUrl.searchParams.set("returnTo", request.nextUrl.pathname)
  //   return NextResponse.redirect(loginUrl)
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*"],
}
