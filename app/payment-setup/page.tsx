"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function PaymentSetup() {
  const { isRTL } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const setupIntent = searchParams.get("setup_intent")

  useEffect(() => {
    // Load Stripe.js
    const loadStripe = async () => {
      try {
        const { loadStripe } = await import("@stripe/stripe-js")
        const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")
        const stripe = await stripePromise

        if (!stripe || !setupIntent) {
          throw new Error("Failed to initialize Stripe or missing setup intent")
        }

        // Load the Elements
        const { elements } = await import("@stripe/stripe-js")
        const stripeElements = elements({
          clientSecret: setupIntent,
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#6366f1",
            },
          },
        })

        // Create the card element
        const cardElement = stripeElements.create("card", {
          style: {
            base: {
              fontSize: "16px",
              color: "#ffffff",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
          },
        })

        // Mount the card element
        cardElement.mount("#card-element")

        // Handle form submission
        const form = document.getElementById("payment-form")
        form?.addEventListener("submit", async (event) => {
          event.preventDefault()
          setProcessing(true)

          const { error } = await stripe.confirmCardSetup(setupIntent, {
            payment_method: {
              card: cardElement,
            },
          })

          if (error) {
            toast({
              title: isRTL ? "שגיאה בהגדרת אמצעי תשלום" : "Error setting up payment method",
              description: error.message,
              variant: "destructive",
            })
            setProcessing(false)
          } else {
            toast({
              title: isRTL ? "אמצעי תשלום נוסף בהצלחה" : "Payment method added successfully",
              description: isRTL ? "אמצעי התשלום שלך נוסף בהצלחה" : "Your payment method has been added successfully",
            })
            router.push("/settings/billing")
          }
        })

        setLoading(false)
      } catch (error) {
        console.error("Error loading Stripe:", error)
        toast({
          title: isRTL ? "שגיאה בטעינת Stripe" : "Error loading Stripe",
          description: isRTL ? "לא ניתן לטעון את Stripe כרגע" : "Unable to load Stripe at this time",
          variant: "destructive",
        })
      }
    }

    loadStripe()
  }, [setupIntent, isRTL, router])

  return (
    <div className="container max-w-md py-12">
      <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">{isRTL ? "הוספת אמצעי תשלום" : "Add Payment Method"}</CardTitle>
          <CardDescription>
            {isRTL ? "הוסף כרטיס אשראי או אמצעי תשלום אחר" : "Add a credit card or other payment method"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : (
            <form id="payment-form" className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="card-element" className="block text-sm font-medium text-gray-300">
                  {isRTL ? "פרטי כרטיס אשראי" : "Card Details"}
                </label>
                <div id="card-element" className="p-3 border border-gray-700 rounded-md bg-gray-800/50 min-h-[40px]" />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 animate-spin" />
                    {isRTL ? "מעבד..." : "Processing..."}
                  </>
                ) : isRTL ? (
                  "הוסף אמצעי תשלום"
                ) : (
                  "Add Payment Method"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
