import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Get the user session
    const session = await getSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Initialize Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // Get user's orders from Supabase
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", session.user.sub)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error in orders API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
