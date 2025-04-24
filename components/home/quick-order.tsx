"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  "id-report": 129,
}

export function QuickOrder() {
  const router = useRouter()
  const { isRTL } = useLanguage()
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const [activeTab, setActiveTab] = useState<"property" | "address" | "id">("property")
  const [serviceType, setServiceType] = useState<
    "regular" | "historical" | "concentrated" | "by-address" | "id-report"
  >("regular")
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    block: "",
    parcel: "",
    subParcel: "",
    street: "",
    city: "",
    houseNumber: "",
    idNumber: "",
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
    } else if (activeTab === "id") {
      if (!formData.idNumber) {
        newErrors.idNumber = isRTL ? "נא להזין מספר תעודת זהות" : "Please enter ID number"
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
      // מיפוי סוג השירות לסוג המסמך המתאים
      let documentType = serviceType

      // אם נבחר חיפוש לפי כתובת, נשתמש בסוג המסמך המתאים
      if (activeTab === "address") {
        documentType = "by-address"
      }

      // אם נבחר חיפוש לפי ת.ז, נשתמש בסוג המסמך המתאים
      if (activeTab === "id") {
        documentType = "id-report"
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
        idNumber: formData.idNumber,
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

  const getServiceName = (type: string) => {
    if (isRTL) {
      switch (type) {
        case "regular":
          return "נסח רגיל"
        case "historical":
          return "נסח היסטורי"
        case "concentrated":
          return "נסח מרוכז"
        case "by-address":
          return "נסח לפי כתובת"
        case "id-report":
          return "דו״ח לפי ת.ז"
        default:
          return "נסח רגיל"
      }
    } else {
      switch (type) {
        case "regular":
          return "Regular Extract"
        case "historical":
          return "Historical Extract"
        case "concentrated":
          return "Concentrated Extract"
        case "by-address":
          return "Extract by Address"
        case "id-report":
          return "ID Report"
        default:
          return "Regular Extract"
      }
    }
  }

  // חישוב המחיר הנוכחי לפי סוג השירות
  const currentPrice = PRICES[activeTab === "address" ? "by-address" : activeTab === "id" ? "id-report" : serviceType]

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 shadow-xl">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>

      <CardHeader className="border-b border-gray-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <CardTitle className="text-sm text-gray-400">{isRTL ? "הזמנה מהירה" : "Quick Order"}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-5">
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={serviceType === "regular" ? "default" : "outline"}
            onClick={() => setServiceType("regular")}
            className="flex-1"
          >
            {isRTL ? "נסח רגיל" : "Regular"}
          </Button>
          <Button
            size="sm"
            variant={serviceType === "historical" ? "default" : "outline"}
            onClick={() => setServiceType("historical")}
            className="flex-1"
          >
            {isRTL ? "היסטורי" : "Historical"}
          </Button>
          <Button
            size="sm"
            variant={serviceType === "concentrated" ? "default" : "outline"}
            onClick={() => setServiceType("concentrated")}
            className="flex-1"
          >
            {isRTL ? "מרוכז" : "Concentrated"}
          </Button>
        </div>

        <Tabs defaultValue="property" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="property">{isRTL ? "גוש וחלקה" : "Block & Parcel"}</TabsTrigger>
            <TabsTrigger value="address">{isRTL ? "לפי כתובת" : "By Address"}</TabsTrigger>
            <TabsTrigger value="id">{isRTL ? "לפי ת.ז" : "By ID"}</TabsTrigger>
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
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder={isRTL ? "לדוגמה: רוטשילד" : "e.g., Rothschild"}
                label={isRTL ? "רחוב" : "Street"}
                error={errors.street}
                className={isRTL ? "text-right" : "text-left"}
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder={isRTL ? "לדוגמה: תל אביב" : "e.g., Tel Aviv"}
                label={isRTL ? "עיר" : "City"}
                error={errors.city}
                className={isRTL ? "text-right" : "text-left"}
                dir={isRTL ? "rtl" : "ltr"}
              />
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

          <TabsContent value="id" className="space-y-3 mt-0">
            <div>
              <Input
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                placeholder={isRTL ? "הזן מספר תעודת זהות" : "Enter ID number"}
                label={isRTL ? "מספר תעודת זהות" : "ID Number"}
                error={errors.idNumber}
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

      <CardFooter className="border-t border-gray-800 p-4">
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600"
          rightIcon={<ArrowIcon className="h-4 w-4" />}
          isLoading={isLoading}
          loadingText={isRTL ? "מעבד..." : "Processing..."}
        >
          {isRTL ? "הזמן עכשיו" : "Order Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}
