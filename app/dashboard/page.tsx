"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Package,
  Download,
  Clock,
  AlertTriangle,
  User,
  Bell,
  Shield,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

// Define the Order type based on the actual database schema
interface Order {
  id: string
  user_id: string
  block: string
  parcel: string
  subparcel?: string
  service_type: string
  status: string
  price: number
  payment_id?: string
  document_url?: string
  email: string
  created_at: string
  updated_at?: string
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isRTL } = useLanguage()
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchOrders() {
      if (authLoading) return

      if (!user) {
        console.log("No user found, redirecting to login")
        router.push("/login?returnTo=/dashboard")
        return
      }

      setIsLoading(true)
      try {
        console.log("Fetching orders for user:", user.id)

        // Fetch orders from Supabase
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (ordersError) {
          console.error("Error fetching orders from Supabase:", ordersError)
          throw ordersError
        }

        console.log("Successfully fetched orders:", ordersData?.length || 0)
        setOrders(ordersData || [])
      } catch (fetchError) {
        console.error("Error fetching orders:", fetchError)
        setError(fetchError instanceof Error ? fetchError.message : "An unknown error occurred")
        setOrders([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [supabase, router, user, authLoading])

  if (authLoading || isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="border-red-800 bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-bold text-white">{isRTL ? "שגיאה בטעינת הדף" : "Error Loading Dashboard"}</h2>
            </div>
            <p className="text-red-400 mb-4">{error}</p>
            <div className="flex gap-3">
              <Button className="bg-primary-500 hover:bg-primary-600" onClick={() => window.location.reload()}>
                {isRTL ? "נסה שוב" : "Try Again"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Clear error and continue with empty orders
                  setError(null)
                  setOrders([])
                }}
              >
                {isRTL ? "המשך בכל זאת" : "Continue Anyway"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    // This should not happen due to the redirect in the useEffect
    router.push("/login")
    return null
  }

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

  return (
    <div className={`container mx-auto px-4 py-12 mt-16 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
      {/* Welcome Banner */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 p-8">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#ffffff10,#ffffff80)]"></div>
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-primary-400/20 blur-3xl"></div>
        <div className="relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isRTL
                  ? `שלום, ${user.user_metadata?.name || user.email?.split("@")[0]}`
                  : `Hello, ${user.user_metadata?.name || user.email?.split("@")[0]}`}
              </h1>
              <p className="mt-2 text-primary-100">{isRTL ? "ברוך הבא ללוח הבקרה שלך" : "Welcome to your dashboard"}</p>
            </div>
            <Button className="bg-white text-primary-600 hover:bg-primary-50 flex items-center" asChild>
              <Link href="/order" className="flex items-center">
                <Sparkles className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {isRTL ? "הזמן נסח חדש" : "Order New Extract"}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300 group">
          <Link href="/order" className="absolute inset-0 z-10">
            <span className="sr-only">{isRTL ? "הזמן נסח חדש" : "Order New Extract"}</span>
          </Link>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-primary-500/10 p-3 group-hover:bg-primary-500/20 transition-all duration-300">
                <Package className="h-6 w-6 text-primary-500" />
              </div>
              <ChevronRight
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:text-primary-500 ${isRTL ? "rotate-180" : ""}`}
              />
            </div>
            <h3 className="mt-4 font-semibold text-white text-lg">{isRTL ? "הזמן נסח חדש" : "Order New Extract"}</h3>
            <p className="mt-1 text-sm text-gray-400">
              {isRTL ? "הזמן נסח טאבו רשמי" : "Order an official Tabu extract"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300 group">
          <Link href="/my-orders" className="absolute inset-0 z-10">
            <span className="sr-only">{isRTL ? "ההזמנות שלי" : "My Orders"}</span>
          </Link>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-blue-500/10 p-3 group-hover:bg-blue-500/20 transition-all duration-300">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <ChevronRight
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:text-blue-500 ${isRTL ? "rotate-180" : ""}`}
              />
            </div>
            <h3 className="mt-4 font-semibold text-white text-lg">{isRTL ? "ההזמנות שלי" : "My Orders"}</h3>
            <p className="mt-1 text-sm text-gray-400">
              {isRTL ? "צפה בהיסטוריית ההזמנות שלך" : "View your order history"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300 group">
          <Link href="/settings/profile" className="absolute inset-0 z-10">
            <span className="sr-only">{isRTL ? "פרופיל" : "Profile"}</span>
          </Link>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-green-500/10 p-3 group-hover:bg-green-500/20 transition-all duration-300">
                <User className="h-6 w-6 text-green-500" />
              </div>
              <ChevronRight
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:text-green-500 ${isRTL ? "rotate-180" : ""}`}
              />
            </div>
            <h3 className="mt-4 font-semibold text-white text-lg">{isRTL ? "פרופיל" : "Profile"}</h3>
            <p className="mt-1 text-sm text-gray-400">
              {isRTL ? "עדכן את פרטי הפרופיל שלך" : "Update your profile details"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300 group">
          <Link href="/settings/security" className="absolute inset-0 z-10">
            <span className="sr-only">{isRTL ? "אבטחה" : "Security"}</span>
          </Link>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-purple-500/10 p-3 group-hover:bg-purple-500/20 transition-all duration-300">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <ChevronRight
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:text-purple-500 ${isRTL ? "rotate-180" : ""}`}
              />
            </div>
            <h3 className="mt-4 font-semibold text-white text-lg">{isRTL ? "אבטחה" : "Security"}</h3>
            <p className="mt-1 text-sm text-gray-400">
              {isRTL ? "נהל את הגדרות האבטחה שלך" : "Manage your security settings"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{isRTL ? "הזמנות אחרונות" : "Recent Orders"}</h2>
          {orders.length > 0 && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/my-orders">{isRTL ? "צפה בכל ההזמנות" : "View All Orders"}</Link>
            </Button>
          )}
        </div>

        {orders.length === 0 ? (
          <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{isRTL ? "אין הזמנות עדיין" : "No Orders Yet"}</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                {isRTL
                  ? "נראה שאין לך הזמנות עדיין. הזמן את הנסח הראשון שלך כדי להתחיל."
                  : "It looks like you don't have any orders yet. Place your first order to get started."}
              </p>
              <Button
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                asChild
              >
                <Link href="/order">{isRTL ? "הזמן עכשיו" : "Order Now"}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {orders.slice(0, 3).map((order) => {
              const statusInfo = getStatusInfo(order.status)

              return (
                <Card
                  key={order.id}
                  className="border-gray-800 bg-gray-900/80 backdrop-blur-sm hover:border-gray-700 transition-all duration-300"
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-start gap-4">
                        <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-800">
                          <FileText className="h-6 w-6 text-primary-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white text-lg">
                            {isRTL
                              ? `גוש: ${order.block}, חלקה: ${order.parcel}`
                              : `Block: ${order.block}, Parcel: ${order.parcel}`}
                            {order.subparcel &&
                              (isRTL ? `, תת חלקה: ${order.subparcel}` : `, Subparcel: ${order.subparcel}`)}
                          </h3>
                          <div className="mt-1 flex items-center gap-3">
                            <p className="text-sm text-gray-400">
                              {isRTL ? `סוג: ${order.service_type}` : `Type: ${order.service_type}`}
                            </p>
                            <span className="text-gray-500">•</span>
                            <p className="text-sm text-gray-400">
                              {isRTL ? `${formatDate(order.created_at)}` : `${formatDate(order.created_at)}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-auto">
                        <span className={`px-3 py-1 text-xs rounded-full ${statusInfo.color}`}>{statusInfo.text}</span>

                        {order.document_url ? (
                          <Button size="sm" className="bg-primary-500 hover:bg-primary-600" asChild>
                            <a href={order.document_url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                              {isRTL ? "הורד" : "Download"}
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/my-orders/${order.id}`}>{isRTL ? "פרטים" : "Details"}</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {orders.length > 3 && (
              <div className="text-center mt-2">
                <Button variant="link" asChild>
                  <Link href="/my-orders" className="text-primary-400 hover:text-primary-300">
                    {isRTL ? "צפה בכל ההזמנות" : "View all orders"}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats and Info Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">{isRTL ? "סטטיסטיקות" : "Statistics"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-800/50 p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary-500" />
                  <span className="text-sm text-gray-400">{isRTL ? "הזמנות" : "Orders"}</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-4">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-400">{isRTL ? "הורדות" : "Downloads"}</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">
                  {orders.filter((order) => order.document_url).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">{isRTL ? "מידע מהיר" : "Quick Info"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-400">{isRTL ? "אימייל" : "Email"}</span>
                <span className="font-medium text-white">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-400">{isRTL ? "חשבון נוצר" : "Account Created"}</span>
                <span className="font-medium text-white">
                  {formatDate(user.created_at || new Date().toISOString())}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-400">{isRTL ? "סטטוס" : "Status"}</span>
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
                  {isRTL ? "פעיל" : "Active"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">{isRTL ? "קישורים מהירים" : "Quick Links"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/settings/profile">
                  <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {isRTL ? "עדכן פרופיל" : "Update Profile"}
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/settings/security">
                  <Shield className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {isRTL ? "הגדרות אבטחה" : "Security Settings"}
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/settings/notifications">
                  <Bell className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {isRTL ? "העדפות התראות" : "Notification Preferences"}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
