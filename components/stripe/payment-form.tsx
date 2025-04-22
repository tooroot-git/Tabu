"use client"

import type React from "react"

import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { AlertError } from "@/components/ui/alert"
import { CreditCard, ShieldCheck } from "lucide-react"
import { useUser } from "@/lib/auth-mock"

interface PaymentFormProps {
  amount: number
  description: string
  orderDetails: any
  onSuccess: (paymentIntent: any) => void
  onError: (error: Error) => void
}

export function PaymentForm({ amount, description, orderDetails, onSuccess, onError }: PaymentFormProps) {
  const { isRTL } = useLanguage()
  const { user } = useUser()
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      // For preview, we'll simulate a successful payment
      setTimeout(() => {
        const mockPaymentIntent = {
          id: `pi_${Math.random().toString(36).substring(2, 15)}`,
          status: "succeeded",
          amount: amount * 100,
          currency: "ils",
          description,
        }

        // Save order to mock database
        if (user) {
          try {
            fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...orderDetails,
                payment_id: mockPaymentIntent.id,
                amount: amount,
                type_en: orderDetails.serviceDetails.titleEn,
                type_he: orderDetails.serviceDetails.titleHe,
              }),
            }).catch((err) => console.error("Error saving order:", err))
          } catch (err) {
            console.error("Error saving order:", err)
          }
        }

        onSuccess(mockPaymentIntent)
      }, 2000)
    } catch (error) {
      console.error("Payment error:", error)
      setErrorMessage((error as Error).message || "An unknown error occurred")
      onError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6 space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 rtl:left-auto rtl:right-4">
            <CreditCard className="h-5 w-5 text-gray-500" />
          </div>
          <div className="rounded-md border border-gray-700 bg-gray-800/50 p-5 pl-12 rtl:pl-5 rtl:pr-12 transition-all hover:border-primary-500/50 focus-within:border-primary-500/50 focus-within:shadow-[0_0_0_1px_rgba(232,93,4,0.3)]">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ffffff",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                    iconColor: "#e85d04",
                  },
                  invalid: {
                    color: "#ef4444",
                    iconColor: "#ef4444",
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>
        </div>

        {errorMessage && (
          <AlertError
            title={isRTL ? "שגיאה בתשלום" : "Payment Error"}
            description={errorMessage}
            className="border-red-900/50 bg-red-900/10"
          />
        )}

        <div className="flex items-center p-4 rounded-lg border border-primary-500/20 bg-primary-500/5">
          <ShieldCheck className="h-5 w-5 text-primary-500 mr-3 rtl:ml-3 rtl:mr-0" />
          <p className="text-sm text-gray-300">
            {isRTL
              ? "כל המידע שלך מוצפן ומאובטח. לעולם איננו שומרים את פרטי כרטיס האשראי שלך."
              : "All your information is encrypted and secure. We never store your credit card details."}
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-6 text-lg font-medium transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
        isLoading={isLoading}
      >
        {isRTL ? `שלם ₪${amount} עכשיו` : `Pay ₪${amount} Now`}
      </Button>
    </form>
  )
}
