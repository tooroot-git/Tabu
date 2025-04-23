import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // בסביבת תצוגה מקדימה, נדמה התנתקות פשוטה
    const url = new URL(request.url)
    const returnTo = url.searchParams.get("returnTo") || "/"

    // יצירת תגובה עם הפניה
    const response = NextResponse.redirect(new URL(returnTo, request.url))

    // מחיקת עוגיית האימות
    response.cookies.delete("authed")

    return response
  } catch (error) {
    console.error("Error in logout route:", error)

    // החזרת תגובת שגיאה ברורה
    return new Response(JSON.stringify({ error: "Logout failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
