"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { QuickOrder } from "./quick-order"

export function HeroSection() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-[url('/abstract-pattern.png')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Text */}
          <div className={`lg:col-span-7 ${isRTL ? "order-1 lg:order-1 text-right" : "order-1 lg:order-1 text-left"}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              <span className="block">{isRTL ? "נסח טאבו רשמי" : "Official Land Registry"}</span>
              <span className="block text-primary-500 mt-2">{isRTL ? "תוך דקות בלבד" : "Within Minutes"}</span>
            </h1>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl">
              {isRTL
                ? "הזמן נסח טאבו דיגיטלי באופן מקוון, מהיר ומאובטח. קבל את המסמך הרשמי ישירות למייל תוך דקות."
                : "Order digital land registry extracts online, quickly and securely. Receive the official document directly to your email within minutes."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 text-lg rounded-lg flex items-center"
                onClick={() => router.push("/order")}
              >
                <span className="mr-2">{isRTL ? "הזמן נסח טאבו עכשיו" : "Order Land Registry Now"}</span>
                <ArrowIcon className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg rounded-lg"
                onClick={() => router.push("/services")}
              >
                {isRTL ? "השירותים שלנו" : "Our Services"}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary-500 mb-2">100%</div>
                <div className="text-gray-300">{isRTL ? "מסמכים רשמיים" : "Official Documents"}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary-500 mb-2">{isRTL ? "מהיר" : "Fast"}</div>
                <div className="text-gray-300">{isRTL ? "קבלה תוך דקות ספורות" : "Delivery in minutes"}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary-500 mb-2">{isRTL ? "מאובטח" : "Secure"}</div>
                <div className="text-gray-300">{isRTL ? "תשלום מוגן SSL" : "SSL Protected Payment"}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary-500 mb-2">24/7</div>
                <div className="text-gray-300">{isRTL ? "שירות זמין תמיד" : "Always available"}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Order Form */}
          <div className={`lg:col-span-5 ${isRTL ? "order-2 lg:order-2" : "order-2 lg:order-2"}`}>
            <div className="flex justify-center lg:justify-end lg:-mt-16">
              <QuickOrder />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
