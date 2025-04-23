import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // בסביבת תצוגה מקדימה, נדמה התחברות פשוטה
    const url = new URL(request.url)
    const returnTo = url.searchParams.get("returnTo") || "/dashboard"

    // יצירת תגובה עם הפניה
    const response = NextResponse.redirect(new URL(returnTo, request.url))

    // הגדרת עוגייה פשוטה לאימות
    response.cookies.set("authed", "true", {
      path: "/",
      maxAge: 60 * 60 * 24, // יום אחד
      httpOnly: true,
      sameSite: "lax",
    })

    return response
  } catch (error) {
    console.error("Error in login route:", error)

    // החזרת תגובת שגיאה ברורה
    return new Response(JSON.stringify({ error: "Authentication failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
