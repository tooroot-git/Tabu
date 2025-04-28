import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

// Initialize Resend for email notifications
const resend = new Resend(process.env.RESEND_API_KEY)

// Validate API key middleware
function validateApiKey(request: Request) {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }

  const apiKey = authHeader.split(" ")[1]
  return apiKey === process.env.AUTOMATION_API_KEY
}

export async function POST(request: Request) {
  // Validate API key
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase credentials")
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get the order details
    const { data: order, error: orderError } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if order is already fulfilled
    if (order.status === "fulfilled") {
      return NextResponse.json({ message: "Order already fulfilled" })
    }

    // Check if order is paid
    if (order.status !== "paid") {
      return NextResponse.json({ error: "Order is not paid" }, { status: 400 })
    }

    // TODO: Implement your automation logic here
    // This is where you would trigger your Playwright bot or other automation

    // For now, we'll simulate a successful fulfillment
    const documentUrl = `https://tabuisrael.co.il/documents/${orderId}.pdf`

    // Update the order status to fulfilled
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "fulfilled",
        document_url: documentUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)

    if (updateError) {
      return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
    }

    // Send fulfillment email
    if (order.email) {
      try {
        await resend.emails.send({
          from: "Tabu Israel <support@tabuisrael.co.il>",
          to: order.email,
          subject: "המסמך שלך מוכן להורדה | Your Document is Ready",
          html: `
            <div dir="rtl" style="font-family: Arial, sans-serif;">
              <h1>המסמך שלך מוכן!</h1>
              <p>המסמך שהזמנת מוכן להורדה.</p>
              <p><strong>מספר הזמנה:</strong> ${orderId}</p>
              <p><strong>גוש:</strong> ${order.block}</p>
              <p><strong>חלקה:</strong> ${order.parcel}</p>
              <p><strong>סוג מסמך:</strong> ${order.service_type}</p>
              <p>לצפייה והורדת המסמך, אנא התחבר לחשבון שלך ב-Tabu.net.il.</p>
              <p><a href="https://tabuisrael.co.il/my-orders" style="background-color: #4F46E5; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">צפה במסמך</a></p>
              <p>בברכה,<br>צוות Tabu.net.il</p>
            </div>
            <div dir="ltr" style="font-family: Arial, sans-serif; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <h1>Your Document is Ready!</h1>
              <p>The document you ordered is ready for download.</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Block:</strong> ${order.block}</p>
              <p><strong>Parcel:</strong> ${order.parcel}</p>
              <p><strong>Document Type:</strong> ${order.service_type}</p>
              <p>To view and download your document, please log in to your account at Tabu.net.il.</p>
              <p><a href="https://tabuisrael.co.il/my-orders" style="background-color: #4F46E5; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Document</a></p>
              <p>Best regards,<br>The Tabu.net.il Team</p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error("Error sending fulfillment email:", emailError)
        // Continue even if email fails
      }
    }

    return NextResponse.json({ success: true, message: "Order fulfilled successfully" })
  } catch (error: any) {
    console.error("Error fulfilling order:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
