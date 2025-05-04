"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shield, Lock, Search } from "lucide-react"
import { useLocationSearch } from "@/hooks/use-location-search"
import { AddressAutocomplete } from "@/components/ui/address-autocomplete"
import type { AutocompleteOption } from "@/components/ui/address-autocomplete"

export function QuickOrder() {
  const router = useRouter()
  const { isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState<"block" | "address">("block")
  const [blockNumber, setBlockNumber] = useState("")
  const [parcelNumber, setParcelNumber] = useState("")
  const [subParcelNumber, setSubParcelNumber] = useState("")
  const [street, setStreet] = useState("")
  const [houseNumber, setHouseNumber] = useState("")
  const [city, setCity] = useState("")

  const { cities, streets, loadingCities, loadingStreets, searchCities, searchStreets, selectedCity, setSelectedCity } =
    useLocationSearch()

  // Reset street when city changes
  useEffect(() => {
    setStreet("")
  }, [selectedCity])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab === "block") {
      router.push(`/order?block=${blockNumber}&parcel=${parcelNumber}&subParcel=${subParcelNumber}`)
    } else {
      router.push(
        `/order?city=${encodeURIComponent(city)}&street=${encodeURIComponent(street)}&houseNumber=${encodeURIComponent(houseNumber)}`,
      )
    }
  }

  const handleCitySelect = (option: AutocompleteOption) => {
    setCity(option.label)
    setSelectedCity(option.label)
    // Clear street when city changes
    setStreet("")
  }

  const handleStreetSelect = (option: AutocompleteOption) => {
    setStreet(option.label)
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <AddressAutocomplete
                  id="city"
                  options={cities}
                  onSearch={searchCities}
                  onSelect={handleCitySelect}
                  loading={loadingCities}
                  label={isRTL ? "עיר" : "City"}
                  required
                  placeholder={isRTL ? "הזן שם עיר" : "Enter city name"}
                  value={city}
                />
              </div>
              <div>
                <AddressAutocomplete
                  id="street"
                  options={streets}
                  onSearch={searchStreets}
                  onSelect={handleStreetSelect}
                  loading={loadingStreets}
                  label={isRTL ? "רחוב" : "Street"}
                  required
                  placeholder={isRTL ? "הזן שם רחוב" : "Enter street name"}
                  value={street}
                  disabled={!selectedCity}
                  onFocus={() => selectedCity && searchStreets("")}
                />
              </div>
              <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-300 mb-1">
                  {isRTL ? "מספר בית*" : "House Number*"}
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0E17] border border-[#2A3042] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#F05A28] focus:border-transparent"
                  placeholder={isRTL ? "הזן מספר בית" : "Enter house number"}
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
