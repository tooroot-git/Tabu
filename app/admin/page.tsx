"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, XCircle, BarChart, Users, FileQuestion } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function AdminDashboardPage() {
  const { isRTL } = useLanguage()

  const stats = [
    {
      title: isRTL ? "הזמנות היום" : "Today's Orders",
      value: "24",
      icon: <FileText className="h-5 w-5" />,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: isRTL ? "הזמנות בעיבוד" : "Processing Orders",
      value: "5",
      icon: <Clock className="h-5 w-5" />,
      change: "-3",
      changeType: "neutral",
    },
    {
      title: isRTL ? "משתמשים חדשים" : "New Users",
      value: "18",
      icon: <Users className="h-5 w-5" />,
      change: "+24%",
      changeType: "positive",
    },
    {
      title: isRTL ? "פניות תמיכה" : "Support Tickets",
      value: "7",
      icon: <FileQuestion className="h-5 w-5" />,
      change: "+2",
      changeType: "negative",
    },
  ]

  const recentOrders = [
    {
      id: "12350",
      date: "2023-05-15 14:32",
      customer: "john.doe@example.com",
      type: isRTL ? "נסח היסטורי" : "Historical Extract",
      details: isRTL ? "גוש 6941 חלקה 198" : "Block 6941 Parcel 198",
      status: "completed",
      statusTextEn: "Completed",
      statusTextHe: "הושלם",
    },
    {
      id: "12349",
      date: "2023-05-15 13:45",
      customer: "jane.smith@example.com",
      type: isRTL ? "נסח רגיל" : "Regular Extract",
      details: isRTL ? "גוש 7104 חלקה 42" : "Block 7104 Parcel 42",
      status: "processing",
      statusTextEn: "Processing",
      statusTextHe: "בעיבוד",
    },
    {
      id: "12348",
      date: "2023-05-15 12:18",
      customer: "david.cohen@example.com",
      type: isRTL ? "נסח מלא" : "Full Extract",
      details: isRTL ? "גוש 6574 חלקה 15" : "Block 6574 Parcel 15",
      status: "failed",
      statusTextEn: "Failed",
      statusTextHe: "נכשל",
    },
  ]

  const handleViewAllOrders = () => {
    console.log("View all orders clicked")
    // בהמשך נוסיף כאן ניתוב לדף כל ההזמנות
  }

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{isRTL ? "לוח בקרה" : "Admin Dashboard"}</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <h3 className="mt-1 text-3xl font-bold">{stat.value}</h3>
                    </div>
                    <div className="rounded-full bg-primary-100 p-3 text-primary-600">{stat.icon}</div>
                  </div>
                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : stat.changeType === "negative"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {stat.change}
                      {stat.changeType !== "neutral" && (
                        <span className="ml-1 rtl:mr-1 rtl:ml-0">{stat.changeType === "positive" ? "↑" : "↓"}</span>
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{isRTL ? "הזמנות אחרונות" : "Recent Orders"}</CardTitle>
                <CardDescription>{isRTL ? "הזמנות שהתקבלו היום" : "Orders received today"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <div className="flex items-center">
                          {order.status === "completed" ? (
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500 rtl:ml-2 rtl:mr-0" />
                          ) : order.status === "processing" ? (
                            <Clock className="mr-2 h-4 w-4 text-yellow-500 rtl:ml-2 rtl:mr-0" />
                          ) : (
                            <XCircle className="mr-2 h-4 w-4 text-red-500 rtl:ml-2 rtl:mr-0" />
                          )}
                          <span className="font-medium">{isRTL ? `הזמנה #${order.id}` : `Order #${order.id}`}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">{order.customer}</div>
                        <div className="mt-1 text-sm">
                          {order.type} - {order.details}
                        </div>
                      </div>
                      <div className="text-right rtl:text-left">
                        <div className="text-sm text-gray-500">{order.date}</div>
                        <div
                          className={`mt-1 text-sm ${
                            order.status === "completed"
                              ? "text-green-600"
                              : order.status === "processing"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {isRTL ? order.statusTextHe : order.statusTextEn}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm" onClick={handleViewAllOrders}>
                    {isRTL ? "צפה בכל ההזמנות" : "View All Orders"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "סיכום מכירות" : "Sales Summary"}</CardTitle>
                <CardDescription>{isRTL ? "7 הימים האחרונים" : "Last 7 days"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[200px] items-center justify-center">
                  <BarChart className="h-16 w-16 text-gray-300" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{isRTL ? "סה״כ הזמנות" : "Total Orders"}</span>
                    <span className="font-medium">142</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{isRTL ? "הכנסות" : "Revenue"}</span>
                    <span className="font-medium">₪8,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{isRTL ? "ממוצע להזמנה" : "Average Order"}</span>
                    <span className="font-medium">₪58.06</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
