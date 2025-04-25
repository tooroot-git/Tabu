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
    } = await supabase.auth.getSession()

    // Check if tables exist
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    // Check if orders table exists and has the right structure
    let ordersStructure = null
    let ordersError = null

    try {
      const { data, error } = await supabase.from("orders").select("*").limit(1)

      ordersStructure = data ? "Table exists and is accessible" : "Table exists but no data"
      ordersError = error ? error.message : null
    } catch (e: any) {
      ordersStructure = "Error accessing table"
      ordersError = e.message
    }

    return NextResponse.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      auth: {
        authenticated: !!session,
        user: session?.user
          ? {
              id: session.user.id,
              email: session.user.email,
            }
          : null,
      },
      database: {
        tables: tables?.map((t) => t.table_name) || [],
        tablesError: tablesError?.message || null,
        orders: {
          structure: ordersStructure,
          error: ordersError,
        },
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "ERROR",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
