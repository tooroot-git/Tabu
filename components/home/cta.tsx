"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Shield, Clock, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  const { language, isRTL } = useLanguage()

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-blue-600/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-primary-500/20 bg-gradient-to-b from-gray-900 to-gray-900/95 p-12 text-center shadow-xl shadow-primary-500/5 backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {isRTL ? "מוכן להזמין נסח טאבו?" : "Ready to Order Your Tabu Extract?"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
            {isRTL
              ? "קבל את המסמך שלך תוך דקות, ישירות למייל"
              : "Get your document in minutes, delivered straight to your email"}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 py-6 text-lg font-medium text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20 sm:w-auto"
              asChild
            >
              <Link href="/order" className="inline-flex items-center">
                {isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-gray-700 py-6 text-lg font-medium text-white hover:bg-gray-800 sm:w-auto"
              asChild
            >
              <Link href="/contact">{isRTL ? "צור קשר לייעוץ" : "Contact for Advice"}</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="h-5 w-5 text-primary-500" />
              <span>{isRTL ? "מאובטח ב-256 ביט SSL" : "Secured with 256-bit SSL"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="h-5 w-5 text-primary-500" />
              <span>{isRTL ? "משלוח מיידי" : "Instant Delivery"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <CheckCircle className="h-5 w-5 text-primary-500" />
              <span>{isRTL ? "100% מסמכים רשמיים" : "100% Official Documents"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
