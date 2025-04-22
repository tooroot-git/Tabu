"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Search, FileText, Clock, CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useUser } from "@/lib/auth-mock"
import { ProtectedRoute } from "@/components/auth/protected-route"

interface Order {
  id: string
  date: string
  type: string
  details: string
  status: string
  statusTextEn: string
  statusTextHe: string
}

export default function MyOrdersPage() {
  const { language, isRTL } = useLanguage()
  const { user } = useUser()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchOrders() {
      if (user?.sub) {
        try {
          // For preview, we'll use mock data
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching orders:", error)
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [user, isRTL])

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

  // Filter orders based on search term
  const filteredOrders = displayOrders.filter(
    (order) =>
      order.id.includes(searchTerm) ||
      order.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <ProtectedRoute>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-sans-hebrew" : "font-sans"}>
        <Header />

        <main className="container mx-auto px-4 py-8 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold text-gray-900">{isRTL ? "ההזמנות שלי" : "My Orders"}</h1>
              <Button className="mt-4 md:mt-0" asChild>
                <Link href="/order">{isRTL ? "הזמן נסח חדש" : "Order New Extract"}</Link>
              </Button>
            </div>

            <Card className="mb-8">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 rtl:left-auto rtl:right-3" />
                  <Input
                    placeholder={isRTL ? "חפש לפי מספר הזמנה, גוש או חלקה" : "Search by order number, block or parcel"}
                    className={isRTL ? "pr-10" : "pl-10"}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Clock className="h-8 w-8 animate-spin text-primary-600" />
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {order.type} - {order.details}
                            </h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <span className="mr-4 rtl:ml-4 rtl:mr-0">
                                {isRTL ? `הזמנה #${order.id}` : `Order #${order.id}`}
                              </span>
                              <span>
                                {new Date(order.date).toLocaleDateString(isRTL ? "he-IL" : "en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between md:mt-0 md:justify-end md:space-x-4 rtl:space-x-reverse">
                          <div className="flex items-center">
                            {order.status === "completed" ? (
                              <CheckCircle className="mr-1.5 h-4 w-4 text-green-500 rtl:ml-1.5 rtl:mr-0" />
                            ) : (
                              <Clock className="mr-1.5 h-4 w-4 text-yellow-500 rtl:ml-1.5 rtl:mr-0" />
                            )}
                            <span
                              className={`text-sm ${order.status === "completed" ? "text-green-600" : "text-yellow-600"}`}
                            >
                              {isRTL ? order.statusTextHe : order.statusTextEn}
                            </span>
                          </div>

                          {order.status === "completed" && (
                            <Button size="sm" variant="outline" className="gap-1">
                              <Download className="h-4 w-4" />
                              {isRTL ? "הורד" : "Download"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">{isRTL ? "לא נמצאו הזמנות" : "No orders found"}</h3>
                <p className="mt-2 text-gray-500">
                  {isRTL
                    ? "נסה לחפש משהו אחר או הזמן נסח חדש"
                    : "Try searching for something else or order a new extract"}
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/order">{isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}</Link>
                </Button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
