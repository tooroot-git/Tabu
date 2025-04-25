"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Order } from "@/lib/supabase"

export default function MyOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { isRTL } = useLanguage()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false })

          if (error) {
            console.error("Error fetching orders:", error)
          } else {
            setOrders(data || [])
            setFilteredOrders(data || [])
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [supabase])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOrders(orders)
    } else {
      const filtered = orders.filter(
        (order) =>
          order.block.includes(searchTerm) ||
          order.parcel.includes(searchTerm) ||
          (order.subparcel && order.subparcel.includes(searchTerm)) ||
          order.order_type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredOrders(filtered)
    }
  }, [searchTerm, orders])

  // Function to format date in Hebrew or English
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return isRTL
      ? date.toLocaleDateString("he-IL")
      : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Function to get status text and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          text: isRTL ? "ממתין" : "Pending",
          color: "text-yellow-500 bg-yellow-100/10",
        }
      case "paid":
        return {
          text: isRTL ? "שולם" : "Paid",
          color: "text-blue-500 bg-blue-100/10",
        }
      case "sent":
        return {
          text: isRTL ? "נשלח" : "Sent",
          color: "text-green-500 bg-green-100/10",
        }
      default:
        return {
          text: status,
          color: "text-gray-500 bg-gray-100/10",
        }
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{isRTL ? "ההזמנות שלי" : "My Orders"}</h1>
        <p className="mt-2 text-gray-400">
          {isRTL ? "צפה בכל ההזמנות שלך והורד מסמכים" : "View all your orders and download documents"}
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 rtl:left-auto rtl:right-3" />
          <Input
            type="search"
            placeholder={isRTL ? "חפש לפי גוש, חלקה או סוג..." : "Search by block, parcel or type..."}
            className="pl-10 rtl:pl-4 rtl:pr-10 bg-gray-900/80 border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400">
              {searchTerm
                ? isRTL
                  ? "לא נמצאו הזמנות התואמות את החיפוש שלך"
                  : "No orders found matching your search"
                : isRTL
                  ? "אין לך הזמנות עדיין"
                  : "You don't have any orders yet"}
            </p>
            {!searchTerm && (
              <Button className="mt-4 bg-gradient-to-r from-primary-500 to-primary-600" asChild>
                <a href="/order">{isRTL ? "הזמן עכשיו" : "Order Now"}</a>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status)

            return (
              <Card key={order.id} className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-white">
                      {isRTL
                        ? `גוש: ${order.block}, חלקה: ${order.parcel}`
                        : `Block: ${order.block}, Parcel: ${order.parcel}`}
                      {order.subparcel && (isRTL ? `, תת חלקה: ${order.subparcel}` : `, Subparcel: ${order.subparcel}`)}
                    </CardTitle>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>{statusInfo.text}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">{isRTL ? "סוג הזמנה" : "Order Type"}</p>
                      <p className="text-white">{order.order_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{isRTL ? "תאריך" : "Date"}</p>
                      <p className="text-white">{formatDate(order.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{isRTL ? "מחיר" : "Price"}</p>
                      <p className="text-white">₪{order.price}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    {order.file_url ? (
                      <Button variant="outline" asChild>
                        <a href={order.file_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          {isRTL ? "הורד מסמך" : "Download Document"}
                        </a>
                      </Button>
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        {isRTL
                          ? "המסמך יהיה זמין להורדה לאחר עיבוד ההזמנה"
                          : "Document will be available for download after processing"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
