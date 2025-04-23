"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Hero() {
  const { language, isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    block: "",
    parcel: "",
    subparcel: "",
    street: "",
    houseNumber: "",
    city: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // בדיקה איזה טאב פעיל
    const activeTab = document.querySelector('[data-state="active"]')?.getAttribute("value")

    if (activeTab === "address") {
      window.location.href = `/document-selection?street=${encodeURIComponent(formData.street)}&houseNumber=${encodeURIComponent(formData.houseNumber)}&city=${encodeURIComponent(formData.city)}&inputType=address`
    } else {
      window.location.href = `/document-selection?block=${formData.block}&parcel=${formData.parcel}&subparcel=${formData.subparcel}&inputType=blockParcel`
    }
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-700/20 blur-[120px]"></div>
        <div className="absolute top-[20%] right-[5%] h-[400px] w-[700px] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] left-[30%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-600/20 to-blue-600/5 blur-[100px]"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400">
            <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
            {isRTL ? "הדרך המהירה ביותר לקבלת נסחי טאבו" : "The fastest way to get Tabu extracts"}
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
            {isRTL ? "נסח טאבו ומסמכים רשמיים" : "Official Land Registry"}
            <span className="mt-2 block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {isRTL ? "במהירות ובקלות" : "Fast & Secure Access"}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
            {isRTL
              ? "קבל נסח טאבו ומסמכים רשמיים באופן מיידי, ישירות למייל שלך. הפלטפורמה המהירה והמאובטחת ביותר בישראל."
              : "Get official Tabu extracts instantly, delivered directly to your email. The fastest and most secure platform in Israel."}
          </p>

          {/* Centralized Form */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="rounded-xl border border-gray-800 bg-gray-900/80 p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="blockParcel" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="blockParcel" className="text-sm">
                      {isRTL ? "גוש וחלקה" : "Block & Parcel"}
                    </TabsTrigger>
                    <TabsTrigger value="address" className="text-sm">
                      {isRTL ? "כתובת נכס" : "Property Address"}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="blockParcel">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div>
                        <label htmlFor="block" className="block text-sm font-medium text-gray-300">
                          {isRTL ? "גוש" : "Block (Gush)"}*
                        </label>
                        <Input
                          id="block"
                          type="text"
                          placeholder={isRTL ? "הזן מספר גוש" : "Enter Block number"}
                          className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                          value={formData.block}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="parcel" className="block text-sm font-medium text-gray-300">
                          {isRTL ? "חלקה" : "Parcel (Helka)"}*
                        </label>
                        <Input
                          id="parcel"
                          type="text"
                          placeholder={isRTL ? "הזן מספר חלקה" : "Enter Parcel number"}
                          className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                          value={formData.parcel}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="subparcel" className="block text-sm font-medium text-gray-300">
                          {isRTL ? "תת-חלקה (אופציונלי)" : "Sub-parcel (Optional)"}
                        </label>
                        <Input
                          id="subparcel"
                          type="text"
                          placeholder={isRTL ? "הזן מספר תת-חלקה" : "Enter Sub-parcel"}
                          className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                          value={formData.subparcel}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="address">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="md:col-span-1">
                        <label htmlFor="street" className="block text-sm font-medium text-gray-300">
                          {isRTL ? "רחוב" : "Street"}*
                        </label>
                        <Input
                          id="street"
                          type="text"
                          placeholder={isRTL ? "הזן את שם הרחוב" : "Enter street name"}
                          className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                          value={formData.street}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-300">
                          {isRTL ? "מספר בית" : "House Number"}*
                        </label>
                        <Input
                          id="houseNumber"
                          type="text"
                          placeholder={isRTL ? "הזן מספר בית" : "Enter house number"}
                          className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                          value={formData.houseNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                          {isRTL ? "יישוב" : "City"}*
                        </label>
                        <Input
                          id="city"
                          type="text"
                          placeholder={isRTL ? "הזן את שם היישוב" : "Enter city name"}
                          className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full bg-gradient-to-r from-primary-500 to-primary-600 py-6 text-lg font-medium text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                >
                  {isRTL ? "הזמן נסח עכשיו" : "Get Your Extract Now"}
                </Button>
              </form>

              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <Shield className="mr-2 h-4 w-4" />
                {isRTL ? "מאובטח ב-256 ביט SSL" : "Secured with 256-bit SSL"}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <CheckCircle className="h-5 w-5 text-primary-500" />
              <span>{isRTL ? "מסמכים רשמיים" : "Official Documents"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <CheckCircle className="h-5 w-5 text-primary-500" />
              <span>{isRTL ? "משלוח מיידי" : "Instant Delivery"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <CheckCircle className="h-5 w-5 text-primary-500" />
              <span>{isRTL ? "אבטחה מתקדמת" : "Advanced Security"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <CheckCircle className="h-5 w-5 text-primary-500" />
              <span>{isRTL ? "תמיכה 24/7" : "24/7 Support"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
