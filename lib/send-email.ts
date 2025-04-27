import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Sends a confirmation email to the customer with the document link
 */
export async function sendConfirmationEmail(email: string, documentUrl: string): Promise<void> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Tabu.net.il <noreply@tabu.net.il>",
      to: email,
      subject: "Your Tabu Document is Ready | המסמך שלך מוכן",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>המסמך שלך מוכן!</h2>
          <p>תודה שהשתמשת בשירותי tabu.net.il.</p>
          <p>המסמך שהזמנת מוכן וזמין להורדה באמצעות הקישור הבא:</p>
          <p><a href="${documentUrl}" style="display: inline-block; background-color: #4a6cf7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">הורד את המסמך</a></p>
          <p>הקישור יהיה זמין למשך 30 יום.</p>
          <p>אם יש לך שאלות נוספות, אל תהסס לפנות אלינו.</p>
          <hr style="margin: 20px 0;" />
          <div dir="ltr">
            <h2>Your Document is Ready!</h2>
            <p>Thank you for using tabu.net.il services.</p>
            <p>Your requested document is ready and available for download via the following link:</p>
            <p><a href="${documentUrl}" style="display: inline-block; background-color: #4a6cf7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Document</a></p>
            <p>This link will be available for 30 days.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      throw new Error("Failed to send confirmation email")
    }

    console.log("Confirmation email sent successfully:", data?.id)
  } catch (error) {
    console.error("Error in sendConfirmationEmail:", error)
    throw new Error("Failed to send confirmation email")
  }
}
