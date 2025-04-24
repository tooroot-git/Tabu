import { NextResponse } from "next/server"
import { Resend } from "resend"

// השתמש במפתח ה-API שסופק
const resend = new Resend("re_EVWkRZ4w_2MQBSiiW9BdTGUXvjyiZaXs6")

// כתובת האימייל המאומתת היחידה שניתן לשלוח אליה בסביבת בדיקות
const VERIFIED_TEST_EMAIL = "cornpopcorn@duck.com"

export async function POST(request: Request) {
  try {
    const { to, subject, name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // בסביבת בדיקות, שלח את האימייל לכתובת המאומתת בלבד
    const emailSubject = `[TabuIsrael Contact Form] ${subject || "New message"}`

    // הוסף הערה בגוף האימייל שזו הודעה מטופס יצירת קשר
    const emailText = `
CONTACT FORM SUBMISSION FROM TABUISRAEL.CO.IL

Name: ${name}
Email: ${email}
Subject: ${subject || "N/A"}
Message:
${message}

Note: This email was sent to you because you are the verified test recipient for the Resend API.
The original recipient would have been: ${to}
    `

    const emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
    <p style="color: #666; font-style: italic;">This email was sent to you because you are the verified test recipient for the Resend API.<br>
    The original recipient would have been: ${to}</p>
  </div>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject || "N/A"}</p>
  <p><strong>Message:</strong></p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, "<br>")}
  </div>
  <hr style="margin-top: 20px; margin-bottom: 20px; border: 0; border-top: 1px solid #eee;" />
  <p style="color: #777; font-size: 12px;">This email was sent from the contact form on TabuIsrael.co.il</p>
</div>
    `

    // שלח את האימייל לכתובת המאומתת בלבד
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [VERIFIED_TEST_EMAIL], // שלח רק לכתובת המאומתת
      subject: emailSubject,
      reply_to: email, // שמור את כתובת השולח המקורית כ-reply-to
      text: emailText,
      html: emailHtml,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error in send-email API route:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
