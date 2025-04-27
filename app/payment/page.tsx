"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { Input } from "@/components/ui/input"
import { Lock, CreditCard, Calendar } from "lucide-react"

export default function PaymentPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [errors, setErrors] = useState({})
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Get order details from session storage
    const details = sessionStorage.getItem("orderDetails")
    if (!details) {
      router.push("/order")
      return
    }

    setOrderDetails(JSON.parse(details))
  }, [router])

  const validateForm = () => {
    const newErrors = {}

    if (!cardNumber.trim()) {
      newErrors.cardNumber = isRTL ? "נא להזין מספר כרטיס" : "Please enter card number"
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = isRTL ? "מספר כרטיס לא תקין" : "Invalid card number"
    }

    if (!cardName.trim()) {
      newErrors.cardName = isRTL ? "נא להזין שם בעל הכרטיס" : "Please enter cardholder name"
    }

    if (!expiryDate.trim()) {
      newErrors.expiryDate = isRTL ? "נא להזין תאריך תפוגה" : "Please enter expiry date"
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = isRTL ? "פורמט תאריך לא תקין (MM/YY)" : "Invalid date format (MM/YY)"
    }

    if (!cvv.trim()) {
      newErrors.cvv = isRTL ? "נא להזין קוד אבטחה" : "Please enter security code"
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = isRTL ? "קוד אבטחה לא תקין" : "Invalid security code"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // In a real application, you would process the payment here
      // For this demo, we'll simulate a successful payment

      // Check if user is logged in
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // Create a new order in the database
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          block: orderDetails.block,
          parcel: orderDetails.parcel,
          subparcel: orderDetails.subparcel || "",
          service_type: orderDetails.documentType,
          status: "paid",
          price: orderDetails.price,
          user_id: session?.user?.id || "guest",
          payment_method: "credit_card",
          payment_details: {
            last4: cardNumber.slice(-4),
            card_type: getCardType(cardNumber),
          },
        })
        .select()
        .single()

      if (error) throw error

      // Store order ID in session storage for confirmation page
      sessionStorage.setItem("orderId", order.id)

      // Navigate to confirmation page
      router.push("/confirmation")
    } catch (error) {
      console.error("Error:", error)
      // For demo purposes, still navigate to confirmation
      router.push("/confirmation")
    } finally {
      setIsLoading(false)
    }
  }

  const getCardType = (number) => {
    const firstDigit = number.charAt(0)
    if (firstDigit === "4") return "visa"
    if (firstDigit === "5") return "mastercard"
    if (firstDigit === "3") return "amex"
    return "unknown"
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e) => {
    const value = formatCardNumber(e.target.value)
    setCardNumber(value)
  }

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4)
    }

    setExpiryDate(value)
  }

  if (!orderDetails) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0A0E17] text-white">
        <Header />
        <main className="flex-1 py-24">
          <div className="container mx-auto px-4">
            <div className="flex h-[50vh] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const documentType = {
    regular: isRTL ? "נסח רגיל" : "Regular Extract",
    historical: isRTL ? "נסח היסטורי" : "Historical Extract",
    concentrated: isRTL ? "נסח מרוכז" : "Concentrated Extract",
    full: isRTL ? "נסח מלא" : "Full Extract",
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0E17] text-white">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Stepper
              steps={[
                { label: isRTL ? "פרטי נכס" : "Property Details", completed: true },
                { label: isRTL ? "בחירת מסמך" : "Document Selection", completed: true },
                { label: isRTL ? "תשלום" : "Payment", active: true },
              ]}
              currentStep={2}
            />

            <div className="mt-8 grid gap-8 md:grid-cols-5">
              <div className="md:col-span-3">
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{isRTL ? "פרטי תשלום" : "Payment Details"}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {isRTL ? "השלם את פרטי התשלום שלך" : "Complete your payment details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-white">
                          {isRTL ? "מספר כרטיס" : "Card Number"} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            type="text"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder={isRTL ? "הזן מספר כרטיס" : "Enter card number"}
                            className={`bg-gray-800 pl-10 text-white placeholder:text-gray-500 ${
                              isRTL ? "text-right" : ""
                            }`}
                            dir={isRTL ? "rtl" : "ltr"}
                            maxLength={19}
                          />
                          <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <label htmlFor="cardName" className="mb-2 block text-sm font-medium text-white">
                          {isRTL ? "שם בעל הכרטיס" : "Cardholder Name"} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="cardName"
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder={isRTL ? "הזן שם בעל הכרטיס" : "Enter cardholder name"}
                          className={`bg-gray-800 text-white placeholder:text-gray-500 ${isRTL ? "text-right" : ""}`}
                          dir={isRTL ? "rtl" : "ltr"}
                        />
                        {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="mb-2 block text-sm font-medium text-white">
                            {isRTL ? "תאריך תפוגה" : "Expiry Date"} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              id="expiryDate"
                              type="text"
                              value={expiryDate}
                              onChange={handleExpiryDateChange}
                              placeholder="MM/YY"
                              className="bg-gray-800 pl-10 text-white placeholder:text-gray-500"
                              maxLength={5}
                            />
                            <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          {errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="mb-2 block text-sm font-medium text-white">
                            {isRTL ? "קוד אבטחה" : "Security Code"} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              type="text"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                              placeholder={isRTL ? "הזן קוד אבטחה" : "Enter CVV"}
                              className="bg-gray-800 pl-10 text-white placeholder:text-gray-500"
                              maxLength={4}
                            />
                            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                        </div>
                      </div>

                      <div className="rounded-lg bg-gray-800 p-4">
                        <div className="flex items-center">
                          <Lock className="mr-2 h-5 w-5 text-green-500 rtl:ml-2 rtl:mr-0" />
                          <p className="text-sm text-gray-300">
                            {isRTL
                              ? "התשלום שלך מאובטח עם הצפנת SSL 256-bit"
                              : "Your payment is secured with 256-bit SSL encryption"}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-primary-500 to-primary-600"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg
                                className="mr-2 h-4 w-4 animate-spin rtl:ml-2 rtl:mr-0"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              {isRTL ? "מעבד תשלום..." : "Processing payment..."}
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Lock className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                              {isRTL
                                ? `שלם ₪${orderDetails.price} וקבל את הנסח`
                                : `Pay ₪${orderDetails.price} and Get Extract`}
                            </span>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{isRTL ? "סיכום הזמנה" : "Order Summary"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">{isRTL ? "פרטי נכס" : "Property Details"}</h3>
                        <p className="mt-1 text-white">
                          {isRTL ? "גוש" : "Block"}: {orderDetails.block}
                        </p>
                        <p className="mt-1 text-white">
                          {isRTL ? "חלקה" : "Parcel"}: {orderDetails.parcel}
                        </p>
                        {orderDetails.subparcel && (
                          <p className="mt-1 text-white">
                            {isRTL ? "תת-חלקה" : "Sub-parcel"}: {orderDetails.subparcel}
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-400">{isRTL ? "סוג מסמך" : "Document Type"}</h3>
                        <p className="mt-1 text-white">{documentType[orderDetails.documentType]}</p>
                      </div>

                      <div className="border-t border-gray-800 pt-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">{isRTL ? "מחיר" : "Price"}</span>
                          <span className="text-white">₪{orderDetails.price}</span>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <span className="text-gray-400">{isRTL ? "מע״מ (כלול)" : "VAT (included)"}</span>
                          <span className="text-white">₪{Math.round(orderDetails.price * 0.17)}</span>
                        </div>
                        <div className="mt-4 flex justify-between border-t border-gray-800 pt-4">
                          <span className="text-lg font-medium text-white">{isRTL ? "סה״כ" : "Total"}</span>
                          <span className="text-lg font-medium text-white">₪{orderDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
