"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useUser } from "@/lib/auth-mock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AlertCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

// Stripe payment links for each service type
const PAYMENT_LINKS = {
  regular: "https://buy.stripe.com/5kA4jDbXu0lNaiI9AF", // נסח טאבו רגיל
  concentrated: "https://buy.stripe.com/eVa7vP8Li1pR2Qg004", // נסח טאבו מרוכז
  historical: "https://buy.stripe.com/7sI6rLd1yb0rbmM7sv", // נסח טאבו הסטורי
  "by-address": "https://buy.stripe.com/3cs03nbXu8SjduU6oq", // נסח טאבו לפי כתובת
  "property-report": "https://buy.stripe.com/28o03n8LigkLcqQ5kl", // דו״ח נכסים על פי ת.ז
}

export default function PaymentPage() {
  const { isRTL } = useLanguage()
  const { user, isLoading } = useUser()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)

  // Get order details from URL params
  const block = searchParams.get("block")
  const parcel = searchParams.get("parcel")
  const subparcel = searchParams.get("subparcel")
  const service = searchParams.get("service") || "regular"
  const inputType = searchParams.get("inputType")
  const street = searchParams.get("street")
  const houseNumber = searchParams.get("houseNumber")
  const city = searchParams.get("city")

  const price = getServicePrice(service)

  // Redirect if missing required parameters
  useEffect(() => {
    if (inputType === "blockParcel" && (!block || !parcel)) {
      router.push("/order")
    } else if (inputType === "address" && (!street || !houseNumber || !city)) {
      router.push("/order")
    }
  }, [block, parcel, inputType, street, houseNumber, city, router])

  // Function to get service price
  function getServicePrice(type: string): number {
    switch (type) {
      case "regular":
        return 39
      case "historical":
        return 69
      case "concentrated":
        return 59
      case "by-address":
        return 79
      case "property-report":
        return 99
      default:
        return 39
    }
  }

  // Function to get service name
  function getServiceName(type: string): string {
    if (isRTL) {
      switch (type) {
        case "regular":
          return "נסח רגיל"
        case "historical":
          return "נסח היסטורי"
        case "concentrated":
          return "נסח מרוכז"
        case "by-address":
          return "נסח לפי כתובת"
        case "property-report":
          return "דו״ח נכסים על פי ת.ז"
        default:
          return "נסח רגיל"
      }
    } else {
      switch (type) {
        case "regular":
          return "Regular Extract"
        case "historical":
          return "Historical Extract"
        case "concentrated":
          return "Concentrated Extract"
        case "by-address":
          return "Extract by Address"
        case "property-report":
          return "Property Report by ID"
        default:
          return "Regular Extract"
      }
    }
  }

  // Function to get payment link with parameters
  function getPaymentLink(): string {
    const baseUrl = PAYMENT_LINKS[service] || PAYMENT_LINKS.regular

    // Add order details as URL parameters
    const params = new URLSearchParams()

    if (inputType === "blockParcel") {
      params.append("block", block || "")
      params.append("parcel", parcel || "")
      if (subparcel) params.append("subparcel", subparcel)
    } else {
      params.append("street", street || "")
      params.append("houseNumber", houseNumber || "")
      params.append("city", city || "")
    }

    params.append("service", service)
    params.append("inputType", inputType || "blockParcel")

    // Add user email if available
    if (user?.email) params.append("email", user.email)

    // Add success and cancel URLs
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    params.append("success_url", `${origin}/confirmation?${params.toString()}`)
    params.append("cancel_url", `${origin}/payment?${params.toString()}`)

    // Append parameters to URL
    return `${baseUrl}?${params.toString()}`
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
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
      status: "current" as const,
    },
    {
      title: isRTL ? "אישור" : "Confirmation",
      status: "upcoming" as const,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Stepper steps={steps} currentStep={2} className="mb-8" />

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? "תשלום" : "Payment"}</CardTitle>
                  <CardDescription>
                    {isRTL ? "השלם את התשלום כדי לקבל את המסמך שלך" : "Complete payment to receive your document"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-medium">{isRTL ? "פרטי הזמנה" : "Order Details"}</h3>
                    <div className="mt-4 space-y-2">
                      {inputType === "blockParcel" ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isRTL ? "גוש" : "Block"}:</span>
                            <span className="font-medium">{block}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isRTL ? "חלקה" : "Parcel"}:</span>
                            <span className="font-medium">{parcel}</span>
                          </div>
                          {subparcel && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">{isRTL ? "תת-חלקה" : "Sub-Parcel"}:</span>
                              <span className="font-medium">{subparcel}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isRTL ? "רחוב" : "Street"}:</span>
                            <span className="font-medium">{street}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isRTL ? "מספר בית" : "House Number"}:</span>
                            <span className="font-medium">{houseNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{isRTL ? "עיר" : "City"}:</span>
                            <span className="font-medium">{city}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">{isRTL ? "סוג מסמך" : "Document Type"}:</span>
                        <span className="font-medium">{getServiceName(service)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="font-medium">{isRTL ? "סה״כ לתשלום" : "Total"}:</span>
                        <span className="font-bold">₪{price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
                      <div className="flex items-center">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        <span>{error}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col space-y-4">
                    <Button
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                      size="lg"
                      onClick={() => (window.location.href = getPaymentLink())}
                    >
                      <ExternalLink className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
                      {isRTL ? `המשך לתשלום - ₪${price.toFixed(2)}` : `Proceed to Payment - ₪${price.toFixed(2)}`}
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                      {isRTL
                        ? "תועבר לעמוד תשלום מאובטח של Stripe לביצוע התשלום"
                        : "You will be redirected to Stripe's secure payment page"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
