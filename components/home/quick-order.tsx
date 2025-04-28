"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, Search } from "lucide-react"

export function QuickOrder() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [block, setBlock] = useState("")
  const [parcel, setParcel] = useState("")
  const [subParcel, setSubParcel] = useState("")
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/order?block=${block}&parcel=${parcel}&subParcel=${subParcel}`)
  }

  return (
    <Card className="w-full max-w-md border border-gray-700 bg-gray-800/90 backdrop-blur-lg shadow-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-center">
          {isRTL ? "הזמנת נסח טאבו מהירה" : "Quick Land Registry Order"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="block" className="block text-sm font-medium text-gray-300 mb-1">
                {isRTL ? "גוש" : "Block"}
              </label>
              <Input
                id="block"
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                placeholder={isRTL ? "הזן מספר גוש" : "Enter block number"}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="parcel" className="block text-sm font-medium text-gray-300 mb-1">
                {isRTL ? "חלקה" : "Parcel"}
              </label>
              <Input
                id="parcel"
                type="text"
                value={parcel}
                onChange={(e) => setParcel(e.target.value)}
                placeholder={isRTL ? "הזן מספר חלקה" : "Enter parcel number"}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
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
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#F05A28] hover:bg-[#E04A18] text-white flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            {isRTL ? "הזמן נסח טאבו" : "Order Land Registry"}
            <ArrowIcon className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default QuickOrder
