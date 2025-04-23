import { Resend } from "resend"

const resend = new Resend(process.env.Resend_API_KEY)

export async function sendOrderConfirmationEmail({
  userEmail,
  block,
  parcel,
  subparcel,
  price,
  paymentId,
  orderId,
}: {
  userEmail: string
  block: string
  parcel: string
  subparcel?: string
  price: number
  paymentId: string
  orderId?: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Tabu Israel <noreply@tabuisrael.co.il>",
      to: "fmaor267@gmail.com", // Admin email
      subject: "New Tabu Order Received",
      text: `
New Tabu Order Received:
- User: ${userEmail}
- Block: ${block}
- Parcel: ${parcel}${subparcel ? `\n- Subparcel: ${subparcel}` : ""}
- Price: ₪${price}
- Payment ID: ${paymentId}
- Order ID: ${orderId || "N/A"}
- Status: Paid

Please process manually.
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}
