"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Lock } from "lucide-react"
import Image from "next/image"

export default function OrderPage() {
  const { isRTL } = useLanguage()
  const searchParams = useSearchParams()

  // Get initial values from URL params
  const initialBlock = searchParams.get("block") || ""
  const initialParcel = searchParams.get("parcel") || ""
  const initialSubParcel = searchParams.get("subParcel") || ""
  const initialAddress = searchParams.get("address") || ""

  // Form state
  const [block, setBlock] = useState(initialBlock)
  const [parcel, setParcel] = useState(initialParcel)
  const [subParcel, setSubParcel] = useState(initialSubParcel)
  const [address, setAddress] = useState(initialAddress)
  const [activeTab, setActiveTab] = useState(initialAddress ? "address" : "block")

  const handleBlockParcelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Block/Parcel form submitted:", { block, parcel, subParcel })
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Address form submitted:", { address })
  }

  return (
    <div className="min-h-screen bg-[#0A0E17] pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            {isRTL ? "הזמנת נסח טאבו" : "Order Tabu Extract"}
          </h1>

          <div className="bg-[#111827]/80 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 overflow-hidden">
            <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
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

                  <div className="mt-8">
                    <h3 className="text-xl font-medium text-white mb-4">
                      {isRTL ? "בחר סוג נסח" : "Select Extract Type"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-700 rounded-lg p-4 bg-[#1A1F2E] hover:border-[#F05A28] cursor-pointer transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium text-white">{isRTL ? "נסח רגיל" : "Regular Extract"}</h4>
                          <div className="text-[#F05A28] font-bold">₪39</div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {isRTL
                            ? "נסח טאבו סטנדרטי המציג את פרטי הנכס והבעלות הנוכחית"
                            : "Standard Tabu extract showing current property details and ownership"}
                        </p>
                        <div className="mt-auto">
                          <Image
                            src="/tabu-sample.png"
                            alt="Regular Extract Sample"
                            width={200}
                            height={280}
                            className="mx-auto rounded border border-gray-600"
                          />
                        </div>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-4 bg-[#1A1F2E] hover:border-[#F05A28] cursor-pointer transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium text-white">
                            {isRTL ? "נסח היסטורי" : "Historical Extract"}
                          </h4>
                          <div className="text-[#F05A28] font-bold">₪59</div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {isRTL
                            ? "כולל היסטוריית בעלות ועסקאות קודמות בנכס"
                            : "Includes ownership history and previous transactions"}
                        </p>
                        <div className="mt-auto">
                          <Image
                            src="/tabu-sample.png"
                            alt="Historical Extract Sample"
                            width={200}
                            height={280}
                            className="mx-auto rounded border border-gray-600"
                          />
                        </div>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-4 bg-[#1A1F2E] hover:border-[#F05A28] cursor-pointer transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium text-white">{isRTL ? "נסח מורחב" : "Extended Extract"}</h4>
                          <div className="text-[#F05A28] font-bold">₪79</div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {isRTL
                            ? "כולל מידע מקיף על הנכס, שעבודים, הערות אזהרה ומסמכים נלווים"
                            : "Comprehensive information including liens, warnings and related documents"}
                        </p>
                        <div className="mt-auto">
                          <Image
                            src="/tabu-sample.png"
                            alt="Extended Extract Sample"
                            width={200}
                            height={280}
                            className="mx-auto rounded border border-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#F05A28] hover:bg-[#E04A18] text-white py-6 text-lg flex items-center justify-center gap-2 mt-8"
                  >
                    <Search className="h-5 w-5" />
                    {isRTL ? "המשך להזמנה" : "Continue to Order"}
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

                  <div className="mt-8">
                    <h3 className="text-xl font-medium text-white mb-4">
                      {isRTL ? "בחר סוג נסח" : "Select Extract Type"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-700 rounded-lg p-4 bg-[#1A1F2E] hover:border-[#F05A28] cursor-pointer transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium text-white">{isRTL ? "נסח רגיל" : "Regular Extract"}</h4>
                          <div className="text-[#F05A28] font-bold">₪39</div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {isRTL
                            ? "נסח טאבו סטנדרטי המציג את פרטי הנכס והבעלות הנוכחית"
                            : "Standard Tabu extract showing current property details and ownership"}
                        </p>
                        <div className="mt-auto">
                          <Image
                            src="/tabu-sample.png"
                            alt="Regular Extract Sample"
                            width={200}
                            height={280}
                            className="mx-auto rounded border border-gray-600"
                          />
                        </div>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-4 bg-[#1A1F2E] hover:border-[#F05A28] cursor-pointer transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium text-white">
                            {isRTL ? "נסח היסטורי" : "Historical Extract"}
                          </h4>
                          <div className="text-[#F05A28] font-bold">₪59</div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {isRTL
                            ? "כולל היסטוריית בעלות ועסקאות קודמות בנכס"
                            : "Includes ownership history and previous transactions"}
                        </p>
                        <div className="mt-auto">
                          <Image
                            src="/tabu-sample.png"
                            alt="Historical Extract Sample"
                            width={200}
                            height={280}
                            className="mx-auto rounded border border-gray-600"
                          />
                        </div>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-4 bg-[#1A1F2E] hover:border-[#F05A28] cursor-pointer transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium text-white">{isRTL ? "נסח מורחב" : "Extended Extract"}</h4>
                          <div className="text-[#F05A28] font-bold">₪79</div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {isRTL
                            ? "כולל מידע מקיף על הנכס, שעבודים, הערות אזהרה ומסמכים נלווים"
                            : "Comprehensive information including liens, warnings and related documents"}
                        </p>
                        <div className="mt-auto">
                          <Image
                            src="/tabu-sample.png"
                            alt="Extended Extract Sample"
                            width={200}
                            height={280}
                            className="mx-auto rounded border border-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#F05A28] hover:bg-[#E04A18] text-white py-6 text-lg flex items-center justify-center gap-2 mt-8"
                  >
                    <Search className="h-5 w-5" />
                    {isRTL ? "המשך להזמנה" : "Continue to Order"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="bg-[#0A0E17]/50 p-2 text-center text-xs text-gray-400 flex items-center justify-center">
              <Lock className="h-3 w-3 mr-1" />
              {isRTL ? "אבטחה ב-256-bit SSL" : "Secured with 256-bit SSL"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
