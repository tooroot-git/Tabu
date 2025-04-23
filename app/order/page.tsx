"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Stepper } from "@/components/ui/stepper"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/lib/auth0"

export default function OrderPage() {
  const router = useRouter()
  const { isRTL, t } = useLanguage()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    block: "",
    parcel: "",
    subParcel: "",
    address: "",
    idNumber: "",
    email: user?.email || "",
    name: user?.name || "",
  })

  const [formType, setFormType] = useState<"property" | "address" | "id">("property")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formType === "property") {
      if (!formData.block) {
        newErrors.block = isRTL ? "נא להזין מספר גוש" : "Please enter block number"
      }
      if (!formData.parcel) {
        newErrors.parcel = isRTL ? "נא להזין מספר חלקה" : "Please enter parcel number"
      }
    } else if (formType === "address") {
      if (!formData.address) {
        newErrors.address = isRTL ? "נא להזין כתובת" : "Please enter address"
      }
    } else if (formType === "id") {
      if (!formData.idNumber) {
        newErrors.idNumber = isRTL ? "נא להזין מספר תעודת זהות" : "Please enter ID number"
      }
    }

    if (!formData.email) {
      newErrors.email = isRTL ? "נא להזין כתובת אימייל" : "Please enter email address"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isRTL ? "נא להזין כתובת אימייל תקינה" : "Please enter a valid email address"
    }

    if (!formData.name) {
      newErrors.name = isRTL ? "נא להזין שם מלא" : "Please enter full name"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Build query parameters
    const params = new URLSearchParams()

    if (formType === "property") {
      params.append("block", formData.block)
      params.append("parcel", formData.parcel)
      if (formData.subParcel) {
        params.append("subParcel", formData.subParcel)
      }
    } else if (formType === "address") {
      params.append("address", formData.address)
    } else if (formType === "id") {
      params.append("idNumber", formData.idNumber)
    }

    params.append("email", formData.email)
    params.append("name", formData.name)

    // Navigate to document selection page with form data
    router.push(`/document-selection?${params.toString()}`)
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <Stepper
          steps={[
            { label: isRTL ? "פרטי נכס" : "Property Details", completed: false },
            { label: isRTL ? "בחירת מסמך" : "Document Selection", completed: false },
            { label: isRTL ? "תשלום" : "Payment", completed: false },
          ]}
          currentStep={0}
        />

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? "הזן את פרטי הנכס" : "Enter Property Details"}</CardTitle>
              <CardDescription>
                {isRTL
                  ? "אנא הזן את פרטי הנכס עבורו תרצה לקבל נסח טאבו"
                  : "Please enter the property details for which you want to receive a land registry extract"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button
                    variant={formType === "property" ? "default" : "outline"}
                    onClick={() => setFormType("property")}
                  >
                    {isRTL ? "לפי גוש וחלקה" : "By Block & Parcel"}
                  </Button>
                  <Button
                    variant={formType === "address" ? "default" : "outline"}
                    onClick={() => setFormType("address")}
                  >
                    {isRTL ? "לפי כתובת" : "By Address"}
                  </Button>
                  <Button variant={formType === "id" ? "default" : "outline"} onClick={() => setFormType("id")}>
                    {isRTL ? "לפי תעודת זהות" : "By ID Number"}
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {formType === "property" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="block" className="block text-sm font-medium mb-1">
                          {isRTL ? "גוש" : "Block"} *
                        </label>
                        <TooltipProvider>
                          <Tooltip
                            content={
                              isRTL
                                ? "מספר הגוש כפי שמופיע במסמכי הנכס"
                                : "Block number as appears in property documents"
                            }
                          >
                            <Input
                              id="block"
                              name="block"
                              value={formData.block}
                              onChange={handleInputChange}
                              placeholder={isRTL ? "לדוגמה: 6941" : "e.g., 6941"}
                              className={errors.block ? "border-red-500" : ""}
                            />
                          </Tooltip>
                        </TooltipProvider>
                        {errors.block && <p className="text-red-500 text-sm mt-1">{errors.block}</p>}
                      </div>
                      <div>
                        <label htmlFor="parcel" className="block text-sm font-medium mb-1">
                          {isRTL ? "חלקה" : "Parcel"} *
                        </label>
                        <TooltipProvider>
                          <Tooltip
                            content={
                              isRTL
                                ? "מספר החלקה כפי שמופיע במסמכי הנכס"
                                : "Parcel number as appears in property documents"
                            }
                          >
                            <Input
                              id="parcel"
                              name="parcel"
                              value={formData.parcel}
                              onChange={handleInputChange}
                              placeholder={isRTL ? "לדוגמה: 128" : "e.g., 128"}
                              className={errors.parcel ? "border-red-500" : ""}
                            />
                          </Tooltip>
                        </TooltipProvider>
                        {errors.parcel && <p className="text-red-500 text-sm mt-1">{errors.parcel}</p>}
                      </div>
                      <div>
                        <label htmlFor="subParcel" className="block text-sm font-medium mb-1">
                          {isRTL ? "תת-חלקה" : "Sub-Parcel"}
                        </label>
                        <TooltipProvider>
                          <Tooltip content={isRTL ? "מספר תת-החלקה (אופציונלי)" : "Sub-parcel number (optional)"}>
                            <Input
                              id="subParcel"
                              name="subParcel"
                              value={formData.subParcel}
                              onChange={handleInputChange}
                              placeholder={isRTL ? "לדוגמה: 2" : "e.g., 2"}
                            />
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  )}

                  {formType === "address" && (
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        {isRTL ? "כתובת מלאה" : "Full Address"} *
                      </label>
                      <TooltipProvider>
                        <Tooltip
                          content={
                            isRTL
                              ? "הזן כתובת מלאה כולל רחוב, מספר, עיר ומיקוד"
                              : "Enter full address including street, number, city and postal code"
                          }
                        >
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder={isRTL ? "לדוגמה: רוטשילד 123, תל אביב" : "e.g., 123 Rothschild Blvd, Tel Aviv"}
                            className={errors.address ? "border-red-500" : ""}
                          />
                        </Tooltip>
                      </TooltipProvider>
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                  )}

                  {formType === "id" && (
                    <div>
                      <label htmlFor="idNumber" className="block text-sm font-medium mb-1">
                        {isRTL ? "מספר תעודת זהות" : "ID Number"} *
                      </label>
                      <TooltipProvider>
                        <Tooltip
                          content={
                            isRTL ? "הזן מספר תעודת זהות ישראלית (9 ספרות)" : "Enter Israeli ID number (9 digits)"
                          }
                        >
                          <Input
                            id="idNumber"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            placeholder={isRTL ? "לדוגמה: 123456789" : "e.g., 123456789"}
                            className={errors.idNumber ? "border-red-500" : ""}
                          />
                        </Tooltip>
                      </TooltipProvider>
                      {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        {isRTL ? "אימייל" : "Email"} *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={isRTL ? "your@email.com" : "your@email.com"}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        {isRTL ? "שם מלא" : "Full Name"} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={isRTL ? "ישראל ישראלי" : "John Doe"}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                  </div>
                </form>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSubmit}>{isRTL ? "המשך לבחירת מסמך" : "Continue to Document Selection"}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
