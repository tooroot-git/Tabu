import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"
import { Resend } from "resend"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Get the user session
    const session = await getSession()

    // Get request body
    const body = await request.json()
    const { to, subject, html, fromName } = body

    if (!to || !subject || !html) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: `${fromName || "Tabu Israel"} <noreply@tabuisrael.co.il>`,
      to,
      subject,
      html,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in send-email API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
