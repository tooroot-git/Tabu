import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
// import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0"

export const GET = async (req: NextRequest) => {
  const { searchParams, pathname } = new URL(req.url)
  const path = pathname.split("/").pop()
  const returnTo = searchParams.get("returnTo") || "/"

  // בסביבת התצוגה המקדימה, נדמה התנהגות של Auth0
  if (path === "login") {
    // בסביבת ייצור, יש להשתמש ב-handleLogin במקום הקוד הזה
    return NextResponse.redirect(new URL(`/login?returnTo=${encodeURIComponent(returnTo)}`, req.url))
  }

  if (path === "callback") {
    // בסביבת ייצור, יש להשתמש ב-handleCallback במקום הקוד הזה
    return NextResponse.redirect(new URL(returnTo, req.url))
  }

  if (path === "logout") {
    // בסביבת ייצור, יש להשתמש ב-handleLogout במקום הקוד הזה
    return NextResponse.redirect(new URL("/", req.url))
  }

  // בסביבת ייצור, יש להשתמש ב-handleAuth במקום הקוד הזה
  return NextResponse.json({ message: "Auth API route" })
}

export const POST = GET
