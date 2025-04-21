"use client"

import type React from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { AlertInfo } from "@/components/ui/alert"
import { CreditCard, Lock, Calendar, CreditCardIcon } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function PaymentPage() {
  const { language, isRTL } = useLanguage()
  const searchParams = useSearchParams()

  const block = searchParams.get("block") || ""
  const parcel = searchParams.get("parcel") || ""
  const subparcel = searchParams.get("subparcel") || ""
  const service = searchParams.get("service") || "regular"

  const [formData, setFormData] = useState({
    email: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
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
          priceEn: "₪39",
          priceHe: "₪39",
        }
      case "concentrated":
        return {
          titleEn: "Concentrated Extract",
          titleHe: "נסח מרוכז",
          priceEn: "₪59",
          priceHe: "₪59",
        }
      case "historical":
        return {
          titleEn: "Historical Extract",
          titleHe: "נסח היסטורי",
          priceEn: "₪69",
          priceHe: "₪69",
        }
      case "by-address":
        return {
          titleEn: "Extract by Address",
          titleHe: "נסח לפי כתובת",
          priceEn: "₪79",
          priceHe: "₪79",
        }
      case "property-report":
        return {
          titleEn: "Property Report by ID",
          titleHe: "דוח נכסים לפי ת.ז",
          priceEn: "₪99",
          priceHe: "₪99",
        }
      default:
        return {
          titleEn: "Regular Extract",
          titleHe: "נסח רגיל",
          priceEn: "₪39",
          priceHe: "₪39",
        }
    }
  }

  const serviceDetails = getServiceDetails()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/confirmation?block=${block}&parcel=${parcel}&subparcel=${subparcel}&service=${service}`
  }

  const handleBack = () => {
    window.location.href = `/document-selection?block=${block}&parcel=${parcel}&subparcel=${subparcel}&service=${service}`
  }

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Stepper steps={steps} currentStep={2} className="mb-8" />

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? "פרטי תשלום" : "Payment Details"}</CardTitle>
                  <CardDescription>
                    {isRTL ? "השלם את התשלום באופן מאובטח" : "Complete your payment securely"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <CreditCardIcon className="h-6 w-6 text-gray-400" />
                      <span className="font-medium">{isRTL ? "כרטיס אשראי" : "Credit Card"}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <img src="/placeholder.svg?height=20&width=30" alt="Visa" className="h-5" />
                      <img src="/placeholder.svg?height=20&width=30" alt="Mastercard" className="h-5" />
                      <img src="/placeholder.svg?height=20&width=30" alt="American Express" className="h-5" />
                    </div>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        {isRTL ? "אימייל" : "Email"}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={isRTL ? "הזן את כתובת האימייל שלך" : "Enter your email address"}
                        className="mt-1"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                        {isRTL ? "שם בעל הכרטיס" : "Cardholder Name"}
                      </label>
                      <Input
                        id="cardName"
                        type="text"
                        placeholder={isRTL ? "הזן את השם כפי שמופיע על הכרטיס" : "Enter name as it appears on card"}
                        className="mt-1"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        {isRTL ? "מספר כרטיס" : "Card Number"}
                      </label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        icon={<CreditCard className="h-4 w-4 text-gray-400" />}
                        className="mt-1"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                          {isRTL ? "תוקף" : "Expiry Date"}
                        </label>
                        <Input
                          id="expiry"
                          type="text"
                          placeholder="MM / YY"
                          icon={<Calendar className="h-4 w-4 text-gray-400" />}
                          className="mt-1"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                          {isRTL ? "קוד אבטחה" : "Security Code"}
                        </label>
                        <Input
                          id="cvc"
                          type="text"
                          placeholder="CVC"
                          className="mt-1"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <AlertInfo
                      icon={<Lock className="h-4 w-4" />}
                      description={
                        isRTL
                          ? "כל המידע שלך מוצפן ומאובטח. לעולם איננו שומרים את פרטי כרטיס האשראי שלך."
                          : "All your information is encrypted and secure. We never store your credit card details."
                      }
                    />

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={handleBack}>
                        {isRTL ? "חזור" : "Back"}
                      </Button>
                      <Button type="submit">
                        {isRTL
                          ? `שלם ${isRTL ? serviceDetails.priceHe : serviceDetails.priceEn}`
                          : `Pay ${isRTL ? serviceDetails.priceHe : serviceDetails.priceEn}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? "סיכום הזמנה" : "Order Summary"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{isRTL ? "סוג מסמך" : "Document Type"}</span>
                      <span className="font-medium">{isRTL ? serviceDetails.titleHe : serviceDetails.titleEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{isRTL ? "גוש" : "Block"}</span>
                      <span className="font-medium">{block}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{isRTL ? "חלקה" : "Parcel"}</span>
                      <span className="font-medium">{parcel}</span>
                    </div>
                    {subparcel && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{isRTL ? "תת-חלקה" : "Sub-parcel"}</span>
                        <span className="font-medium">{subparcel}</span>
                      </div>
                    )}
                    <div className="border-t my-4"></div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{isRTL ? "סה״כ" : "Total"}</span>
                      <span className="font-bold">{isRTL ? serviceDetails.priceHe : serviceDetails.priceEn}</span>
                    </div>
                    <div className="text-xs text-gray-500">{isRTL ? "כולל מע״מ" : "Including VAT"}</div>
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
