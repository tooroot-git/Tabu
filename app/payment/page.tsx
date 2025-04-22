"use client"

import type React from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { CreditCardIcon, LockIcon, ShieldCheckIcon } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { StripeProvider } from "@/components/stripe/stripe-provider"
import { PaymentForm } from "@/components/stripe/payment-form"

export default function PaymentPage() {
  const { language, isRTL } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()

  const block = searchParams.get("block") || ""
  const parcel = searchParams.get("parcel") || ""
  const subparcel = searchParams.get("subparcel") || ""
  const street = searchParams.get("street") || ""
  const houseNumber = searchParams.get("houseNumber") || ""
  const city = searchParams.get("city") || ""
  const inputType = searchParams.get("inputType") || "blockParcel"
  const service = searchParams.get("service") || "regular"

  const [formData, setFormData] = useState({
    email: "",
    name: "",
  })

  const steps = [
    {
      title: isRTL ? "פרטי נכס" : "Property Details",
      description: isRTL ? "הזן את פרטי הנכס" : "Enter property information",
      status: "completed" as const,
    },
    {
      title: isRTL ? "בחירת מסמך" : "Document Selection",
      description: isRTL ? "בחר את סוג המסמך" : "Choose document type",
      status: "completed" as const,
    },
    {
      title: isRTL ? "תשלום" : "Payment",
      description: isRTL ? "השלם את התשלום" : "Complete payment",
      status: "current" as const,
    },
  ]

  const getServiceDetails = () => {
    switch (service) {
      case "regular":
        return {
          titleEn: "Regular Extract",
          titleHe: "נסח רגיל",
          priceEn: "39",
          priceHe: "39",
        }
      case "concentrated":
        return {
          titleEn: "Concentrated Extract",
          titleHe: "נסח מרוכז",
          priceEn: "59",
          priceHe: "59",
        }
      case "historical":
        return {
          titleEn: "Historical Extract",
          titleHe: "נסח היסטורי",
          priceEn: "69",
          priceHe: "69",
        }
      case "by-address":
        return {
          titleEn: "Extract by Address",
          titleHe: "נסח לפי כתובת",
          priceEn: "79",
          priceHe: "79",
        }
      case "property-report":
        return {
          titleEn: "Property Report by ID",
          titleHe: "דוח נכסים לפי ת.ז",
          priceEn: "99",
          priceHe: "99",
        }
      default:
        return {
          titleEn: "Regular Extract",
          titleHe: "נסח רגיל",
          priceEn: "39",
          priceHe: "39",
        }
    }
  }

  const serviceDetails = getServiceDetails()
  const amount = Number.parseInt(isRTL ? serviceDetails.priceHe : serviceDetails.priceEn)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Prepare order details for database
  const orderDetails = {
    serviceDetails,
    input_type: inputType,
    block: inputType === "blockParcel" ? block : null,
    parcel: inputType === "blockParcel" ? parcel : null,
    subparcel: inputType === "blockParcel" ? subparcel : null,
    street: inputType === "address" ? street : null,
    house_number: inputType === "address" ? houseNumber : null,
    city: inputType === "address" ? city : null,
    service_type: service,
    email: formData.email,
    name: formData.name,
  }

  const handlePaymentSuccess = (paymentIntent: any) => {
    // Navigate to confirmation page with all the necessary parameters
    const params = new URLSearchParams()

    if (inputType === "address") {
      params.append("street", street)
      params.append("houseNumber", houseNumber)
      params.append("city", city)
      params.append("inputType", "address")
    } else {
      params.append("block", block)
      params.append("parcel", parcel)
      if (subparcel) params.append("subparcel", subparcel)
      params.append("inputType", "blockParcel")
    }

    params.append("service", service)
    params.append("paymentId", paymentIntent.id)

    router.push(`/confirmation?${params.toString()}`)
  }

  const handlePaymentError = (error: Error) => {
    console.error("Payment error:", error)
    // Error is handled within the PaymentForm component
  }

  const handleBack = () => {
    if (inputType === "address") {
      router.push(
        `/document-selection?street=${encodeURIComponent(street)}&houseNumber=${encodeURIComponent(houseNumber)}&city=${encodeURIComponent(city)}&inputType=address&service=${service}`,
      )
    } else {
      router.push(
        `/document-selection?block=${block}&parcel=${parcel}&subparcel=${subparcel}&inputType=blockParcel&service=${service}`,
      )
    }
  }

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="relative py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-700/20 blur-[120px]"></div>
          <div className="absolute top-[20%] right-[5%] h-[400px] w-[700px] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Stepper steps={steps} currentStep={2} className="mb-12" />

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-800">
                    <CardTitle className="text-white flex items-center">
                      <CreditCardIcon className="mr-2 h-5 w-5 text-primary-500" />
                      {isRTL ? "פרטי תשלום" : "Payment Details"}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {isRTL ? "השלם את התשלום באופן מאובטח" : "Complete your payment securely"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-6">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10">
                          <CreditCardIcon className="h-5 w-5 text-primary-500" />
                        </div>
                        <span className="font-medium text-white">{isRTL ? "כרטיס אשראי" : "Credit Card"}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <img src="/stylized-payment-network.png" alt="Visa" className="h-8" />
                        <img src="/interlocking-circles.png" alt="Mastercard" className="h-8" />
                        <img src="/american-express-card.png" alt="American Express" className="h-8" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "אימייל" : "Email"}
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={isRTL ? "הזן את כתובת האימייל שלך" : "Enter your email address"}
                            className="mt-2 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "שם מלא" : "Full Name"}
                          </label>
                          <Input
                            id="name"
                            type="text"
                            placeholder={isRTL ? "הזן את שמך המלא" : "Enter your full name"}
                            className="mt-2 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-8 rounded-lg border border-gray-800 bg-gray-800/30 p-6">
                        <div className="mb-4 flex items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10 mr-3 rtl:ml-3 rtl:mr-0">
                            <LockIcon className="h-5 w-5 text-primary-500" />
                          </div>
                          <h3 className="text-lg font-medium text-white">
                            {isRTL ? "פרטי כרטיס אשראי" : "Credit Card Details"}
                          </h3>
                        </div>

                        <StripeProvider>
                          <PaymentForm
                            amount={amount}
                            description={`Tabu.net.il - ${isRTL ? serviceDetails.titleHe : serviceDetails.titleEn}`}
                            orderDetails={orderDetails}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                          />
                        </StripeProvider>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-gray-800 mt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                          className="border-gray-700 hover:bg-gray-800 text-white"
                        >
                          {isRTL ? "חזור" : "Back"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-24">
                  <CardHeader className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-800">
                    <CardTitle className="text-white flex items-center">
                      <ShieldCheckIcon className="mr-2 h-5 w-5 text-primary-500" />
                      {isRTL ? "סיכום הזמנה" : "Order Summary"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">{isRTL ? "סוג מסמך" : "Document Type"}</span>
                        <span className="font-medium text-white">
                          {isRTL ? serviceDetails.titleHe : serviceDetails.titleEn}
                        </span>
                      </div>

                      {inputType === "blockParcel" ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">{isRTL ? "גוש" : "Block"}</span>
                            <span className="font-medium text-white">{block}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">{isRTL ? "חלקה" : "Parcel"}</span>
                            <span className="font-medium text-white">{parcel}</span>
                          </div>
                          {subparcel && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-400">{isRTL ? "תת-חלקה" : "Sub-parcel"}</span>
                              <span className="font-medium text-white">{subparcel}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">{isRTL ? "רחוב" : "Street"}</span>
                            <span className="font-medium text-white">{street}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">{isRTL ? "מספר בית" : "House Number"}</span>
                            <span className="font-medium text-white">{houseNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-400">{isRTL ? "יישוב" : "City"}</span>
                            <span className="font-medium text-white">{city}</span>
                          </div>
                        </>
                      )}

                      <div className="border-t border-gray-800 my-4"></div>

                      <div className="flex justify-between items-center bg-primary-500/10 p-4 rounded-lg">
                        <span className="text-base font-medium text-white">{isRTL ? "סה״כ" : "Total"}</span>
                        <span className="text-xl font-bold text-primary-500">
                          ₪{isRTL ? serviceDetails.priceHe : serviceDetails.priceEn}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 text-center">{isRTL ? "כולל מע״מ" : "Including VAT"}</div>
                    </div>

                    <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
                      <LockIcon className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                      {isRTL ? "תשלום מאובטח ב-256 ביט SSL" : "Secured with 256-bit SSL"}
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
