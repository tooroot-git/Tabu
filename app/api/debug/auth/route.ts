import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get the current session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          status: "error",
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }

    // Return session info (or null if not authenticated)
    return NextResponse.json({
      authenticated: !!session,
      user: session?.user
        ? {
            id: session.user.id,
            email: session.user.email,
            lastSignIn: session.user.last_sign_in_at,
          }
        : null,
      status: "success",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        status: "error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
