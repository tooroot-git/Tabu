"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useTranslation } from "../../context/language-context"
import { Button } from "../../components/ui/button"
import Link from "next/link"

interface Order {
  id: string
  block: string
  parcel: string
  status: string
  created_at: string
  price: number
}

export default function MyOrdersClient() {
  const { user } = useUser()
  const { t, isHebrew } = useTranslation()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.sub) {
      fetchOrders()
    }
  }, [user])

  async function fetchOrders() {
    try {
      setLoading(true)
      const response = await fetch("/api/orders")
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      console.error("Error fetching orders:", err)
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(isHebrew ? "he-IL" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-10" dir={isHebrew ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-6">{t("myOrders")}</h1>

      {loading && <p>{t("loading")}...</p>}

      {error && (
        <div className="bg-red-50 p-4 rounded-md text-red-600 mb-6">
          {t("errorFetchingOrders")}: {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p>{t("noOrdersFound")}</p>
            <Button as={Link} href="/order" className="mt-4">
              {t("orderNewDocument")}
            </Button>
          </CardContent>
        </Card>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>
                  {t("orderFor")} {t("block")} {order.block}, {t("parcel")} {order.parcel}
                </CardTitle>
                <CardDescription>
                  {t("orderDate")}: {formatDate(order.created_at)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>{t("orderID")}:</strong> {order.id}
                  </p>
                  <p>
                    <strong>{t("status")}:</strong> {t(order.status)}
                  </p>
                  <p>
                    <strong>{t("price")}:</strong> {order.price} ILS
                  </p>
                </div>
                {order.status === "paid" && <Button className="mt-4">{t("downloadDocument")}</Button>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
