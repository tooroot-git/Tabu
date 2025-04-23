"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"

interface PaymentFormProps {
  orderId: string
  amount: number
  isRTL: boolean
}

export function PaymentForm({ orderId, amount, isRTL }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "succeeded" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")
    setErrorMessage(null)

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment("", {
        payment_method: {
          card: cardElement,
          billing_details: {},
        },
      })

      if (error) {
        setPaymentStatus("error")
        setErrorMessage(error.message || "An error occurred during payment")
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus("succeeded")

        // Redirect to confirmation page
        setTimeout(() => {
          router.push(`/confirmation?orderId=${orderId}`)
        }, 1500)
      }
    } catch (err) {
      setPaymentStatus("error")
      setErrorMessage("An unexpected error occurred")
      console.error("Payment error:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={isRTL ? "rtl" : "ltr"}>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">{isRTL ? "פרטי כרטיס אשראי" : "Card Details"}</label>
        <div className="rounded-md border border-gray-300 p-3 shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>

      {paymentStatus === "error" && errorMessage && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-red-800">
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {paymentStatus === "succeeded" && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-green-800">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
            <span>
              {isRTL
                ? "התשלום התקבל בהצלחה! מעביר אותך לדף האישור..."
                : "Payment successful! Redirecting to confirmation page..."}
            </span>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!stripe || isProcessing || paymentStatus === "succeeded"}>
        {isProcessing ? (
          <span className="flex items-center">
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent rtl:ml-2 rtl:mr-0"></span>
            {isRTL ? "מעבד תשלום..." : "Processing..."}
          </span>
        ) : (
          <span>{isRTL ? `שלם ₪${amount.toFixed(2)}` : `Pay ₪${amount.toFixed(2)}`}</span>
        )}
      </Button>

      <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
        <svg className="mr-2 h-6 rtl:ml-2 rtl:mr-0" viewBox="0 0 32 21" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <g fillRule="nonzero">
              <g>
                <g>
                  <path
                    d="M0 3.5c0-1.933 1.567-3.5 3.5-3.5h25c1.933 0 3.5 1.567 3.5 3.5v14c0 1.933-1.567 3.5-3.5 3.5h-25A3.499 3.499 0 0 1 0 17.5v-14Z"
                    fill="#EAEAEA"
                  />
                  <path
                    d="M28.5 21h-25A3.499 3.499 0 0 1 0 17.5v-14C0 1.567 1.567 0 3.5 0h25C30.433 0 32 1.567 32 3.5v14c0 1.933-1.567 3.5-3.5 3.5Z"
                    fill="#EAEAEA"
                  />
                  <path
                    d="M28.5 1C29.878 1 31 2.122 31 3.5v14c0 1.378-1.122 2.5-2.5 2.5h-25C2.122 20 1 18.878 1 17.5v-14C1 2.122 2.122 1 3.5 1h25Z"
                    fill="#FFF"
                  />
                  <path
                    d="M23.481 7.936c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M23.481 8.96c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M23.481 9.984c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M23.481 11.008c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M23.481 12.032c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M23.481 13.056c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M8.518 7.936c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M8.518 8.96c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M8.518 9.984c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M8.518 11.008c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M8.518 12.032c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M8.518 13.056c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M16 7.936c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M16 8.96c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M16 9.984c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M16 11.008c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M16 12.032c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                  <path
                    d="M16 13.056c.517 0 .937.144.937.32 0 .176-.42.32-.937.32-.517 0-.936-.144-.936-.32 0-.176.42-.32.936-.32Z"
                    fill="#828282"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {isRTL ? "התשלום מאובטח ומוצפן" : "Secure and encrypted payment"}
      </div>
    </form>
  )
}
