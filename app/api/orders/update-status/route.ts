import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Get the user session
    const session = await getSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Initialize Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // Update order status in Supabase
    const { data: order, error: updateError } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .eq("user_id", session.user.sub)
      .select()
      .single()

    if (updateError) {
      console.error("Error updating order:", updateError)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    // Send email notification if status is "paid"
    if (status === "paid") {
      try {
        // Send email to user
        await resend.emails.send({
          from: "noreply@tabuisrael.co.il",
          to: session.user.email!,
          subject: "Your Tabu Extract Order Confirmation",
          html: `
            <h1>Order Confirmation</h1>
            <p>Thank you for your order. Your payment has been processed successfully.</p>
            <p>Order ID: ${orderId}</p>
            <p>Block: ${order.block}</p>
            <p>Parcel: ${order.parcel}</p>
            <p>Service Type: ${order.service_type}</p>
            <p>Price: ₪${order.price}</p>
          `,
        })

        // Send email to admin
        await resend.emails.send({
          from: "noreply@tabuisrael.co.il",
          to: "admin@tabuisrael.co.il",
          subject: "New Tabu Extract Order",
          html: `
            <h1>New Order</h1>
            <p>A new order has been placed and paid for.</p>
            <p>Order ID: ${orderId}</p>
            <p>User ID: ${session.user.sub}</p>
            <p>User Email: ${session.user.email}</p>
            <p>Block: ${order.block}</p>
            <p>Parcel: ${order.parcel}</p>
            <p>Service Type: ${order.service_type}</p>
            <p>Price: ₪${order.price}</p>
          `,
        })
      } catch (emailError) {
        console.error("Error sending email:", emailError)
        // Continue even if email fails
      }
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Error in update-status API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
