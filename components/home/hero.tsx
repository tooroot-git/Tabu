"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { QuickOrder } from "./quick-order"

export function Hero() {
  const { isRTL } = useLanguage()

  // Direction-aware arrow icon
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section className="relative min-h-[85vh] flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-700/20 blur-[120px]"></div>
        <div className="absolute top-[20%] right-[5%] h-[400px] w-[700px] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          <div
            className={`text-center md:text-left ${isRTL ? "md:text-right order-2 md:order-1" : "order-2 md:order-1"}`}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              <span className="block text-primary-500">{isRTL ? "נסח טאבו רשמי" : "Official Land Registry"}</span>
              <span className="block">{isRTL ? "תוך דקות בלבד" : "Documents in Minutes"}</span>
            </h1>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl max-w-md mx-auto md:mx-0">
              {isRTL
                ? "הזמן נסח טאבו רשמי ומעודכן באופן מקוון, מאובטח ומהיר. קבל את המסמך הדיגיטלי ישירות למייל."
                : "Order official and up-to-date land registry extracts online, securely and quickly. Get the digital document sent directly to your email."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/20 min-w-[180px]"
                rightIcon={<ArrowIcon className="h-5 w-5" />}
                asChild
              >
                <Link href="/order">{isRTL ? "הזמן נסח טאבו" : "Order Land Extract"}</Link>
              </Button>
              <Button size="lg" variant="white" className="min-w-[180px]" asChild>
                <Link href="/services">{isRTL ? "השירותים שלנו" : "Our Services"}</Link>
              </Button>
            </div>
          </div>

          <div className={`flex justify-center ${isRTL ? "order-1 md:order-2" : "order-1 md:order-2"}`}>
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-500 to-purple-600 opacity-20 blur-xl"></div>
              <QuickOrder />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full py-4 text-center text-xs text-gray-500">
        ב-TabuIsrael, המשימה שלנו היא להפוך את תהליך השגת מסמכי רישום מקרקעין רשמיים לפשוט, מהיר ונגיש לכולם.
      </div>
    </section>
  )
}
