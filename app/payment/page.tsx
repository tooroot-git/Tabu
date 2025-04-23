"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/lib/auth0"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { PaymentForm } from "@/components/stripe/payment-form"
import { AlertCircle } from "lucide-react"

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentPage() {
  const { isRTL } = useLanguage()
  const { user, isAuthenticated, isLoading } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isCreatingIntent, setIsCreatingIntent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get order details from URL params
  const block = searchParams.get("block")
  const parcel = searchParams.get("parcel")
  const subparcel = searchParams.get("subparcel")
  const serviceType = searchParams.get("type")
  const price = getServicePrice(serviceType || "regular")

  useEffect(() => {
    // Redirect if missing required parameters
    if (!block || !parcel || !serviceType) {
      router.push("/order")
      return
    }

    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
      if (isCreatingIntent || clientSecret) return

      setIsCreatingIntent(true)
      setError(null)

      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: price,
            block,
            parcel,
            subparcel: subparcel || undefined,
            service_type: serviceType,
            email: user?.email,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to create payment intent")
        }

        setClientSecret(data.clientSecret)
        setOrderId(data.orderId)
      } catch (err) {
        console.error("Error creating payment intent:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsCreatingIntent(false)
      }
    }

    if (isAuthenticated && !isLoading) {
      createPaymentIntent()
    }
  }, [
    block,
    parcel,
    subparcel,
    serviceType,
    price,
    isAuthenticated,
    isLoading,
    user,
    router,
    isCreatingIntent,
    clientSecret,
  ])

  // Function to get service price
  function getServicePrice(type: string): number {
    switch (type) {
      case "regular":
        return 39
      case "historical":
        return 69
      case "full":
        return 89
      case "concentrated":
        return 59
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
        case "full":
          return "נסח מלא"
        case "concentrated":
          return "נסח מרוכז"
        default:
          return "נסח רגיל"
      }
    } else {
      switch (type) {
        case "regular":
          return "Regular Extract"
        case "historical":
          return "Historical Extract"
        case "full":
          return "Full Extract"
        case "concentrated":
          return "Concentrated Extract"
        default:
          return "Regular Extract"
      }
    }
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
                { label: isRTL ? "תשלום" : "Payment", href: "/payment", active: true },
                { label: isRTL ? "אישור" : "Confirmation", href: "/confirmation" },
              ]}
              currentStep={3}
            />

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
                      <div className="flex justify-between">
                        <span className="text-gray-600">{isRTL ? "סוג מסמך" : "Document Type"}:</span>
                        <span className="font-medium">{getServiceName(serviceType || "regular")}</span>
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

                  {clientSecret ? (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: "stripe",
                          variables: {
                            colorPrimary: "#6366f1",
                          },
                        },
                        locale: isRTL ? "he" : "en",
                      }}
                    >
                      <PaymentForm orderId={orderId || ""} amount={price} isRTL={isRTL} />
                    </Elements>
                  ) : (
                    <div className="flex justify-center py-8">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                    </div>
                  )}
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
