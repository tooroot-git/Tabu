"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth0"
import { useLanguage } from "@/context/language-context"
import { FileText, Download, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Order type
interface Order {
  id: string
  block: string
  parcel: string
  subparcel?: string
  service_type: string
  status: string
  created_at: string
  price: number
  user_id: string
  document_url?: string
}

export default function MyOrdersPage() {
  const { user, getAccessToken } = useAuth()
  const { isRTL } = useLanguage()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/orders")

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setOrders(data.orders || [])
        setFilteredOrders(data.orders || [])
      } catch (error) {
        console.error("Error fetching orders:", error)
        // Set empty orders array instead of keeping in loading state
        setOrders([])
        setFilteredOrders([])
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    } else {
      setIsLoading(false)
    }
  }, [user])

  // Filter orders when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = orders.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.block.toLowerCase().includes(term) ||
        order.parcel.toLowerCase().includes(term) ||
        (order.subparcel && order.subparcel.toLowerCase().includes(term)) ||
        order.service_type.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term),
    )

    setFilteredOrders(filtered)
  }, [searchTerm, orders])

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "processing":
      case "paid":
        return "bg-blue-500/10 text-blue-500"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "failed":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  // Function to get status text
  const getStatusText = (status: string) => {
    if (isRTL) {
      switch (status) {
        case "completed":
          return "הושלם"
        case "processing":
          return "בעיבוד"
        case "paid":
          return "שולם"
        case "pending":
          return "ממתין"
        case "failed":
          return "נכשל"
        default:
          return status
      }
    } else {
      return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  // Function to get document type translation
  const getDocumentType = (type: string) => {
    if (isRTL) {
      switch (type) {
        case "regular":
          return "נסח רגיל"
        case "historical":
          return "נסח היסטורי"
        case "concentrated":
          return "נסח מרוכז"
        case "full":
          return "נסח מלא"
        default:
          return type
      }
    } else {
      switch (type) {
        case "regular":
          return "Regular Extract"
        case "historical":
          return "Historical Extract"
        case "concentrated":
          return "Concentrated Extract"
        case "full":
          return "Full Extract"
        default:
          return type
      }
    }
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(isRTL ? "he-IL" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">{isRTL ? "ההזמנות שלי" : "My Orders"}</h1>
              <p className="mt-2 text-gray-600">
                {isRTL ? "צפה בהיסטוריית ההזמנות שלך והורד מסמכים" : "View your order history and download documents"}
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>{isRTL ? "היסטוריית הזמנות" : "Order History"}</CardTitle>
                    <CardDescription>
                      {isRTL ? "צפה בכל ההזמנות שלך והורד את המסמכים" : "View all your orders and download documents"}
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      placeholder={isRTL ? "חפש הזמנות..." : "Search orders..."}
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                  </div>
                ) : filteredOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3 text-left text-sm font-medium text-gray-500">
                            {isRTL ? "מזהה הזמנה" : "Order ID"}
                          </th>
                          <th className="pb-3 text-left text-sm font-medium text-gray-500">
                            {isRTL ? "תאריך" : "Date"}
                          </th>
                          <th className="pb-3 text-left text-sm font-medium text-gray-500">
                            {isRTL ? "סוג מסמך" : "Document Type"}
                          </th>
                          <th className="pb-3 text-left text-sm font-medium text-gray-500">
                            {isRTL ? "גוש/חלקה" : "Block/Parcel"}
                          </th>
                          <th className="pb-3 text-left text-sm font-medium text-gray-500">
                            {isRTL ? "מחיר" : "Price"}
                          </th>
                          <th className="pb-3 text-left text-sm font-medium text-gray-500">
                            {isRTL ? "סטטוס" : "Status"}
                          </th>
                          <th className="pb-3 text-left text-sm font-medium text-gray-500">
                            {isRTL ? "פעולות" : "Actions"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="py-4 text-sm">{order.id.slice(0, 8)}</td>
                            <td className="py-4 text-sm">{formatDate(order.created_at)}</td>
                            <td className="py-4 text-sm">{getDocumentType(order.service_type)}</td>
                            <td className="py-4 text-sm">
                              {order.block}/{order.parcel}
                              {order.subparcel ? `/${order.subparcel}` : ""}
                            </td>
                            <td className="py-4 text-sm">₪{order.price}</td>
                            <td className="py-4 text-sm">
                              <span
                                className={`inline-block rounded-full px-2 py-1 text-xs ${getStatusColor(
                                  order.status,
                                )}`}
                              >
                                {getStatusText(order.status)}
                              </span>
                            </td>
                            <td className="py-4 text-sm">
                              <div className="flex gap-2">
                                {(order.status === "completed" || order.status === "paid") && order.document_url ? (
                                  <>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                                      <a href={order.document_url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                        <span className="sr-only">{isRTL ? "צפה" : "View"}</span>
                                      </a>
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                                      <a href={order.document_url} download>
                                        <Download className="h-4 w-4" />
                                        <span className="sr-only">{isRTL ? "הורד" : "Download"}</span>
                                      </a>
                                    </Button>
                                  </>
                                ) : (
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" disabled>
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">{isRTL ? "הורד" : "Download"}</span>
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-xl font-medium">{isRTL ? "אין הזמנות עדיין" : "No Orders Yet"}</h3>
                    <p className="mt-2 text-center text-gray-500">
                      {isRTL
                        ? "לא ביצעת הזמנות עדיין. הזמן את הנסח הראשון שלך עכשיו!"
                        : "You haven't placed any orders yet. Order your first extract now!"}
                    </p>
                    <Button className="mt-6" asChild>
                      <Link href="/order">{isRTL ? "הזמן נסח טאבו" : "Order Tabu Extract"}</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
