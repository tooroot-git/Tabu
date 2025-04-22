"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUser } from "@/lib/auth-utils"

export default function DashboardPage() {
  const { isRTL } = useLanguage()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(getUser())
    setIsLoading(false)
  }, [])

  // Mock orders for preview
  const mockOrders = [
    {
      id: "12345",
      date: "2023-05-15",
      type: isRTL ? "נסח היסטורי" : "Historical Extract",
      details: isRTL ? "גוש 6941 חלקה 198" : "Block 6941 Parcel 198",
      status: "completed",
      statusTextEn: "Completed",
      statusTextHe: "הושלם",
    },
    {
      id: "12346",
      date: "2023-05-10",
      type: isRTL ? "נסח רגיל" : "Regular Extract",
      details: isRTL ? "גוש 7104 חלקה 42" : "Block 7104 Parcel 42",
      status: "completed",
      statusTextEn: "Completed",
      statusTextHe: "הושלם",
    },
    {
      id: "12347",
      date: "2023-05-05",
      type: isRTL ? "נסח מלא" : "Full Extract",
      details: isRTL ? "גוש 6574 חלקה 15" : "Block 6574 Parcel 15",
      status: "processing",
      statusTextEn: "Processing",
      statusTextHe: "בעיבוד",
    },
  ]

  const displayOrders = mockOrders

  return (
    <ProtectedRoute>
      <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
        <Header />

        <main className="container mx-auto px-4 py-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {isRTL ? `שלום, ${user?.name || "משתמש"}` : `Hello, ${user?.name || "User"}`}
              </h1>
              <Button asChild>
                <Link href="/order">{isRTL ? "הזמן נסח חדש" : "Order New Extract"}</Link>
              </Button>
            </div>

            {/* Rest of the dashboard content */}
            {/* ... */}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
