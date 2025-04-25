import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { Resend } from "resend"

export const dynamic = "force-dynamic"

// Initialize Resend for email
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { block, parcel, subparcel, service_type, price, email } = body

    if (!block || !parcel || !service_type || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the order in Supabase
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: session.user.id,
        block,
        parcel,
        subparcel: subparcel || null,
        service_type,
        status: "pending",
        price,
        email: email || session.user.email,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating order:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: "orders@tabuisrael.co.il",
        to: "orders@tabuisrael.co.il",
        subject: `New Order: ${block}-${parcel}${subparcel ? `-${subparcel}` : ""}`,
        html: `
          <h1>New Order Received</h1>
          <p><strong>User:</strong> ${session.user.email}</p>
          <p><strong>Block:</strong> ${block}</p>
          <p><strong>Parcel:</strong> ${parcel}</p>
          ${subparcel ? `<p><strong>Subparcel:</strong> ${subparcel}</p>` : ""}
          <p><strong>Service Type:</strong> ${service_type}</p>
          <p><strong>Price:</strong> ₪${price}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `,
      })
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ success: true, order })
  } catch (error: any) {
    console.error("Server error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  // Wrap everything in a try-catch to ensure we always return valid JSON
  try {
    const cookieStore = cookies()

    // Create the Supabase client with proper error handling
    let supabase
    try {
      supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    } catch (clientError) {
      console.error("Error creating Supabase client:", clientError)
      return NextResponse.json(
        {
          error: "Database connection error",
          details: clientError instanceof Error ? clientError.message : "Unknown client error",
        },
        { status: 500 },
      )
    }

    // Get the current session with error handling
    let session
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      session = data.session
    } catch (sessionError) {
      console.error("Session error:", sessionError)
      return NextResponse.json(
        {
          error: "Authentication error",
          details: sessionError instanceof Error ? sessionError.message : "Unknown session error",
        },
        { status: 401 },
      )
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized - No session found" }, { status: 401 })
    }

    // Get user's orders with error handling
    try {
      console.log("Fetching orders for user:", session.user.id)
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Database query error:", error)
        return NextResponse.json(
          {
            error: "Database query error",
            details: error.message,
          },
          { status: 500 },
        )
      }

      console.log("Successfully fetched orders:", orders?.length || 0)

      // Return a properly formatted JSON response
      return NextResponse.json({
        success: true,
        orders: orders || [],
      })
    } catch (queryError) {
      console.error("Unexpected query error:", queryError)
      return NextResponse.json(
        {
          error: "Unexpected database error",
          details: queryError instanceof Error ? queryError.message : "Unknown query error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    // Catch-all error handler to ensure we always return valid JSON
    console.error("Unhandled server error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
