"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Search, FileText, Clock, CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

export default function MyOrdersPage() {
  const { language, isRTL } = useLanguage()

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
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {orders.map((order) => (
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
