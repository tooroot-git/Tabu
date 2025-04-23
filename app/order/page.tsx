"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Stepper } from "@/components/ui/stepper"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/components/auth/auth-provider"
import { MetaTags } from "@/components/seo/meta-tags"
import { StructuredData } from "@/components/seo/structured-data"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function OrderPage() {
  const router = useRouter()
  const { isRTL } = useLanguage()
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
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
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const title = isRTL
    ? "הזמנת נסח טאבו לפי גוש וחלקה | טאבוי ישראל"
    : "Order Land Registry Extract by Block and Parcel | TabuIsrael"

  const description = isRTL
    ? "טופס מקוון להזמנת נסח טאבו ממאגר רשות מקרקעין – מהיר, מאובטח, בעברית מלאה."
    : "Online form for ordering land registry extracts from the Israel Land Authority database - fast, secure, in Hebrew and English."

  return (
    <>
      <MetaTags title={title} description={description} />
      <StructuredData type="Service" />

      <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
        <Header />

        <main className="py-24">
          <div className="container mx-auto px-4">
            <Stepper
              steps={[
                { label: isRTL ? "פרטי נכס" : "Property Details", completed: false },
                { label: isRTL ? "בחירת מסמך" : "Document Selection", completed: false },
                { label: isRTL ? "תשלום" : "Payment", completed: false },
              ]}
              currentStep={0}
            />

            <div className="mt-8 max-w-3xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader className="border-b border-gray-100 pb-6">
                  <CardTitle className="text-2xl">{isRTL ? "הזן את פרטי הנכס" : "Enter Property Details"}</CardTitle>
                  <CardDescription className="mt-2">
                    {isRTL
                      ? "אנא הזן את פרטי הנכס עבורו תרצה לקבל נסח טאבו"
                      : "Please enter the property details for which you want to receive a land registry extract"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
                      <Button
                        variant={formType === "property" ? "default" : "outline"}
                        onClick={() => setFormType("property")}
                        className="min-w-[140px]"
                      >
                        {isRTL ? "לפי גוש וחלקה" : "By Block & Parcel"}
                      </Button>
                      <Button
                        variant={formType === "address" ? "default" : "outline"}
                        onClick={() => setFormType("address")}
                        className="min-w-[140px]"
                      >
                        {isRTL ? "לפי כתובת" : "By Address"}
                      </Button>
                      <Button
                        variant={formType === "id" ? "default" : "outline"}
                        onClick={() => setFormType("id")}
                        className="min-w-[140px]"
                      >
                        {isRTL ? "לפי תעודת זהות" : "By ID Number"}
                      </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {formType === "property" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <Input
                              id="block"
                              name="block"
                              value={formData.block}
                              onChange={handleInputChange}
                              placeholder={isRTL ? "לדוגמה: 6941" : "e.g., 6941"}
                              label={isRTL ? "גוש" : "Block"}
                              required
                              error={errors.block}
                              aria-required="true"
                            />
                          </div>
                          <div>
                            <Input
                              id="parcel"
                              name="parcel"
                              value={formData.parcel}
                              onChange={handleInputChange}
                              placeholder={isRTL ? "לדוגמה: 128" : "e.g., 128"}
                              label={isRTL ? "חלקה" : "Parcel"}
                              required
                              error={errors.parcel}
                              aria-required="true"
                            />
                          </div>
                          <div>
                            <Input
                              id="subParcel"
                              name="subParcel"
                              value={formData.subParcel}
                              onChange={handleInputChange}
                              placeholder={isRTL ? "לדוגמה: 2" : "e.g., 2"}
                              label={isRTL ? "תת-חלקה" : "Sub-Parcel"}
                              helperText={isRTL ? "(אופציונלי)" : "(optional)"}
                            />
                          </div>
                        </div>
                      )}

                      {formType === "address" && (
                        <div>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder={isRTL ? "לדוגמה: רוטשילד 123, תל אביב" : "e.g., 123 Rothschild Blvd, Tel Aviv"}
                            label={isRTL ? "כתובת מלאה" : "Full Address"}
                            required
                            error={errors.address}
                            aria-required="true"
                          />
                        </div>
                      )}

                      {formType === "id" && (
                        <div>
                          <Input
                            id="idNumber"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            placeholder={isRTL ? "לדוגמה: 123456789" : "e.g., 123456789"}
                            label={isRTL ? "מספר תעודת זהות" : "ID Number"}
                            required
                            error={errors.idNumber}
                            aria-required="true"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                        <div>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            label={isRTL ? "אימייל" : "Email"}
                            required
                            error={errors.email}
                            aria-required="true"
                          />
                        </div>
                        <div>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={isRTL ? "ישראל ישראלי" : "John Doe"}
                            label={isRTL ? "שם מלא" : "Full Name"}
                            required
                            error={errors.name}
                            aria-required="true"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-gray-100 pt-6">
                  <Button onClick={handleSubmit} size="lg" isLoading={isSubmitting} className="min-w-[200px]">
                    {isRTL ? "המשך לבחירת מסמך" : "Continue to Document Selection"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
