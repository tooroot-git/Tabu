"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/lib/auth0"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Stepper } from "@/components/ui/stepper"
import { CheckCircle, FileText } from "lucide-react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

// Order type
interface Order {
  id: string
  block: string
  parcel: string
  subparcel?: string
  service_type: string
  status: string
  created_at: string
  price: number
  user_id: string
  document_url?: string
}

export default function ConfirmationPage() {
  const { isRTL } = useLanguage()
  const { user, getAccessToken } = useAuth()
  const searchParams = useSearchParams()

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const orderId = searchParams.get("orderId")

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !user) return

      try {
        // Initialize Supabase client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
        const supabase = createClient(supabaseUrl, supabaseKey)

        // Get access token for authorization
        const token = await getAccessToken()

        // Fetch order details
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .eq("user_id", user.sub)
          .single()

        if (error) {
          console.error("Error fetching order:", error)
          setError(isRTL ? "לא ניתן למצוא את ההזמנה" : "Could not find the order")
          return
        }

        setOrder(data)
      } catch (err) {
        console.error("Error in fetchOrder:", err)
        setError(isRTL ? "אירעה שגיאה בעת טעינת פרטי ההזמנה" : "An error occurred while loading order details")
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchOrder()
    }
  }, [orderId, user, getAccessToken, isRTL])

  // Function to get document type translation
  const getDocumentType = (type: string): string => {
    if (isRTL) {
      switch (type) {
        case "regular":
          return "נסח רגיל"
        case "historical":
          return "נסח היסטורי"
        case "concentrated":
          return "נסח מרוכז"
        case "full":
          return "נסח מלא"
        default:
          return type
      }
    } else {
      switch (type) {
        case "regular":
          return "Regular Extract"
        case "historical":
          return "Historical Extract"
        case "concentrated":
          return "Concentrated Extract"
        case "full":
          return "Full Extract"
        default:
          return type
      }
    }
  }

  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(isRTL ? "he-IL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Stepper
              steps={[
                { label: isRTL ? "פרטי נכס" : "Property Details", href: "/order" },
                { label: isRTL ? "בחירת מסמך" : "Document Selection", href: "/document-selection" },
                { label: isRTL ? "תשלום" : "Payment", href: "/payment" },
                { label: isRTL ? "אישור" : "Confirmation", href: "/confirmation", active: true },
              ]}
              currentStep={4}
            />

            <div className="mt-8">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                </div>
              ) : error ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">{isRTL ? "שגיאה" : "Error"}</CardTitle>
                    <CardDescription>{error}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/dashboard">{isRTL ? "חזור ללוח הבקרה" : "Return to Dashboard"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : order ? (
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl">
                      {isRTL ? "ההזמנה התקבלה בהצלחה!" : "Order Successfully Received!"}
                    </CardTitle>
                    <CardDescription>
                      {isRTL
                        ? "תודה על הזמנתך. המסמך שלך יהיה זמין בקרוב."
                        : "Thank you for your order. Your document will be available soon."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 rounded-lg border border-gray-200 p-4">
                      <h3 className="text-lg font-medium">{isRTL ? "פרטי הזמנה" : "Order Details"}</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isRTL ? "מספר הזמנה" : "Order ID"}:</span>
                          <span className="font-medium">{order.id.slice(0, 8)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isRTL ? "תאריך" : "Date"}:</span>
                          <span className="font-medium">{formatDate(order.created_at)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isRTL ? "גוש" : "Block"}:</span>
                          <span className="font-medium">{order.block}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isRTL ? "חלקה" : "Parcel"}:</span>
                          <span className="font-medium">{order.parcel}</span>
                        </div>
                        {order.subparcel && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isRTL ? "תת-חלקה" : "Sub-Parcel"}:</span>
                            <span className="font-medium">{order.subparcel}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isRTL ? "סוג מסמך" : "Document Type"}:</span>
                          <span className="font-medium">{getDocumentType(order.service_type)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                          <span className="font-medium">{isRTL ? "סה״כ" : "Total"}:</span>
                          <span className="font-bold">₪{order.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 rounded-lg bg-blue-50 p-4 text-blue-800">
                      <h4 className="font-medium">{isRTL ? "מה הלאה?" : "What's Next?"}</h4>
                      <p className="mt-2 text-sm">
                        {isRTL
                          ? "המסמך שלך נמצא כעת בעיבוד. ברגע שיהיה מוכן, תקבל הודעת אימייל עם קישור להורדה. תוכל גם לצפות במסמך בכל עת בלוח הבקרה שלך."
                          : "Your document is now being processed. Once it's ready, you'll receive an email with a download link. You can also view your document at any time in your dashboard."}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Button asChild className="flex-1">
                        <Link href="/dashboard">{isRTL ? "עבור ללוח הבקרה" : "Go to Dashboard"}</Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1">
                        <Link href="/order">
                          <FileText className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                          {isRTL ? "הזמן מסמך נוסף" : "Order Another Document"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? "לא נמצאה הזמנה" : "Order Not Found"}</CardTitle>
                    <CardDescription>
                      {isRTL
                        ? "לא ניתן למצוא את פרטי ההזמנה. אנא בדוק את הקישור או צור קשר עם התמיכה."
                        : "Could not find order details. Please check the link or contact support."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/dashboard">{isRTL ? "חזור ללוח הבקרה" : "Return to Dashboard"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
