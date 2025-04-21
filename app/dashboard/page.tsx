"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Clock, CheckCircle, User, Settings, CreditCard } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
// import { useUser } from "@auth0/nextjs-auth0/client"

export default function DashboardPage() {
  const { isRTL } = useLanguage()
  const [user, setUser] = useState<any>(null)

  // מוק לבדיקת משתמש בסביבת התצוגה המקדימה
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("mock_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  // Mock data for user orders - בהמשך זה יוחלף בנתונים אמיתיים מהשרת
  const orders = [
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

            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {isRTL ? "ההזמנות שלי" : "My Orders"}
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {isRTL ? "פרופיל" : "Profile"}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {isRTL ? "הגדרות" : "Settings"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? "ההזמנות שלי" : "My Orders"}</CardTitle>
                    <CardDescription>
                      {isRTL ? "צפה בהיסטוריית ההזמנות שלך ונהל אותן" : "View and manage your order history"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                            <div>
                              <div className="flex items-center">
                                {order.status === "completed" ? (
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 rtl:ml-2 rtl:mr-0" />
                                ) : (
                                  <Clock className="mr-2 h-4 w-4 text-yellow-500 rtl:ml-2 rtl:mr-0" />
                                )}
                                <span className="font-medium">
                                  {isRTL ? `הזמנה #${order.id}` : `Order #${order.id}`}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-gray-500">
                                {new Date(order.date).toLocaleDateString(isRTL ? "he-IL" : "en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="mt-1 text-sm">
                                {order.type} - {order.details}
                              </div>
                            </div>
                            <div className="text-right rtl:text-left">
                              <div
                                className={`text-sm ${
                                  order.status === "completed" ? "text-green-600" : "text-yellow-600"
                                }`}
                              >
                                {isRTL ? order.statusTextHe : order.statusTextEn}
                              </div>
                              {order.status === "completed" && (
                                <Button size="sm" variant="outline" className="mt-2 gap-1">
                                  <Download className="h-4 w-4" />
                                  {isRTL ? "הורד" : "Download"}
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium">{isRTL ? "אין לך הזמנות עדיין" : "No orders yet"}</h3>
                        <p className="mt-2 text-gray-500">
                          {isRTL ? "הזמנות שתבצע יופיעו כאן" : "Orders you place will appear here"}
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/order">{isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? "פרופיל" : "Profile"}</CardTitle>
                    <CardDescription>
                      {isRTL ? "צפה ועדכן את פרטי הפרופיל שלך" : "View and update your profile information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="flex-shrink-0">
                        {user?.picture ? (
                          <div className="relative h-32 w-32 rounded-full overflow-hidden">
                            <img
                              src={user.picture || "/placeholder.svg?height=100&width=100&query=user"}
                              alt={user.name || "Profile"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                            <User className="h-16 w-16" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">{isRTL ? "שם" : "Name"}</h3>
                          <p className="mt-1">{user?.name || "משתמש לדוגמה"}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">{isRTL ? "אימייל" : "Email"}</h3>
                          <p className="mt-1">{user?.email || "user@example.com"}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            {isRTL ? "חשבון נוצר" : "Account Created"}
                          </h3>
                          <p className="mt-1">
                            {user?.updated_at
                              ? new Date(user.updated_at).toLocaleDateString(isRTL ? "he-IL" : "en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : new Date().toLocaleDateString(isRTL ? "he-IL" : "en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? "הגדרות" : "Settings"}</CardTitle>
                    <CardDescription>
                      {isRTL ? "נהל את העדפות החשבון שלך" : "Manage your account preferences"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">{isRTL ? "אמצעי תשלום" : "Payment Methods"}</h3>
                        <div className="mt-4 rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CreditCard className="h-8 w-8 text-gray-400" />
                              <div className="ml-4 rtl:mr-4 rtl:ml-0">
                                <p className="font-medium">{isRTL ? "הוסף אמצעי תשלום" : "Add Payment Method"}</p>
                                <p className="text-sm text-gray-500">
                                  {isRTL
                                    ? "שמור אמצעי תשלום לרכישות מהירות יותר"
                                    : "Save payment methods for faster checkout"}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline">{isRTL ? "הוסף" : "Add"}</Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">{isRTL ? "העדפות התראות" : "Notification Preferences"}</h3>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <label htmlFor="email-notifications" className="flex items-center">
                              <span>{isRTL ? "התראות אימייל" : "Email Notifications"}</span>
                            </label>
                            <input
                              type="checkbox"
                              id="email-notifications"
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              defaultChecked
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="order-updates" className="flex items-center">
                              <span>{isRTL ? "עדכוני הזמנות" : "Order Updates"}</span>
                            </label>
                            <input
                              type="checkbox"
                              id="order-updates"
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              defaultChecked
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="marketing" className="flex items-center">
                              <span>{isRTL ? "הודעות שיווקיות" : "Marketing Communications"}</span>
                            </label>
                            <input
                              type="checkbox"
                              id="marketing"
                              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <Button variant="destructive">{isRTL ? "מחק חשבון" : "Delete Account"}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
