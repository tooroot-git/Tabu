"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Autocomplete } from "@/components/ui/autocomplete"
import { useLocationSearch } from "@/hooks/use-location-search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Info } from "lucide-react"
import { getPaymentLinkWithOrderDetails } from "@/lib/stripe-links"

// מחירון קבוע לפי סוג שירות
const PRICES = {
  regular: 69,
  historical: 89,
  concentrated: 79,
  "by-address": 99,
}

const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`

export function QuickOrder() {
  const router = useRouter()
  const { isRTL } = useLanguage()
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const [activeTab, setActiveTab] = useState<"property" | "address">("property")
  const [serviceType, setServiceType] = useState<"regular" | "historical" | "concentrated">("regular")
  const [isLoading, setIsLoading] = useState(false)

  const { cities, streets, loadingCities, loadingStreets, searchCities, searchStreets, selectedCity, setSelectedCity } =
    useLocationSearch()

  const [formData, setFormData] = useState({
    block: "",
    parcel: "",
    subParcel: "",
    street: "",
    city: "",
    houseNumber: "",
    email: "",
    name: "",
  })

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

    if (activeTab === "property") {
      if (!formData.block) {
        newErrors.block = isRTL ? "נא להזין מספר גוש" : "Please enter block number"
      }
      if (!formData.parcel) {
        newErrors.parcel = isRTL ? "נא להזין מספר חלקה" : "Please enter parcel number"
      }
    } else if (activeTab === "address") {
      if (!formData.street) {
        newErrors.street = isRTL ? "נא להזין רחוב" : "Please enter street"
      }
      if (!formData.city) {
        newErrors.city = isRTL ? "נא להזין עיר" : "Please enter city"
      }
      if (!formData.houseNumber) {
        newErrors.houseNumber = isRTL ? "נא להזין מספר בית" : "Please enter house number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // קביעת סוג השירות בהתאם לטאב הפעיל
      let documentType = serviceType

      // אם נבחר חיפוש לפי כתובת
      if (activeTab === "address") {
        documentType = "by-address"
      }

      // שמירת פרטי ההזמנה ב-sessionStorage
      const orderDetails = {
        documentType,
        price: PRICES[documentType],
        ...formData,
      }

      sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails))

      // יצירת קישור תשלום ישיר עם הפרטים
      const paymentLink = getPaymentLinkWithOrderDetails(documentType, {
        block: formData.block,
        parcel: formData.parcel,
        subParcel: formData.subParcel,
        address: activeTab === "address" ? `${formData.street} ${formData.houseNumber}, ${formData.city}` : "",
        email: formData.email || "guest@tabuisrael.co.il",
        name: formData.name || "אורח",
      })

      // מעבר ישיר לדף התשלום
      window.location.href = paymentLink
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  // חישוב המחיר הנוכחי לפי סוג השירות והטאב הפעיל
  const currentPrice = activeTab === "address" ? PRICES["by-address"] : PRICES[serviceType]

  return (
    <>
      <style jsx global>
        {animationStyles}
      </style>
      <Card className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/95 shadow-xl w-full max-w-[450px] animate-fadeIn">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-base text-gray-300">{isRTL ? "הזמנה מהירה" : "Quick Order"}</CardTitle>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={serviceType === "regular" ? "default" : "outline"}
              onClick={() => setServiceType("regular")}
              className="flex-1 transition-all duration-200"
            >
              {isRTL ? "נסח רגיל" : "Regular"}
            </Button>
            <Button
              size="sm"
              variant={serviceType === "historical" ? "default" : "outline"}
              onClick={() => setServiceType("historical")}
              className="flex-1 transition-all duration-200"
            >
              {isRTL ? "היסטורי" : "Historical"}
            </Button>
            <Button
              size="sm"
              variant={serviceType === "concentrated" ? "default" : "outline"}
              onClick={() => setServiceType("concentrated")}
              className="flex-1 transition-all duration-200"
            >
              {isRTL ? "מרוכז" : "Concentrated"}
            </Button>
          </div>

          <Tabs defaultValue="property" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="property" className="transition-all duration-200">
                {isRTL ? "גוש וחלקה" : "Block & Parcel"}
              </TabsTrigger>
              <TabsTrigger value="address" className="transition-all duration-200">
                {isRTL ? "לפי כתובת" : "By Address"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="property" className="space-y-3 mt-0">
              <div>
                <Input
                  id="block"
                  name="block"
                  value={formData.block}
                  onChange={handleInputChange}
                  placeholder={isRTL ? "לדוגמה: 6941" : "e.g., 6941"}
                  label={isRTL ? "גוש" : "Block"}
                  error={errors.block}
                  className={isRTL ? "text-right" : "text-left"}
                  dir={isRTL ? "rtl" : "ltr"}
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
                  error={errors.parcel}
                  className={isRTL ? "text-right" : "text-left"}
                  dir={isRTL ? "rtl" : "ltr"}
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
                  className={isRTL ? "text-right" : "text-left"}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-3 mt-0">
              <div>
                <Autocomplete
                  options={cities}
                  value={formData.city}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, city: value }))
                    setSelectedCity(value)
                    // Clear street when city changes
                    setFormData((prev) => ({ ...prev, street: "" }))
                    if (errors.city) {
                      setErrors((prev) => {
                        const newErrors = { ...prev }
                        delete newErrors.city
                        return newErrors
                      })
                    }
                  }}
                  onSearch={searchCities}
                  placeholder={isRTL ? "הקלד לפחות 2 תווים לחיפוש" : "Type at least 2 characters to search"}
                  emptyMessage={
                    isRTL
                      ? cities.length === 0 && formData.city.length < 2
                        ? "הקלד לפחות 2 תווים לחיפוש"
                        : "לא נמצאו תוצאות"
                      : cities.length === 0 && formData.city.length < 2
                        ? "Type at least 2 characters to search"
                        : "No results found"
                  }
                  label={isRTL ? "עיר" : "City"}
                  error={errors.city}
                  isLoading={loadingCities}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <div>
                <Autocomplete
                  options={streets}
                  value={formData.street}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, street: value }))
                    if (errors.street) {
                      setErrors((prev) => {
                        const newErrors = { ...prev }
                        delete newErrors.street
                        return newErrors
                      })
                    }
                  }}
                  onSearch={searchStreets}
                  placeholder={
                    !formData.city
                      ? isRTL
                        ? "יש לבחור עיר תחילה"
                        : "Please select a city first"
                      : isRTL
                        ? "הקלד לפחות 2 תווים לחיפוש"
                        : "Type at least 2 characters to search"
                  }
                  emptyMessage={
                    !formData.city
                      ? isRTL
                        ? "יש לבחור עיר תחילה"
                        : "Please select a city first"
                      : streets.length === 0 && formData.street.length < 2
                        ? isRTL
                          ? "הקלד לפחות 2 תווים לחיפוש"
                          : "Type at least 2 characters to search"
                        : isRTL
                          ? "לא נמצאו תוצאות"
                          : "No results found"
                  }
                  label={isRTL ? "רחוב" : "Street"}
                  error={errors.street}
                  isLoading={loadingStreets}
                  dir={isRTL ? "rtl" : "ltr"}
                  className="mt-3"
                />
              </div>
              <div>
                <Input
                  id="houseNumber"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleInputChange}
                  placeholder={isRTL ? "לדוגמה: 123" : "e.g., 123"}
                  label={isRTL ? "מספר בית" : "House #"}
                  error={errors.houseNumber}
                  className={isRTL ? "text-right" : "text-left"}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* תצוגת מחיר */}
          <div className="mt-4 text-center">
            <div className="text-lg font-bold text-primary-400">
              {isRTL ? `מחיר: ₪${currentPrice}` : `Price: ₪${currentPrice}`}
            </div>
          </div>

          <div className="mt-4 rounded-md bg-blue-900/20 p-3 border border-blue-800/30">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-blue-300">
                {isRTL
                  ? "ניתן להזמין ללא הרשמה. להצגת היסטוריית הזמנות, מומלץ להירשם."
                  : "You can order without registration. To view order history, registration is recommended."}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-gray-800 p-4 pt-3 pb-3">
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-200"
            rightIcon={<ArrowIcon className="h-4 w-4" />}
            isLoading={isLoading}
            loadingText={isRTL ? "מעבד..." : "Processing..."}
          >
            {isRTL ? "הזמן עכשיו" : "Order Now"}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
