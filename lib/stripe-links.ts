// Map of document types to their Stripe Payment Link IDs
export const DOCUMENT_TYPE_TO_PAYMENT_LINK = {
  regular: "https://buy.stripe.com/5kA4jDbXu0lNaiI9AF", // נסח טאבו רגיל
  consolidated: "https://buy.stripe.com/eVa7vP8Li1pR2Qg004", // נסח טאבו מרוכז
  historical: "https://buy.stripe.com/7sI6rLd1yb0rbmM7sv", // נסח טאבו הסטורי
  address: "https://buy.stripe.com/3cs03nbXu8SjduU6oq", // נסח טאבו לפי כתובת כולל איתור פרטים
  "id-report": "https://buy.stripe.com/28o03n8LigkLcqQ5kl", // דו׳׳ח נכסים על פי ת.ז
}

// Function to get the payment link URL with order details
export function getPaymentLinkWithOrderDetails(
  documentType: string,
  orderDetails: {
    block?: string
    parcel?: string
    subParcel?: string
    address?: string
    idNumber?: string
    email: string
    name: string
  },
): string {
  const baseUrl = DOCUMENT_TYPE_TO_PAYMENT_LINK[documentType as keyof typeof DOCUMENT_TYPE_TO_PAYMENT_LINK]

  if (!baseUrl) {
    throw new Error(`Invalid document type: ${documentType}`)
  }

  // Create URL object to easily add parameters
  const url = new URL(baseUrl)

  // Add order details as URL parameters
  if (orderDetails.block) url.searchParams.append("block", orderDetails.block)
  if (orderDetails.parcel) url.searchParams.append("parcel", orderDetails.parcel)
  if (orderDetails.subParcel) url.searchParams.append("subParcel", orderDetails.subParcel)
  if (orderDetails.address) url.searchParams.append("address", orderDetails.address)
  if (orderDetails.idNumber) url.searchParams.append("idNumber", orderDetails.idNumber)
  if (orderDetails.email) url.searchParams.append("email", orderDetails.email)
  if (orderDetails.name) url.searchParams.append("name", orderDetails.name)

  // Add success and cancel URLs
  const baseAppUrl = process.env.NEXT_PUBLIC_API_URL || ""
  url.searchParams.append("success_url", `${baseAppUrl}/confirmation?order_id={CHECKOUT_SESSION_ID}`)
  url.searchParams.append("cancel_url", `${baseAppUrl}/document-selection`)

  return url.toString()
}
