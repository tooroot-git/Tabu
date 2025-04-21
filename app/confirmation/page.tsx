"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertSuccess } from "@/components/ui/alert"
import { Download, Mail, FileText } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function ConfirmationPage() {
  const { language, isRTL } = useLanguage()
  const searchParams = useSearchParams()

  const block = searchParams.get("block") || ""
  const parcel = searchParams.get("parcel") || ""
  const subparcel = searchParams.get("subparcel") || ""
  const service = searchParams.get("service") || "regular"

  const getServiceDetails = () => {
    switch (service) {
      case "regular":
        return {
          titleEn: "Regular Extract",
          titleHe: "נסח רגיל",
        }
      case "concentrated":
        return {
          titleEn: "Concentrated Extract",
          titleHe: "נסח מרוכז",
        }
      case "historical":
        return {
          titleEn: "Historical Extract",
          titleHe: "נסח היסטורי",
        }
      case "by-address":
        return {
          titleEn: "Extract by Address",
          titleHe: "נסח לפי כתובת",
        }
      case "property-report":
        return {
          titleEn: "Property Report by ID",
          titleHe: "דוח נכסים לפי ת.ז",
        }
      default:
        return {
          titleEn: "Regular Extract",
          titleHe: "נסח רגיל",
        }
    }
  }

  const serviceDetails = getServiceDetails()
  const orderNumber = Math.floor(10000 + Math.random() * 90000)

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {isRTL ? "תודה על הזמנתך!" : "Thank You for Your Order!"}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {isRTL
              ? "הזמנתך התקבלה בהצלחה והמסמך שלך מוכן להורדה"
              : "Your order has been successfully processed and your document is ready for download"}
          </p>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{isRTL ? "פרטי הזמנה" : "Order Details"}</CardTitle>
              <CardDescription>
                {isRTL ? `מספר הזמנה: #${orderNumber}` : `Order Number: #${orderNumber}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertSuccess
                title={isRTL ? "המסמך שלך מוכן" : "Your Document is Ready"}
                description={
                  isRTL
                    ? "המסמך שלך נשלח גם לכתובת האימייל שסיפקת"
                    : "Your document has also been sent to the email address you provided"
                }
                className="mb-6"
              />

              <div className="rounded-lg border bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <FileText className="h-8 w-8 text-primary-600" />
                    <div>
                      <h3 className="font-medium">
                        {isRTL
                          ? `${serviceDetails.titleHe} - גוש ${block} חלקה ${parcel}${subparcel ? ` תת-חלקה ${subparcel}` : ""}`
                          : `${serviceDetails.titleEn} - Block ${block} Parcel ${parcel}${subparcel ? ` Sub-parcel ${subparcel}` : ""}`}
                      </h3>
                      <p className="text-sm text-gray-500">PDF, 2.4 MB</p>
                    </div>
                  </div>
                  <Button size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    {isRTL ? "הורד" : "Download"}
                  </Button>
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <FileText className="h-8 w-8 text-primary-600" />
                    <div>
                      <h3 className="font-medium">{isRTL ? "חשבונית מס" : "Tax Invoice"}</h3>
                      <p className="text-sm text-gray-500">PDF, 0.8 MB</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Download className="h-4 w-4" />
                    {isRTL ? "הורד" : "Download"}
                  </Button>
                </div>
              </div>

              <div className="mt-8 flex flex-col space-y-4">
                <Button className="gap-2">
                  <Mail className="h-4 w-4" />
                  {isRTL ? "שלח שוב למייל" : "Resend to Email"}
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/order">{isRTL ? "הזמן נסח נוסף" : "Order Another Extract"}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
