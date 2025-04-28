"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { getServiceName, getServicePrice } from "@/lib/orders"

export default function PaymentPage() {
  const { isRTL } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get order details from URL params
  const block = searchParams.get("block")
  const parcel = searchParams.get("parcel")
  const subparcel = searchParams.get("subparcel")
  const service = searchParams.get("service")
  const email = searchParams.get("email") || user?.email || ""

  // Check if we have the required parameters
  useEffect(() => {
    if (!block || !parcel || !service) {
      router.push("/order")
    }
  }, [block, parcel, service, router])

  // Handle payment
  const handlePayment = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          block,
          parcel,
          subparcel,
          service,
          email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (err: any) {
      console.error("Payment error:", err)
      setError(err.message || "An error occurred during payment processing")
      setIsLoading(false)
    }
  }

  // Calculate price
  const price = service ? getServicePrice(service) : 0
  const serviceName = service ? getServiceName(service, isRTL) : ""

  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>{isRTL ? "תשלום" : "Payment"}</CardTitle>
          <CardDescription>
            {isRTL ? "השלם את התשלום כדי לקבל את המסמך" : "Complete payment to receive your document"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <h3 className="font-medium">{isRTL ? "פרטי הזמנה" : "Order Details"}</h3>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{isRTL ? "גוש" : "Block"}</span>
                  <span className="font-medium">{block}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isRTL ? "חלקה" : "Parcel"}</span>
                  <span className="font-medium">{parcel}</span>
                </div>
                {subparcel && (
                  <div className="flex justify-between">
                    <span>{isRTL ? "תת-חלקה" : "Subparcel"}</span>
                    <span className="font-medium">{subparcel}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{isRTL ? "סוג מסמך" : "Document Type"}</span>
                  <span className="font-medium">{serviceName}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                  <span className="font-medium">{isRTL ? "סה״כ לתשלום" : "Total"}</span>
                  <span className="font-bold">₪{price}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                <p>{error}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                {isRTL ? "מעבד..." : "Processing..."}
              </span>
            ) : (
              <>{isRTL ? `שלם ₪${price}` : `Pay ₪${price}`}</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
