"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Lock } from "lucide-react"

export function HeroSection() {
  const { isRTL } = useLanguage()
  const router = useRouter()

  // Form state
  const [block, setBlock] = useState("")
  const [parcel, setParcel] = useState("")
  const [subParcel, setSubParcel] = useState("")
  const [address, setAddress] = useState("")
  const [activeTab, setActiveTab] = useState("block")

  const handleBlockParcelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/order?block=${block}&parcel=${parcel}&subParcel=${subParcel}`)
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/order?address=${encodeURIComponent(address)}`)
  }

  return (
    <section className="relative min-h-[700px] w-full bg-[#0A0E17] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image src="/abstract-pattern.png" alt="" fill priority className="object-cover" aria-hidden="true" />
      </div>

      {/* Guide Badge */}
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-[#F05A28]/20 text-[#F05A28] px-4 py-2 rounded-full text-sm font-medium">
          {isRTL ? "המדריך המקיף ביותר לקבלת נסחי טאבו" : "The most comprehensive guide to obtaining Tabu extracts"}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-40 pb-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {isRTL ? "נסח טאבו ומסמכים רשמיים" : "Tabu Extract and Official Documents"}
            <span className="block text-[#F05A28] mt-2">{isRTL ? "במהירות ובקלות" : "Quickly and Easily"}</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            {isRTL
              ? "קבל נסח טאבו ומסמכים רשמיים באופן מיידי, ישירות למייל שלך. הפלטפורמה המהירה והמאובטחת ביותר בישראל."
              : "Get Tabu extracts and official documents immediately, directly to your email. The fastest and most secure platform in Israel."}
          </p>

          {/* Order Form */}
          <div className="mt-12 max-w-2xl mx-auto bg-[#111827]/80 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 overflow-hidden">
            <Tabs defaultValue="block" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 bg-[#0A0E17]">
                <TabsTrigger value="block" className="py-3 data-[state=active]:bg-[#111827]">
                  {isRTL ? "גוש וחלקה" : "Block & Parcel"}
                </TabsTrigger>
                <TabsTrigger value="address" className="py-3 data-[state=active]:bg-[#111827]">
                  {isRTL ? "כתובת נכס" : "Property Address"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="block" className="p-6">
                <form onSubmit={handleBlockParcelSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="block" className="block text-sm font-medium text-gray-300 mb-1">
                        {isRTL ? "גוש" : "Block"}*
                      </label>
                      <Input
                        id="block"
                        type="text"
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                        placeholder={isRTL ? "הזן מספר גוש" : "Enter block number"}
                        className="bg-[#1A1F2E] border-gray-700 text-white placeholder:text-gray-500"
                        required
                      />
                      {block && (
                        <div className="text-xs text-gray-400 mt-1">
                          {isRTL ? `לדוגמה: ${block}` : `Example: ${block}`}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="parcel" className="block text-sm font-medium text-gray-300 mb-1">
                        {isRTL ? "חלקה" : "Parcel"}*
                      </label>
                      <Input
                        id="parcel"
                        type="text"
                        value={parcel}
                        onChange={(e) => setParcel(e.target.value)}
                        placeholder={isRTL ? "הזן מספר חלקה" : "Enter parcel number"}
                        className="bg-[#1A1F2E] border-gray-700 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subParcel" className="block text-sm font-medium text-gray-300 mb-1">
                        {isRTL ? "תת-חלקה (אופציונלי)" : "Sub-Parcel (optional)"}
                      </label>
                      <Input
                        id="subParcel"
                        type="text"
                        value={subParcel}
                        onChange={(e) => setSubParcel(e.target.value)}
                        placeholder={isRTL ? "הזן מספר תת-חלקה" : "Enter sub-parcel number"}
                        className="bg-[#1A1F2E] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#F05A28] hover:bg-[#E04A18] text-white py-6 text-lg flex items-center justify-center gap-2 mt-4"
                  >
                    <Search className="h-5 w-5" />
                    {isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="address" className="p-6">
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                      {isRTL ? "כתובת מלאה" : "Full Address"}*
                    </label>
                    <Input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={
                        isRTL ? "הזן כתובת מלאה (עיר, רחוב, מספר)" : "Enter full address (city, street, number)"
                      }
                      className="bg-[#1A1F2E] border-gray-700 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#F05A28] hover:bg-[#E04A18] text-white py-6 text-lg flex items-center justify-center gap-2 mt-4"
                  >
                    <Search className="h-5 w-5" />
                    {isRTL ? "חפש לפי כתובת" : "Search by Address"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="bg-[#0A0E17]/50 p-2 text-center text-xs text-gray-400 flex items-center justify-center">
              <Lock className="h-3 w-3 mr-1" />
              {isRTL ? "אבטחה ב-256-bit SSL" : "Secured with 256-bit SSL"}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-4 gap-8 mt-12">
            <div className="flex flex-col items-center p-4">
              <div className="text-[#F05A28] mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="text-lg font-medium text-white">{isRTL ? "מסמכים רשמיים" : "Official Documents"}</div>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="text-[#F05A28] mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-lg font-medium text-white">{isRTL ? "משלוח מיידי" : "Instant Delivery"}</div>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="text-[#F05A28] mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="text-lg font-medium text-white">{isRTL ? "תשלום מאובטח" : "Secure Payment"}</div>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="text-[#F05A28] mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-lg font-medium text-white">{isRTL ? "שירות 24/7" : "24/7 Service"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
