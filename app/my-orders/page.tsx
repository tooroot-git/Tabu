"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Package } from "lucide-react"

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const { isRTL } = useLanguage()
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)

      if (!session?.user) {
        router.push("/login")
      }
    }

    getUser()
  }, [router, supabase])

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return

      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error
        setOrders(data || [])
      } catch (error) {
        console.error("Error fetching orders:", error)
        // Use mock data for development
        setOrders([
          {
            id: "12345678",
            block: "6941",
            parcel: "198",
            subparcel: "42",
            service_type: "regular",
            status: "paid",
            created_at: new Date().toISOString(),
            price: 39,
            document_url: "/sample-document.pdf",
          },
          {
            id: "87654321",
            block: "7104",
            parcel: "42",
            subparcel: "",
            service_type: "historical",
            status: "processing",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            price: 69,
            document_url: null,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [user, supabase])

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className={`container mx-auto px-4 py-12 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{isRTL ? "ההזמנות שלי" : "My Orders"}</h1>
        <p className="mt-2 text-gray-400">{isRTL ? "צפה בהיסטוריית ההזמנות שלך" : "View your order history"}</p>
      </div>

      {orders.length === 0 ? (
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">{isRTL ? "אין הזמנות עדיין" : "No orders yet"}</h3>
              <p className="text-gray-400 mb-6">
                {isRTL
                  ? "נראה שעדיין לא ביצעת הזמנות. התחל להזמין נסחי טאבו עכשיו!"
                  : "Looks like you haven't placed any orders yet. Start ordering Tabu extracts now!"}
              </p>
              <Button className="bg-gradient-to-r from-primary-500 to-primary-600" asChild>
                <a href="/order">
                  <Package className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {isRTL ? "הזמן נסח טאבו" : "Order Tabu Extract"}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white">
                    {isRTL ? "הזמנה מספר: " : "Order #"} {order.id}
                  </CardTitle>
                  <div
                    className={`px-3 py-1 text-sm rounded-full ${
                      order.status === "paid"
                        ? "bg-green-900/30 text-green-400"
                        : order.status === "processing"
                          ? "bg-yellow-900/30 text-yellow-400"
                          : "bg-blue-900/30 text-blue-400"
                    }`}
                  >
                    {order.status === "paid"
                      ? isRTL
                        ? "שולם"
                        : "Paid"
                      : order.status === "processing"
                        ? isRTL
                          ? "בעיבוד"
                          : "Processing"
                        : isRTL
                          ? "ממתין"
                          : "Pending"}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">{isRTL ? "גוש" : "Block"}</p>
                    <p className="text-white">{order.block}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{isRTL ? "חלקה" : "Parcel"}</p>
                    <p className="text-white">{order.parcel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{isRTL ? "תת-חלקה" : "Sub-parcel"}</p>
                    <p className="text-white">{order.subparcel || "-"}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">{isRTL ? "סוג שירות" : "Service Type"}</p>
                    <p className="text-white">
                      {order.service_type === "regular"
                        ? isRTL
                          ? "נסח רגיל"
                          : "Regular Extract"
                        : order.service_type === "historical"
                          ? isRTL
                            ? "נסח היסטורי"
                            : "Historical Extract"
                          : isRTL
                            ? "נסח מרוכז"
                            : "Concentrated Extract"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{isRTL ? "תאריך" : "Date"}</p>
                    <p className="text-white">
                      {new Date(order.created_at).toLocaleDateString(isRTL ? "he-IL" : "en-US")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{isRTL ? "מחיר" : "Price"}</p>
                    <p className="text-white">₪{order.price}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  {order.document_url ? (
                    <Button variant="outline" asChild>
                      <a href={order.document_url} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {isRTL ? "הורד מסמך" : "Download Document"}
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      <FileText className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                      {isRTL ? "מסמך בהכנה" : "Document in preparation"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
