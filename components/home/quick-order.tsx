"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
}

// Mock data for cities and streets
const CITIES = [
  "Tel Aviv",
  "Jerusalem",
  "Haifa",
  "Rishon Lezion",
  "Petah Tikva",
  "Ashdod",
  "Netanya",
  "Beer Sheva",
  "Holon",
  "Bnei Brak",
]

const STREETS = {
  "Tel Aviv": ["Allenby", "Dizengoff", "Rothschild", "Ben Yehuda", "King George", "Bograshov", "Shenkin"],
  Jerusalem: ["Jaffa", "Ben Yehuda", "King George", "Emek Refaim", "Derech Hebron", "Agrippas", "Bezalel"],
  Haifa: ["Herzl", "Hativat Givati", "Sderot Ben Gurion", "Moriah", "Carmel Center", "Hagefen", "Masada"],
  "Rishon Lezion": ["Jabotinsky", "Herzl", "Rothschild", "Sokolov", "Weizmann", "Moshe Dayan", "Golda Meir"],
  "Petah Tikva": ["Haim Ozer", "Herzl", "Jabotinsky", "Weizmann", "Hahistadrut", "Pinsker", "Ahad Ha'am"],
  Ashdod: ["Herzl", "Rogozin", "Habanim", "Moshe Dayan", "Menachem Begin", "Yitzhak Rabin", "Golda Meir"],
  Netanya: ["Herzl", "Weizmann", "Sderot Ben Gurion", "Shmuel Hanatziv", "Harav Kook", "Bialik", "Sokolov"],
  "Beer Sheva": ["Rager", "Herzl", "Yitzhak Rager", "Derech Metsada", "Ringelblum", "Yad Vashem", "Wingate"],
  Holon: ["Sokolov", "Weizmann", "Herzl", "Eilat", "Hahistadrut", "Shenkar", "Kugel"],
  "Bnei Brak": ["Rabbi Akiva", "Jabotinsky", "Hazon Ish", "Rashi", "Ezra", "Hashomer", "Kahaneman"],
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

  const [activeTab, setActiveTab] = useState<"property" | "address">("address") // Changed default to address
  const [serviceType, setServiceType] = useState<"regular" | "historical" | "concentrated">("regular")
  const [isLoading, setIsLoading] = useState(false)

  // State for autocomplete
  const [cityInput, setCityInput] = useState("")
  const [streetInput, setStreetInput] = useState("")
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [filteredStreets, setFilteredStreets] = useState<string[]>([])
  const [showCitySuggestions, setShowCitySuggestions] = useState(false)
  const [showStreetSuggestions, setShowStreetSuggestions] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")

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

  // Filter cities based on input
  useEffect(() => {
    if (cityInput.length >= 2) {
      const filtered = CITIES.filter((city) => city.toLowerCase().includes(cityInput.toLowerCase()))
      setFilteredCities(filtered)
    } else {
      setFilteredCities([])
    }
  }, [cityInput])

  // Filter streets based on selected city and input
  useEffect(() => {
    if (selectedCity && streetInput.length >= 2) {
      const cityStreets = STREETS[selectedCity as keyof typeof STREETS] || []
      const filtered = cityStreets.filter((street) => street.toLowerCase().includes(streetInput.toLowerCase()))
      setFilteredStreets(filtered)
    } else {
      setFilteredStreets([])
    }
  }, [streetInput, selectedCity])

  // Update form data when city or street is selected
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
    }))
  }, [selectedCity])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      street: streetInput,
    }))
  }, [streetInput])

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

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCityInput(value)
    setShowCitySuggestions(value.length >= 2)

    // Clear street when city changes
    if (value !== selectedCity) {
      setStreetInput("")
      setFilteredStreets([])
      setSelectedCity("")
    }

    // Clear error when user types
    if (errors.city) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.city
        return newErrors
      })
    }
  }

  const handleStreetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setStreetInput(value)
    setShowStreetSuggestions(value.length >= 2 && selectedCity !== "")

    // Clear error when user types
    if (errors.street) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.street
        return newErrors
      })
    }
  }

  const handleCitySelect = (city: string) => {
    setCityInput(city)
    setSelectedCity(city)
    setShowCitySuggestions(false)
  }

  const handleStreetSelect = (street: string) => {
    setStreetInput(street)
    setFormData((prev) => ({ ...prev, street }))
    setShowStreetSuggestions(false)
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
      if (!selectedCity) {
        newErrors.city = isRTL ? "נא להזין עיר" : "Please enter city"
      }
      if (!streetInput) {
        newErrors.street = isRTL ? "נא להזין רחוב" : "Please enter street"
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
        block: formData.block,
        parcel: formData.parcel,
        subParcel: formData.subParcel,
        street: streetInput,
        city: selectedCity,
        houseNumber: formData.houseNumber,
        inputType: activeTab === "property" ? "block_parcel" : "address",
        email: formData.email || "guest@tabuisrael.co.il",
        name: formData.name || "אורח",
      }

      sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails))

      // יצירת קישור תשלום ישיר עם הפרטים
      const paymentLink = getPaymentLinkWithOrderDetails(documentType, {
        block: formData.block,
        parcel: formData.parcel,
        subParcel: formData.subParcel,
        address: activeTab === "address" ? `${streetInput} ${formData.houseNumber}, ${selectedCity}` : "",
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

          <Tabs defaultValue="address" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="address" className="transition-all duration-200">
                {isRTL ? "לפי כתובת" : "By Address"}
              </TabsTrigger>
              <TabsTrigger value="property" className="transition-all duration-200">
                {isRTL ? "גוש וחלקה" : "Block & Parcel"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="address" className="space-y-3 mt-0">
              {/* City Autocomplete */}
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-gray-300">{isRTL ? "עיר" : "City"}</label>
                <input
                  type="text"
                  value={cityInput}
                  onChange={handleCityInputChange}
                  placeholder={isRTL ? "הקלד לפחות 2 תווים לחיפוש" : "Type at least 2 characters to search"}
                  className={`w-full h-10 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.city ? "border-red-500" : ""
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}

                {/* City Suggestions */}
                {showCitySuggestions && filteredCities.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredCities.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white"
                        onClick={() => handleCitySelect(city)}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Street Autocomplete */}
              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-gray-300">{isRTL ? "רחוב" : "Street"}</label>
                <input
                  type="text"
                  value={streetInput}
                  onChange={handleStreetInputChange}
                  placeholder={
                    !selectedCity
                      ? isRTL
                        ? "יש לבחור עיר תחילה"
                        : "Please select a city first"
                      : isRTL
                        ? "הקלד לפחות 2 תווים לחיפוש"
                        : "Type at least 2 characters to search"
                  }
                  className={`w-full h-10 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.street ? "border-red-500" : ""
                  }`}
                  disabled={!selectedCity}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                {errors.street && <p className="mt-1 text-xs text-red-500">{errors.street}</p>}

                {/* Street Suggestions */}
                {showStreetSuggestions && filteredStreets.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredStreets.map((street) => (
                      <div
                        key={street}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white"
                        onClick={() => handleStreetSelect(street)}
                      >
                        {street}
                      </div>
                    ))}
                  </div>
                )}
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
