"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getOrderById, getServiceName } from "@/lib/orders"
import { updateOrderStatus } from "@/lib/orders"
import { Stepper } from "@/components/ui/stepper"
import { MetaTags } from "@/components/seo/meta-tags"
import { StructuredData } from "@/components/seo/structured-data"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const { isRTL } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const orderId = searchParams.get("order_id")

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!orderId) {
        setIsLoading(false)
        return
      }

      try {
        // Fetch order details
        const order = await getOrderById(orderId)
        setOrderDetails(order)

        // Update order status to paid if it's still pending
        if (order.status === "pending") {
          await updateOrderStatus(orderId, "paid", searchParams.get("payment_intent") || undefined)
        }
      } catch (err) {
        console.error("Error fetching order details:", err)
        setError(isRTL ? "אירעה שגיאה בטעינת פרטי ההזמנה" : "An error occurred loading order details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId, isRTL, searchParams])

  const steps = [
    {
      title: isRTL ? "פרטי נכס" : "Property Details",
      status: "completed" as const,
    },
    {
      title: isRTL ? "בחירת מסמך" : "Document Selection",
      status: "completed" as const,
    },
    {
      title: isRTL ? "תשלום" : "Payment",
      status: "completed" as const,
    },
    {
      title: isRTL ? "אישור" : "Confirmation",
      status: "current" as const,
    },
  ]

  const title = isRTL
    ? "ההזמנה התקבלה – טאבו דיגיטלי נשלח למייל"
    : "Order Received - Digital Land Registry Sent to Email"

  const description = isRTL
    ? "תודה על ההזמנה! המסמך שלך ישלח למייל תוך מספר דקות."
    : "Thank you for your order! Your document will be sent to your email within minutes."

  if (isLoading) {
    return (
      <>
        <MetaTags title={title} description={description} />

        <div className={`flex min-h-screen flex-col ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
          <Header />
          <main className="flex-1 py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-400">{isRTL ? "טוען פרטי הזמנה..." : "Loading order details..."}</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  }

  if (!orderId || error) {
    return (
      <>
        <MetaTags
          title={isRTL ? "שגיאה בעיבוד ההזמנה | טאבוי ישראל" : "Order Processing Error | TabuIsrael"}
          description={
            isRTL
              ? "אירעה שגיאה בעיבוד ההזמנה. אנא צור קשר עם התמיכה."
              : "An error occurred while processing your order. Please contact support."
          }
          noindex={true}
        />

        <div className={`flex min-h-screen flex-col ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
          <Header />
          <main className="flex-1 py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <Card className="border-red-200 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <AlertCircle className="h-16 w-16 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl text-red-600">
                      {isRTL ? "שגיאה בעיבוד ההזמנה" : "Order Processing Error"}
                    </CardTitle>
                    <CardDescription className="text-red-500/80 mt-2">
                      {error ||
                        (isRTL
                          ? "לא ניתן למצוא את פרטי ההזמנה. אנא צור קשר עם התמיכה."
                          : "Order details could not be found. Please contact support.")}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-center pt-4 pb-6">
                    <Link href="/">
                      <Button size="lg">{isRTL ? "חזרה לדף הבית" : "Return to Home"}</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  }

  return (
    <>
      <MetaTags title={title} description={description} />
      <StructuredData type="Order" data={{ orderId }} />

      <div className={`flex min-h-screen flex-col ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
        <Header />
        <main className="flex-1 py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Stepper steps={steps} currentStep={3} className="mb-8" />

              <Card className="max-w-2xl mx-auto shadow-lg border-green-200">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-green-700">
                    {isRTL ? "ההזמנה התקבלה בהצלחה!" : "Order Successfully Received!"}
                  </CardTitle>
                  <CardDescription className="mt-2 text-base">
                    {isRTL
                      ? "תודה על הזמנתך. המסמך יישלח לכתובת האימייל שסיפקת."
                      : "Thank you for your order. The document will be sent to the email address you provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-6">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <h3 className="font-medium text-gray-800 text-lg mb-4">
                        {isRTL ? "פרטי הזמנה" : "Order Details"}
                      </h3>
                      <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div className="text-gray-600 font-medium">{isRTL ? "מספר הזמנה" : "Order ID"}</div>
                        <div className="font-mono">{orderDetails.id}</div>
                        <div className="text-gray-600 font-medium">{isRTL ? "סוג מסמך" : "Document Type"}</div>
                        <div>{getServiceName(orderDetails.service_type, isRTL)}</div>
                        {orderDetails.block && (
                          <>
                            <div className="text-gray-600 font-medium">{isRTL ? "גוש" : "Block"}</div>
                            <div>{orderDetails.block}</div>
                          </>
                        )}
                        {orderDetails.parcel && (
                          <>
                            <div className="text-gray-600 font-medium">{isRTL ? "חלקה" : "Parcel"}</div>
                            <div>{orderDetails.parcel}</div>
                          </>
                        )}
                        {orderDetails.subparcel && (
                          <>
                            <div className="text-gray-600 font-medium">{isRTL ? "תת-חלקה" : "Sub-Parcel"}</div>
                            <div>{orderDetails.subparcel}</div>
                          </>
                        )}
                        {orderDetails.street && (
                          <>
                            <div className="text-gray-600 font-medium">{isRTL ? "רחוב" : "Street"}</div>
                            <div>{orderDetails.street}</div>
                          </>
                        )}
                        {orderDetails.house_number && (
                          <>
                            <div className="text-gray-600 font-medium">{isRTL ? "מספר בית" : "House Number"}</div>
                            <div>{orderDetails.house_number}</div>
                          </>
                        )}
                        {orderDetails.city && (
                          <>
                            <div className="text-gray-600 font-medium">{isRTL ? "עיר" : "City"}</div>
                            <div>{orderDetails.city}</div>
                          </>
                        )}
                        {orderDetails.email && (
                          <>
                            <div className="text-gray-600 font-medium">{isRTL ? "אימייל" : "Email"}</div>
                            <div className="break-all">{orderDetails.email}</div>
                          </>
                        )}
                        <div className="text-gray-600 font-medium">{isRTL ? "סטטוס" : "Status"}</div>
                        <div className="font-medium">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {isRTL ? "שולם" : "Paid"}
                          </span>
                        </div>
                        <div className="text-gray-600 font-medium">{isRTL ? "מחיר" : "Price"}</div>
                        <div className="font-medium">₪{orderDetails.price}</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-blue-800 text-lg mb-3">{isRTL ? "מה הלאה?" : "What's Next?"}</h3>
                      <ul className="mt-2 text-sm text-blue-700 space-y-3 list-disc list-inside">
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
                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-4 pb-6 border-t border-gray-100">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/">{isRTL ? "חזרה לדף הבית" : "Return to Home"}</Link>
                  </Button>
                  <Button size="lg" asChild>
                    <Link href="/my-orders">{isRTL ? "צפה בהזמנות שלי" : "View My Orders"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
