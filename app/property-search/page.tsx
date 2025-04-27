"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, Info, Search, FileText, Check } from "lucide-react"
import Link from "next/link"

export default function PropertySearchPage() {
  const { isRTL } = useLanguage()
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const [isLoading, setIsLoading] = useState(false)
  const [idNumber, setIdNumber] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!idNumber) {
      setError(isRTL ? "נא להזין מספר תעודת זהות" : "Please enter ID number")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to results page
      window.location.href = `/property-search/results?id=${idNumber}`
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Search Form */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="sticky top-24">
              <Card className="bg-gray-900/95 border border-gray-800 shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="border-b border-gray-800 bg-gray-900/80">
                  <CardTitle className="text-xl text-white text-center">
                    {isRTL ? "איתור נכסים לפי ת.ז" : "Property Search by ID"}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-center">
                    {isRTL
                      ? "אתר את כל הנכסים הרשומים על שמך במרשם המקרקעין"
                      : "Locate all properties registered under your name in the Land Registry"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-white mb-3">
                      {isRTL ? "הזן את מספר תעודת הזהות שלך" : "Enter your ID number"}
                    </h3>
                    <div>
                      <Input
                        id="idNumber"
                        value={idNumber}
                        onChange={(e) => {
                          setIdNumber(e.target.value)
                          setError("")
                        }}
                        placeholder={isRTL ? "לדוגמה: 012345678" : "e.g., 012345678"}
                        label={isRTL ? "מספר תעודת זהות" : "ID Number"}
                        error={error}
                        className={isRTL ? "text-right" : "text-left"}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">{isRTL ? "סוג שירות:" : "Service type:"}</span>
                      <span className="text-white font-medium">
                        {isRTL ? "איתור נכסים לפי ת.ז" : "Property Search by ID"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{isRTL ? "מחיר:" : "Price:"}</span>
                      <span className="text-primary-400 font-bold text-xl">₪49</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-md bg-blue-900/20 p-3 border border-blue-800/30">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                      <p className="text-xs text-blue-300">
                        {isRTL
                          ? 'שירות זה מאפשר לך לאתר את כל הנכסים הרשומים על שמך במרשם המקרקעין. התוצאות יישלחו לדוא"ל שלך מיד לאחר התשלום.'
                          : "This service allows you to locate all properties registered under your name in the Land Registry. Results will be sent to your email immediately after payment."}
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-gray-800 p-4">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 py-6 text-lg"
                    rightIcon={<Search className="h-5 w-5" />}
                    isLoading={isLoading}
                    loadingText={isRTL ? "מחפש..." : "Searching..."}
                  >
                    {isRTL ? "חפש נכסים" : "Search Properties"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                <span className="block">{isRTL ? "איתור נכסים" : "Property Search"}</span>
                <span className="block text-primary-500 mt-2">{isRTL ? "לפי תעודת זהות" : "By ID Number"}</span>
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                {isRTL
                  ? "שירות מהיר ומאובטח המאפשר לך לאתר את כל הנכסים הרשומים על שמך במרשם המקרקעין. קבל רשימה מפורטת של כל הנכסים שבבעלותך."
                  : "A fast and secure service that allows you to locate all properties registered under your name in the Land Registry. Get a detailed list of all properties you own."}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
                  <div className="text-primary-500 mb-2">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium mb-1">{isRTL ? "מידע מקיף" : "Comprehensive Info"}</div>
                    <div className="text-gray-400 text-sm">
                      {isRTL ? "כל הנכסים שבבעלותך" : "All properties you own"}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
                  <div className="text-primary-500 mb-2">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium mb-1">{isRTL ? "מהיר ופשוט" : "Fast & Simple"}</div>
                    <div className="text-gray-400 text-sm">{isRTL ? "תוצאות תוך דקות" : "Results in minutes"}</div>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
                  <div className="text-primary-500 mb-2">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium mb-1">{isRTL ? "מידע רשמי" : "Official Data"}</div>
                    <div className="text-gray-400 text-sm">
                      {isRTL ? "ישירות מרשם המקרקעין" : "Directly from Land Registry"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-1 bg-primary-500 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-white">
                    {isRTL ? "למה להשתמש בשירות זה?" : "Why Use This Service?"}
                  </h2>
                </div>
                <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                  <p className="text-gray-300 mb-4">
                    {isRTL
                      ? "שירות איתור הנכסים לפי תעודת זהות מאפשר לך לקבל מידע מקיף על כל הנכסים הרשומים על שמך במרשם המקרקעין. השירות שימושי במיוחד במקרים הבאים:"
                      : "The property search service by ID number allows you to receive comprehensive information about all properties registered under your name in the Land Registry. The service is particularly useful in the following cases:"}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="text-primary-500 mr-2 mt-1 flex-shrink-0">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        {isRTL
                          ? "בדיקת נכסים שירשת ואינך מודע להם"
                          : "Checking properties you inherited and are not aware of"}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="text-primary-500 mr-2 mt-1 flex-shrink-0">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        {isRTL
                          ? "איתור נכסים שנרשמו על שמך בעבר"
                          : "Locating properties registered under your name in the past"}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="text-primary-500 mr-2 mt-1 flex-shrink-0">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        {isRTL
                          ? "בדיקת סטטוס רישום נכסים שרכשת"
                          : "Checking the registration status of properties you purchased"}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="text-primary-500 mr-2 mt-1 flex-shrink-0">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        {isRTL
                          ? "הכנת רשימת נכסים לצורך הליכים משפטיים"
                          : "Preparing a list of properties for legal proceedings"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="h-8 w-1 bg-primary-500 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-white">{isRTL ? "שירותים נוספים" : "Additional Services"}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/order">
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-primary-500 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
                          <FileText className="h-6 w-6 text-primary-500" />
                        </div>
                        <h3 className="text-white font-medium">
                          {isRTL ? "הזמנת נסח טאבו" : "Order Land Registry Extract"}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {isRTL
                          ? "הזמן נסח טאבו רשמי לנכס ספציפי לפי גוש וחלקה או כתובת"
                          : "Order an official Land Registry extract for a specific property by block and parcel or address"}
                      </p>
                    </div>
                  </Link>
                  <Link href="/services">
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-primary-500 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="bg-primary-500/20 p-2 rounded-lg mr-3">
                          <FileText className="h-6 w-6 text-primary-500" />
                        </div>
                        <h3 className="text-white font-medium">{isRTL ? "כל השירותים שלנו" : "All Our Services"}</h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {isRTL
                          ? "גלה את מגוון השירותים המקצועיים שאנו מציעים בתחום המקרקעין"
                          : "Discover the range of professional services we offer in the real estate field"}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
