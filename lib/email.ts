import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail({
  userEmail,
  block,
  parcel,
  subparcel,
  orderType,
  price,
  paymentId,
  orderId,
}: {
  userEmail: string
  block: string
  parcel: string
  subparcel?: string
  orderType: string
  price: number
  paymentId: string
  orderId?: string
}) {
  try {
    // Send email to admin
    const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
      from: "Tabu Israel <noreply@tabuisrael.co.il>",
      to: "orders@tabuisrael.co.il", // Admin email
      subject: "New Tabu Order Received",
      html: `
        <h1>New Order Received</h1>
        <p><strong>User:</strong> ${userEmail}</p>
        <p><strong>Block:</strong> ${block}</p>
        <p><strong>Parcel:</strong> ${parcel}</p>
        ${subparcel ? `<p><strong>Subparcel:</strong> ${subparcel}</p>` : ""}
        <p><strong>Order Type:</strong> ${orderType}</p>
        <p><strong>Price:</strong> ₪${price}</p>
        <p><strong>Payment ID:</strong> ${paymentId || "N/A"}</p>
        <p><strong>Order ID:</strong> ${orderId || "N/A"}</p>
        <p><strong>Status:</strong> Paid</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}</p>
      `,
    })

    if (adminEmailError) {
      console.error("Error sending admin email:", adminEmailError)
    }

    // Send confirmation email to user
    const { data: userEmailData, error: userEmailError } = await resend.emails.send({
      from: "Tabu Israel <noreply@tabuisrael.co.il>",
      to: userEmail,
      subject: "Your Tabu Order Confirmation",
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order. We have received your payment and are processing your request.</p>
        <h2>Order Details:</h2>
        <p><strong>Block:</strong> ${block}</p>
        <p><strong>Parcel:</strong> ${parcel}</p>
        ${subparcel ? `<p><strong>Subparcel:</strong> ${subparcel}</p>` : ""}
        <p><strong>Order Type:</strong> ${orderType}</p>
        <p><strong>Price:</strong> ₪${price}</p>
        <p><strong>Order ID:</strong> ${orderId || "N/A"}</p>
        <p>We will notify you by email when your document is ready for download.</p>
        <p>You can also check the status of your order in your <a href="https://tabuisrael.co.il/dashboard">dashboard</a>.</p>
        <p>Thank you for using our service!</p>
        <p>Tabu Israel Team</p>
      `,
    })

    if (userEmailError) {
      console.error("Error sending user email:", userEmailError)
      throw userEmailError
    }

    return { adminEmailData, userEmailData }
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}

export async function sendDocumentReadyEmail({
  userEmail,
  block,
  parcel,
  subparcel,
  orderType,
  orderId,
  fileUrl,
}: {
  userEmail: string
  block: string
  parcel: string
  subparcel?: string
  orderType: string
  orderId: string
  fileUrl: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Tabu Israel <noreply@tabuisrael.co.il>",
      to: userEmail,
      subject: "Your Tabu Document is Ready",
      html: `
        <h1>Your Tabu Document is Ready</h1>
        <p>Hello,</p>
        <p>Your requested Tabu document is now ready for download.</p>
        <h2>Order Details:</h2>
        <p><strong>Block:</strong> ${block}</p>
        <p><strong>Parcel:</strong> ${parcel}</p>
        ${subparcel ? `<p><strong>Subparcel:</strong> ${subparcel}</p>` : ""}
        <p><strong>Order Type:</strong> ${orderType}</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p>You can download your document by clicking the link below or by visiting your dashboard:</p>
        <p><a href="${fileUrl}" target="_blank">Download Your Document</a></p>
        <p><a href="https://tabuisrael.co.il/dashboard" target="_blank">View in Dashboard</a></p>
        <p>Thank you for using our service!</p>
        <p>Tabu Israel Team</p>
      `,
    })

    if (error) {
      console.error("Error sending document ready email:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to send document ready email:", error)
    throw error
  }
}
