"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { FileText, Download, AlertCircle } from "lucide-react"

interface Order {
  id: string
  block: string
  parcel: string
  subparcel?: string
  service_type: string
  status: string
  price: number
  created_at: string
  document_url?: string
}

export default function MyOrdersClient() {
  const { isRTL } = useLanguage()
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        setOrders(data || [])
      } catch (err: any) {
        console.error("Error fetching orders:", err)
        setError(err.message || "Failed to fetch orders")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return isRTL ? "ממתין לתשלום" : "Pending Payment"
      case "paid":
        return isRTL ? "שולם, בהכנה" : "Paid, Processing"
      case "fulfilled":
        return isRTL ? "הושלם" : "Fulfilled"
      case "payment_failed":
        return isRTL ? "תשלום נכשל" : "Payment Failed"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "paid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "fulfilled":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "payment_failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

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

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-2 text-lg font-medium">{isRTL ? "אין לך הזמנות עדיין" : "No orders yet"}</h3>
        <p className="mt-1 text-gray-500">{isRTL ? "הזמנות שתבצע יופיעו כאן" : "Orders you place will appear here"}</p>
        <Button
          onClick={() => (window.location.href = "/order")}
          className="mt-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white"
        >
          {isRTL ? "הזמן נסח טאבו" : "Order Tabu Extract"}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">
                  {isRTL ? `גוש ${order.block}, חלקה ${order.parcel}` : `Block ${order.block}, Parcel ${order.parcel}`}
                  {order.subparcel && (isRTL ? `, תת-חלקה ${order.subparcel}` : `, Subparcel ${order.subparcel}`)}
                </CardTitle>
                <CardDescription>
                  {isRTL ? "מספר הזמנה:" : "Order ID:"} {order.id}
                </CardDescription>
              </div>
              <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{isRTL ? "סוג מסמך" : "Document Type"}</span>
                <span>{order.service_type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{isRTL ? "תאריך הזמנה" : "Order Date"}</span>
                <span>{formatDate(order.created_at)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{isRTL ? "מחיר" : "Price"}</span>
                <span>₪{order.price}</span>
              </div>

              <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                {order.status === "fulfilled" && order.document_url ? (
                  <Button
                    onClick={() => window.open(order.document_url, "_blank")}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isRTL ? "הורד מסמך" : "Download Document"}
                  </Button>
                ) : order.status === "pending" ? (
                  <Button
                    onClick={() =>
                      (window.location.href = `/payment?block=${order.block}&parcel=${order.parcel}${order.subparcel ? `&subparcel=${order.subparcel}` : ""}&service=${order.service_type}`)
                    }
                    className="w-full"
                  >
                    {isRTL ? "המשך לתשלום" : "Continue to Payment"}
                  </Button>
                ) : order.status === "payment_failed" ? (
                  <Button
                    onClick={() =>
                      (window.location.href = `/payment?block=${order.block}&parcel=${order.parcel}${order.subparcel ? `&subparcel=${order.subparcel}` : ""}&service=${order.service_type}`)
                    }
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isRTL ? "נסה לשלם שוב" : "Try Payment Again"}
                  </Button>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-2">
                    {isRTL ? "המסמך שלך בהכנה" : "Your document is being prepared"}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
