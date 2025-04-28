"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shield, Lock, Search } from "lucide-react"

export function QuickOrder() {
  const router = useRouter()
  const { isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState<"block" | "address">("block")
  const [blockNumber, setBlockNumber] = useState("")
  const [parcelNumber, setParcelNumber] = useState("")
  const [subParcelNumber, setSubParcelNumber] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab === "block") {
      router.push(`/order?block=${blockNumber}&parcel=${parcelNumber}&subParcel=${subParcelNumber}`)
    } else {
      router.push(`/order?address=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}`)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#1A1F2E] border border-[#2A3042] shadow-xl overflow-hidden">
      <CardHeader className="bg-[#0A0E17] p-0">
        <div className="flex border-b border-[#2A3042]">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "block"
                ? "bg-[#1A1F2E] text-white"
                : "bg-[#0A0E17] text-gray-400 hover:text-white hover:bg-[#1A1F2E]/50"
            }`}
            onClick={() => setActiveTab("block")}
          >
            {isRTL ? "גוש וחלקה" : "Block & Parcel"}
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "address"
                ? "bg-[#1A1F2E] text-white"
                : "bg-[#0A0E17] text-gray-400 hover:text-white hover:bg-[#1A1F2E]/50"
            }`}
            onClick={() => setActiveTab("address")}
          >
            {isRTL ? "כתובת נכס" : "Property Address"}
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {activeTab === "block" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="block" className="block text-sm font-medium text-gray-300 mb-1">
                  {isRTL ? "גוש*" : "Block*"}
                </label>
                <input
                  type="text"
                  id="block"
                  value={blockNumber}
                  onChange={(e) => setBlockNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0E17] border border-[#2A3042] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F05A28] focus:border-transparent"
                  placeholder={isRTL ? "הזן מספר גוש" : "Enter block number"}
                  required
                />
              </div>
              <div>
                <label htmlFor="parcel" className="block text-sm font-medium text-gray-300 mb-1">
                  {isRTL ? "חלקה*" : "Parcel*"}
                </label>
                <input
                  type="text"
                  id="parcel"
                  value={parcelNumber}
                  onChange={(e) => setParcelNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0E17] border border-[#2A3042] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F05A28] focus:border-transparent"
                  placeholder={isRTL ? "הזן מספר חלקה" : "Enter parcel number"}
                  required
                />
              </div>
              <div>
                <label htmlFor="subParcel" className="block text-sm font-medium text-gray-300 mb-1">
                  {isRTL ? "תת-חלקה (אופציונלי)" : "Sub-Parcel (optional)"}
                </label>
                <input
                  type="text"
                  id="subParcel"
                  value={subParcelNumber}
                  onChange={(e) => setSubParcelNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0E17] border border-[#2A3042] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F05A28] focus:border-transparent"
                  placeholder={isRTL ? "הזן מספר תת-חלקה" : "Enter sub-parcel number"}
                />
              </div>
            </div>
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-[#F05A28] hover:bg-[#E04A18] text-white py-3 flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" />
                {isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}
              </Button>
            </div>
            <div className="flex items-center justify-center mt-4 text-xs text-gray-400">
              <Shield className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{isRTL ? "מאובטח ב-256 סיביות SSL" : "Secured with 256-bit SSL"}</span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                  {isRTL ? "עיר*" : "City*"}
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0E17] border border-[#2A3042] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F05A28] focus:border-transparent"
                  placeholder={isRTL ? "הזן שם עיר" : "Enter city name"}
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                  {isRTL ? "כתובת*" : "Address*"}
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0E17] border border-[#2A3042] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F05A28] focus:border-transparent"
                  placeholder={isRTL ? "רחוב ומספר בית" : "Street and house number"}
                  required
                />
              </div>
            </div>
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-[#F05A28] hover:bg-[#E04A18] text-white py-3 flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isRTL ? "חפש נכס" : "Search Property"}
              </Button>
            </div>
            <div className="flex items-center justify-center mt-4 text-xs text-gray-400">
              <Shield className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
              <span>{isRTL ? "מאובטח ב-256 סיביות SSL" : "Secured with 256-bit SSL"}</span>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
