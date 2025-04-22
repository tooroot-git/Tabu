import { NextResponse } from "next/server"
import { getSupabase } from "@/lib/supabase"

// Mock getSession for preview
const getSession = async () => {
  // In production, use the real Auth0 getSession
  // For preview, return a mock session
  return {
    user: {
      sub: "auth0|123456789",
      email: "user@example.com",
    },
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Get Supabase client
    const supabase = getSupabase()

    // Prepare order data
    const orderData = {
      user_id: session.user.sub,
      user_email: session.user.email,
      status: "completed", // Default status
      ...data,
      created_at: new Date().toISOString(),
    }

    // Insert order into Supabase
    const { data: order, error } = await supabase.from("orders").insert(orderData).select()

    if (error) {
      console.error("Error creating order:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, order: order[0] })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get Supabase client
    const supabase = getSupabase()

    // Get orders for the current user
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", session.user.sub)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
