"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/lib/auth0"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"
import { CheckCircle, FileText } from "lucide-react"
import Link from "next/link"

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
  const { user, error: userError, isLoading: isUserLoading } = useAuth()
  const searchParams = useSearchParams()

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const orderId = searchParams.get("orderId")

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !user) return

      try {
        // For preview, use mock data instead of actual Supabase call
        const mockOrder: Order = {
          id: orderId || "12345678",
          block: "6941",
          parcel: "198",
          subparcel: "42",
          service_type: "regular",
          status: "paid",
          created_at: new Date().toISOString(),
          price: 39,
          user_id: user.sub || "preview-user-id",
          document_url: "/sample-document.pdf",
        }

        setOrder(mockOrder)
      } catch (err) {
        console.error("Error in fetchOrder:", err)
        setError(isRTL ? "אירעה שגיאה בעת טעינת פרטי ההזמנה" : "An error occurred while loading order details")
      } finally {
        setIsLoading(false)
      }
    }

    if (user && !isUserLoading) {
      fetchOrder()
    } else if (!isUserLoading) {
      setIsLoading(false)
    }
  }, [orderId, user, isUserLoading, isRTL])

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

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <main className="relative py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-700/20 blur-[120px]"></div>
          <div className="absolute top-[20%] right-[5%] h-[400px] w-[700px] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Stepper steps={steps} currentStep={3} className="mb-8" />

            <div className="mt-8">
              {isLoading || isUserLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                </div>
              ) : error || userError ? (
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-red-600">{isRTL ? "שגיאה" : "Error"}</CardTitle>
                    <CardDescription>
                      {error || (isRTL ? "אירעה שגיאה באימות" : "Authentication error")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                      <Link href="/dashboard">{isRTL ? "חזור ללוח הבקרה" : "Return to Dashboard"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : !user ? (
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>{isRTL ? "נדרשת התחברות" : "Authentication Required"}</CardTitle>
                    <CardDescription>
                      {isRTL ? "עליך להתחבר כדי לצפות בפרטי ההזמנה" : "You need to be logged in to view order details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                      onClick={() => {
                        document.cookie = "authed=true; path=/; max-age=86400"
                        window.location.reload()
                      }}
                    >
                      {isRTL ? "התחבר" : "Login"}
                    </Button>
                  </CardContent>
                </Card>
              ) : order ? (
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl text-white">
                      {isRTL ? "ההזמנה התקבלה בהצלחה!" : "Order Successfully Received!"}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {isRTL
                        ? "תודה על הזמנתך. המסמך שלך יהיה זמין בקרוב."
                        : "Thank you for your order. Your document will be available soon."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
                      <h3 className="text-lg font-medium text-white">{isRTL ? "פרטי הזמנה" : "Order Details"}</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? "מספר הזמנה" : "Order ID"}:</span>
                          <span className="font-medium text-white">{order.id.slice(0, 8)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? "תאריך" : "Date"}:</span>
                          <span className="font-medium text-white">{formatDate(order.created_at)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? "גוש" : "Block"}:</span>
                          <span className="font-medium text-white">{order.block}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? "חלקה" : "Parcel"}:</span>
                          <span className="font-medium text-white">{order.parcel}</span>
                        </div>
                        {order.subparcel && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">{isRTL ? "תת-חלקה" : "Sub-Parcel"}:</span>
                            <span className="font-medium text-white">{order.subparcel}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? "סוג מסמך" : "Document Type"}:</span>
                          <span className="font-medium text-white">{getDocumentType(order.service_type)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-700 pt-2">
                          <span className="font-medium text-white">{isRTL ? "סה״כ" : "Total"}:</span>
                          <span className="font-bold text-primary-500">₪{order.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 rounded-lg border border-primary-600/20 bg-primary-500/5 p-4 text-white">
                      <h4 className="font-medium">{isRTL ? "מה הלאה?" : "What's Next?"}</h4>
                      <p className="mt-2 text-sm text-gray-300">
                        {isRTL
                          ? "המסמך שלך נמצא כעת בעיבוד. ברגע שיהיה מוכן, תקבל הודעת אימייל עם קישור להורדה. תוכל גם לצפות במסמך בכל עת בלוח הבקרה שלך."
                          : "Your document is now being processed. Once it's ready, you'll receive an email with a download link. You can also view your document at any time in your dashboard."}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Button
                        asChild
                        className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                      >
                        <Link href="/dashboard">{isRTL ? "עבור ללוח הבקרה" : "Go to Dashboard"}</Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1 border-gray-700 text-white hover:bg-gray-800">
                        <Link href="/order">
                          <FileText className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                          {isRTL ? "הזמן מסמך נוסף" : "Order Another Document"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{isRTL ? "לא נמצאה הזמנה" : "Order Not Found"}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {isRTL
                        ? "לא ניתן למצוא את פרטי ההזמנה. אנא בדוק את הקישור או צור קשר עם התמיכה."
                        : "Could not find order details. Please check the link or contact support."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                      <Link href="/dashboard">{isRTL ? "חזור ללוח הבקרה" : "Return to Dashboard"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
