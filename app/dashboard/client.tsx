"use client"

import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { FileText, User, Settings, Clock, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import type { Order } from "@/lib/supabase"
import { useTranslation } from "../../context/language-context"

export function DashboardClient() {
  const { user } = useUser()
  const { isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t, isHebrew } = useTranslation()

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders")
        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }
        const data = await response.json()
        setOrders(data.orders || [])
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Format date to local format
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(isRTL ? "he-IL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Get status color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "paid":
        return "bg-blue-500/10 text-blue-500"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "cancelled":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  // Get status text based on status
  const getStatusText = (status) => {
    if (isRTL) {
      switch (status) {
        case "completed":
          return "הושלם"
        case "paid":
          return "שולם"
        case "pending":
          return "ממתין"
        case "cancelled":
          return "בוטל"
        default:
          return status
      }
    } else {
      return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  // Get service type text
  const getServiceTypeText = (serviceType) => {
    if (isRTL) {
      switch (serviceType) {
        case "Regular Extract":
          return "נסח רגיל"
        case "Historical Extract":
          return "נסח היסטורי"
        case "Full Extract":
          return "נסח מלא"
        default:
          return serviceType
      }
    } else {
      return serviceType
    }
  }

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="relative py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-700/20 blur-[120px]"></div>
          <div className="absolute top-[20%] right-[5%] h-[400px] w-[700px] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">{isRTL ? "לוח הבקרה שלי" : "My Dashboard"}</h1>
              <p className="mt-2 text-gray-400">
                {isRTL ? "נהל את ההזמנות והפרופיל שלך" : "Manage your orders and profile"}
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800/50 border border-gray-700">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary-500">
                  {isRTL ? "סקירה כללית" : "Overview"}
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-primary-500">
                  {isRTL ? "ההזמנות שלי" : "My Orders"}
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-primary-500">
                  {isRTL ? "פרופיל" : "Profile"}
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* User Info Card */}
                  <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">{isRTL ? "פרטי משתמש" : "User Information"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-4">
                        {user?.picture && (
                          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary-500">
                            <img
                              src={user.picture || "/placeholder.svg"}
                              alt={user.name || "User"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {user?.name || (isRTL ? "משתמש" : "User")}
                          </h3>
                          <p className="text-gray-400">{user?.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Orders Card */}
                  <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">{isRTL ? "הזמנות אחרונות" : "Recent Orders"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {isLoading ? (
                          <div className="flex justify-center py-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
                          </div>
                        ) : orders.length > 0 ? (
                          <>
                            {orders.slice(0, 2).map((order) => (
                              <div
                                key={order.id}
                                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-800/50 p-3"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary-400" />
                                    <span className="font-medium text-white">
                                      {order.id ? order.id.substring(0, 8) : ""}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-400">
                                    {isRTL ? "גוש: " : "Block: "}
                                    {order.block}, {isRTL ? "חלקה: " : "Parcel: "}
                                    {order.parcel}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div
                                    className={`inline-block rounded-full px-2 py-1 text-xs ${getStatusColor(
                                      order.status,
                                    )}`}
                                  >
                                    {getStatusText(order.status)}
                                  </div>
                                  <p className="mt-1 text-sm text-gray-400">{formatDate(order.created_at)}</p>
                                </div>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              className="w-full border-gray-700 text-white hover:bg-gray-800"
                              asChild
                            >
                              <Link href="#" onClick={() => setActiveTab("orders")}>
                                <Clock className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                {isRTL ? "צפה בכל ההזמנות" : "View All Orders"}
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <div className="text-center py-4 text-gray-400">
                            {isRTL ? "אין הזמנות עדיין" : "No orders yet"}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions Card */}
                  <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-white">{isRTL ? "פעולות מהירות" : "Quick Actions"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <Button
                          variant="outline"
                          className="h-auto border-gray-700 p-4 text-white hover:bg-gray-800"
                          asChild
                        >
                          <Link href="/order">
                            <div className="flex flex-col items-center gap-2">
                              <FileText className="h-6 w-6 text-primary-400" />
                              <span>{isRTL ? "הזמן נסח טאבו חדש" : "Order New Tabu Extract"}</span>
                            </div>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-auto border-gray-700 p-4 text-white hover:bg-gray-800"
                          asChild
                        >
                          <Link href="#" onClick={() => setActiveTab("profile")}>
                            <div className="flex flex-col items-center gap-2">
                              <User className="h-6 w-6 text-primary-400" />
                              <span>{isRTL ? "ערוך את הפרופיל שלך" : "Edit Your Profile"}</span>
                            </div>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-auto border-gray-700 p-4 text-white hover:bg-gray-800"
                          asChild
                        >
                          <Link href="/contact">
                            <div className="flex flex-col items-center gap-2">
                              <Settings className="h-6 w-6 text-primary-400" />
                              <span>{isRTL ? "צור קשר" : "Contact Support"}</span>
                            </div>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{isRTL ? "היסטוריית הזמנות" : "Order History"}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {isRTL ? "צפה בכל ההזמנות שלך והורד את המסמכים" : "View all your orders and download documents"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="pb-3 text-left text-sm font-medium text-gray-400">
                                {isRTL ? "מזהה הזמנה" : "Order ID"}
                              </th>
                              <th className="pb-3 text-left text-sm font-medium text-gray-400">
                                {isRTL ? "תאריך" : "Date"}
                              </th>
                              <th className="pb-3 text-left text-sm font-medium text-gray-400">
                                {isRTL ? "סוג מסמך" : "Document Type"}
                              </th>
                              <th className="pb-3 text-left text-sm font-medium text-gray-400">
                                {isRTL ? "גוש/חלקה" : "Block/Parcel"}
                              </th>
                              <th className="pb-3 text-left text-sm font-medium text-gray-400">
                                {isRTL ? "מחיר" : "Price"}
                              </th>
                              <th className="pb-3 text-left text-sm font-medium text-gray-400">
                                {isRTL ? "סטטוס" : "Status"}
                              </th>
                              <th className="pb-3 text-left text-sm font-medium text-gray-400">
                                {isRTL ? "פעולות" : "Actions"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order) => (
                              <tr key={order.id} className="border-b border-gray-800">
                                <td className="py-4 text-sm text-white">{order.id ? order.id.substring(0, 8) : ""}</td>
                                <td className="py-4 text-sm text-white">{formatDate(order.created_at)}</td>
                                <td className="py-4 text-sm text-white">{getServiceTypeText(order.service_type)}</td>
                                <td className="py-4 text-sm text-white">
                                  {order.block}/{order.parcel}
                                </td>
                                <td className="py-4 text-sm text-white">₪{order.price}</td>
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
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary-400">
                                      <Download className="h-4 w-4" />
                                      <span className="sr-only">{isRTL ? "הורד" : "Download"}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary-400">
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">{isRTL ? "צפה" : "View"}</span>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <FileText className="h-16 w-16 text-gray-600" />
                        <h3 className="mt-4 text-xl font-medium text-white">
                          {isRTL ? "אין הזמנות עדיין" : "No Orders Yet"}
                        </h3>
                        <p className="mt-2 text-center text-gray-400">
                          {isRTL
                            ? "לא ביצעת הזמנות עדיין. הזמן את הנסח הראשון שלך עכשיו!"
                            : "You haven't placed any orders yet. Order your first extract now!"}
                        </p>
                        <Button
                          className="mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                          asChild
                        >
                          <Link href="/order">{isRTL ? "הזמן נסח טאבו" : "Order Tabu Extract"}</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{isRTL ? "פרטי פרופיל" : "Profile Details"}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {isRTL ? "צפה בפרטי החשבון שלך" : "View your account details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col items-center gap-4 sm:flex-row">
                        {user?.picture && (
                          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary-500">
                            <img
                              src={user.picture || "/placeholder.svg"}
                              alt={user.name || "User"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {user?.name || (isRTL ? "משתמש" : "User")}
                          </h3>
                          <p className="text-gray-400">{user?.email}</p>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-gray-400">{isRTL ? "שם מלא" : "Full Name"}</h4>
                          <p className="text-white">{user?.name || "-"}</p>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-gray-400">
                            {isRTL ? "כתובת אימייל" : "Email Address"}
                          </h4>
                          <p className="text-white">{user?.email || "-"}</p>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-gray-400">{isRTL ? "מזהה משתמש" : "User ID"}</h4>
                          <p className="text-white">{user?.sub || "-"}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4">
                        <Button
                          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                          asChild
                        >
                          <Link href="/api/auth/logout">{isRTL ? "התנתק" : "Logout"}</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
