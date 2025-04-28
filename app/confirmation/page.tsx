"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { CheckCircle, AlertCircle } from "lucide-react"

// Maximum number of retry attempts
const MAX_RETRIES = 3
// Delay between retries in milliseconds (starts at 1s, then 2s, then 4s with exponential backoff)
const RETRY_DELAY = 1000

export default function ConfirmationPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [botProcessing, setBotProcessing] = useState(false)
  const [botProcessed, setBotProcessed] = useState(false)
  const [botError, setBotError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Get session ID from URL params
  const sessionId = searchParams.get("session_id")

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/orders/session?session_id=${sessionId}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch order details")
        }

        setOrderDetails(data.order)
        console.log("Order details fetched successfully:", data.order)
      } catch (err: any) {
        console.error("Error fetching order details:", err)
        setError(err.message || "An error occurred while fetching order details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [sessionId])

  // Send order to bot service after successful payment with retry mechanism
  useEffect(() => {
    const sendOrderToBot = async () => {
      if (!orderDetails || botProcessing || botProcessed || retryCount >= MAX_RETRIES) return

      setBotProcessing(true)

      try {
        // Determine search type based on available fields
        const searchType = orderDetails.street && orderDetails.city ? "address" : "block"

        // Prepare payload based on the search type
        const payload = {
          user_id: orderDetails.user_id || "",
          email: orderDetails.email || "",
          search_type: searchType,
          city: searchType === "address" ? orderDetails.city || "" : "",
          street: searchType === "address" ? orderDetails.street || "" : "",
          house_number: searchType === "address" ? orderDetails.house_number || "" : "",
          block: searchType === "block" ? orderDetails.block || "" : "",
          parcel: searchType === "block" ? orderDetails.parcel || "" : "",
          subparcel: searchType === "block" ? orderDetails.subparcel || "" : "",
          service_type: orderDetails.service_type || "regular",
        }

        console.log(`Sending order to bot service (attempt ${retryCount + 1}/${MAX_RETRIES}):`, payload)

        const botServiceUrl = "https://order.tabuisrael.co.il/run-order"
        const response = await fetch(botServiceUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `Failed with status: ${response.status}`)
        }

        console.log("Order successfully sent to bot service")
        setBotProcessed(true)
        setBotError(null)
      } catch (err: any) {
        console.error(`Error sending order to bot service (attempt ${retryCount + 1}/${MAX_RETRIES}):`, err)
        setBotError(err.message || "Failed to send order to bot service")

        // If we haven't reached max retries, schedule another attempt with exponential backoff
        if (retryCount < MAX_RETRIES - 1) {
          const nextRetryDelay = RETRY_DELAY * Math.pow(2, retryCount)
          console.log(`Scheduling retry in ${nextRetryDelay}ms...`)

          setTimeout(() => {
            setRetryCount(retryCount + 1)
            setBotProcessing(false)
          }, nextRetryDelay)
        } else {
          console.error("Max retry attempts reached. Order will need to be processed manually.")
          // We'll still mark it as processed to prevent further retries
          setBotProcessed(true)
        }
      }
    }

    if (orderDetails && !botProcessing && !botProcessed) {
      sendOrderToBot()
    }
  }, [orderDetails, botProcessing, botProcessed, retryCount])

  // Function to manually retry sending to bot
  const handleManualRetry = () => {
    if (botProcessed) {
      setBotProcessed(false)
      setBotProcessing(false)
      setRetryCount(0)
      setBotError(null)
    }
  }

  return (
    <div className="container py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">{isRTL ? "תודה על הזמנתך!" : "Thank you for your order!"}</CardTitle>
          <CardDescription>
            {isRTL
              ? "הזמנתך התקבלה בהצלחה והמסמך שלך יישלח אליך למייל ברגע שהוא יופק"
              : "Your order has been successfully processed and your document will be sent to your email as soon as it's generated"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
              <p>{error}</p>
            </div>
          ) : orderDetails ? (
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <h3 className="font-medium">{isRTL ? "פרטי הזמנה" : "Order Details"}</h3>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{isRTL ? "מספר הזמנה" : "Order ID"}</span>
                  <span className="font-medium">{orderDetails.id}</span>
                </div>
                {orderDetails.block && (
                  <div className="flex justify-between">
                    <span>{isRTL ? "גוש" : "Block"}</span>
                    <span className="font-medium">{orderDetails.block}</span>
                  </div>
                )}
                {orderDetails.parcel && (
                  <div className="flex justify-between">
                    <span>{isRTL ? "חלקה" : "Parcel"}</span>
                    <span className="font-medium">{orderDetails.parcel}</span>
                  </div>
                )}
                {orderDetails.subparcel && (
                  <div className="flex justify-between">
                    <span>{isRTL ? "תת-חלקה" : "Subparcel"}</span>
                    <span className="font-medium">{orderDetails.subparcel}</span>
                  </div>
                )}
                {orderDetails.city && (
                  <div className="flex justify-between">
                    <span>{isRTL ? "עיר" : "City"}</span>
                    <span className="font-medium">{orderDetails.city}</span>
                  </div>
                )}
                {orderDetails.street && (
                  <div className="flex justify-between">
                    <span>{isRTL ? "רחוב" : "Street"}</span>
                    <span className="font-medium">{orderDetails.street}</span>
                  </div>
                )}
                {orderDetails.house_number && (
                  <div className="flex justify-between">
                    <span>{isRTL ? "מספר בית" : "House Number"}</span>
                    <span className="font-medium">{orderDetails.house_number}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{isRTL ? "סוג מסמך" : "Document Type"}</span>
                  <span className="font-medium">{orderDetails.service_type}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                  <span className="font-medium">{isRTL ? "סה״כ ששולם" : "Total Paid"}</span>
                  <span className="font-bold">₪{orderDetails.price}</span>
                </div>
              </div>

              {/* Bot processing status */}
              {botProcessing && (
                <div className="mt-4 flex items-center justify-center space-x-2 rounded-md bg-blue-50 p-3 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                  <span>{isRTL ? "מעבד את הזמנתך..." : "Processing your order..."}</span>
                </div>
              )}

              {botError && botProcessed && (
                <div className="mt-4 rounded-md bg-yellow-50 p-3 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
                  <div className="flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    <span>{isRTL ? "הזמנתך תטופל ידנית" : "Your order will be processed manually"}</span>
                  </div>
                  <Button onClick={handleManualRetry} variant="outline" size="sm" className="mt-2 w-full">
                    {isRTL ? "נסה שוב" : "Retry"}
                  </Button>
                </div>
              )}

              {botProcessed && !botError && (
                <div className="mt-4 rounded-md bg-green-50 p-3 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>
                      {isRTL
                        ? "הזמנתך נשלחה לעיבוד. המסמך יישלח למייל שלך בהקדם."
                        : "Your order has been sent for processing. The document will be emailed to you shortly."}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">{isRTL ? "לא נמצאו פרטי הזמנה" : "No order details found"}</div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            onClick={() => router.push("/my-orders")}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white"
          >
            {isRTL ? "צפה בהזמנות שלי" : "View My Orders"}
          </Button>
          <Button onClick={() => router.push("/")} variant="outline" className="w-full">
            {isRTL ? "חזרה לדף הבית" : "Return to Home"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
