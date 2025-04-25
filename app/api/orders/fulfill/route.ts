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

    // Check if user is admin (you'll need to implement this check)
    // For now, we'll assume the endpoint is protected by middleware
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { orderId, documentUrl } = body

    if (!orderId || !documentUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get the order to verify it exists and to get user email
    const { data: order, error: orderError } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update the order with the document URL and change status to "sent"
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        document_url: documentUrl,
        status: "sent",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)

    if (updateError) {
      console.error("Error updating order:", updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Send notification email to user
    try {
      await resend.emails.send({
        from: "orders@tabuisrael.co.il",
        to: order.email,
        subject: `Your Document is Ready: ${order.block}-${order.parcel}${order.subparcel ? `-${order.subparcel}` : ""}`,
        html: `
          <h1>Your Document is Ready</h1>
          <p>Hello,</p>
          <p>Your requested document is now available for download.</p>
          <p><strong>Block:</strong> ${order.block}</p>
          <p><strong>Parcel:</strong> ${order.parcel}</p>
          ${order.subparcel ? `<p><strong>Subparcel:</strong> ${order.subparcel}</p>` : ""}
          <p><strong>Service Type:</strong> ${order.service_type}</p>
          <p>
            <a href="${documentUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
              Download Document
            </a>
          </p>
          <p>You can also view your document in your <a href="https://tabuisrael.co.il/dashboard">dashboard</a>.</p>
          <p>Thank you for using our service!</p>
        `,
      })
    } catch (emailError) {
      console.error("Error sending user notification:", emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Server error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
