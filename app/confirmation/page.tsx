"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const { isRTL, t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  const orderId = searchParams.get("order_id")

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false)
      return
    }

    // In a real implementation, you would fetch the order details from your backend
    // For now, we'll simulate this with a timeout
    const timer = setTimeout(() => {
      setOrderDetails({
        id: orderId,
        status: "completed",
        documentType: "regular",
        block: searchParams.get("block") || "12345",
        parcel: searchParams.get("parcel") || "67",
        email: searchParams.get("email") || "user@example.com",
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [orderId, searchParams])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!orderId || !orderDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">{isRTL ? "שגיאה בעיבוד ההזמנה" : "Order Processing Error"}</CardTitle>
            <CardDescription>
              {isRTL
                ? "לא ניתן למצוא את פרטי ההזמנה. אנא צור קשר עם התמיכה."
                : "Order details could not be found. Please contact support."}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/">
              <Button>{isRTL ? "חזרה לדף הבית" : "Return to Home"}</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">{isRTL ? "ההזמנה התקבלה בהצלחה!" : "Order Successfully Received!"}</CardTitle>
          <CardDescription>
            {isRTL
              ? "תודה על הזמנתך. המסמך יישלח לכתובת האימייל שסיפקת."
              : "Thank you for your order. The document will be sent to the email address you provided."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700">{isRTL ? "פרטי הזמנה" : "Order Details"}</h3>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">{isRTL ? "מספר הזמנה" : "Order ID"}</div>
                <div>{orderDetails.id}</div>
                <div className="text-gray-500">{isRTL ? "סוג מסמך" : "Document Type"}</div>
                <div>
                  {orderDetails.documentType === "regular"
                    ? isRTL
                      ? "נסח טאבו רגיל"
                      : "Regular Land Registry Extract"
                    : orderDetails.documentType === "consolidated"
                      ? isRTL
                        ? "נסח טאבו מרוכז"
                        : "Consolidated Land Registry Extract"
                      : orderDetails.documentType === "historical"
                        ? isRTL
                          ? "נסח טאבו הסטורי"
                          : "Historical Land Registry Extract"
                        : orderDetails.documentType === "address"
                          ? isRTL
                            ? "נסח טאבו לפי כתובת"
                            : "Land Registry Extract by Address"
                          : orderDetails.documentType === "id-report"
                            ? isRTL
                              ? 'דו"ח נכסים על פי ת.ז'
                              : "Property Report by ID"
                            : orderDetails.documentType}
                </div>
                {orderDetails.block && (
                  <>
                    <div className="text-gray-500">{isRTL ? "גוש" : "Block"}</div>
                    <div>{orderDetails.block}</div>
                  </>
                )}
                {orderDetails.parcel && (
                  <>
                    <div className="text-gray-500">{isRTL ? "חלקה" : "Parcel"}</div>
                    <div>{orderDetails.parcel}</div>
                  </>
                )}
                {orderDetails.email && (
                  <>
                    <div className="text-gray-500">{isRTL ? "אימייל" : "Email"}</div>
                    <div>{orderDetails.email}</div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700">{isRTL ? "מה הלאה?" : "What's Next?"}</h3>
              <ul className="mt-2 text-sm text-blue-600 space-y-1 list-disc list-inside">
                <li>
                  {isRTL
                    ? "המסמך שהזמנת יעובד ויישלח לאימייל שלך בהקדם האפשרי."
                    : "Your ordered document will be processed and sent to your email as soon as possible."}
                </li>
                <li>
                  {isRTL
                    ? "תוכל לעקוב אחר סטטוס ההזמנה שלך באזור האישי."
                    : "You can track your order status in your personal area."}
                </li>
                <li>
                  {isRTL
                    ? "אם יש לך שאלות, אנא צור קשר עם התמיכה שלנו."
                    : "If you have any questions, please contact our support."}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline">{isRTL ? "חזרה לדף הבית" : "Return to Home"}</Button>
          </Link>
          <Link href="/my-orders">
            <Button>{isRTL ? "צפה בהזמנות שלי" : "View My Orders"}</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
