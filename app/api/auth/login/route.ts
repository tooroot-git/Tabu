import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // בסביבת תצוגה מקדימה, נדמה התחברות
  // בסביבת ייצור, זה יפנה ל-Auth0

  const url = new URL(request.url)
  const returnTo = url.searchParams.get("returnTo") || "/dashboard"

  // הגדר עוגייה כדי לדמות התחברות
  const response = NextResponse.redirect(new URL(returnTo, request.url))
  response.cookies.set("authed", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // שבוע
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })

  return response
}
