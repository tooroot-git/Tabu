"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { motion } from "framer-motion"

export function Hero() {
  const { isRTL } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black to-gray-900 pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <OptimizedImage
          src="/tech-pattern.png"
          alt="רקע טכנולוגי דיגיטלי לשירות נסח טאבו אונליין"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Text Content */}
          <div className={`text-center md:text-${isRTL ? "right" : "left"}`}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {isRTL ? "נסח טאבו רשמי" : "Official Land Registry"} <br />
                <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  {isRTL ? "תוך דקות בלבד" : "In Just Minutes"}
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-300">
                {isRTL
                  ? "הזמן נסח טאבו דיגיטלי באופן מקוון, מהיר ומאובטח. קבל את המסמך הרשמי ישירות למייל תוך דקות."
                  : "Order a digital land registry extract online, quickly and securely. Get the official document delivered directly to your email within minutes."}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
                <Button size="lg" className="min-w-[180px] bg-primary-500 text-white hover:bg-primary-600" asChild>
                  <Link href="/order">{isRTL ? "הזמן נסח טאבו עכשיו" : "Order Extract Now"}</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[180px] border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  asChild
                >
                  <Link href="/services">{isRTL ? "השירותים שלנו" : "Our Services"}</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary-500 to-purple-600 opacity-75 blur-lg"></div>
              <div className="relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-2xl">
                <OptimizedImage
                  src="/stylized-payment-network.png"
                  alt="מערכת נסח טאבו דיגיטלית מאובטחת"
                  width={600}
                  height={400}
                  className="w-full"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div>
              <div className="text-3xl font-bold text-primary-500">100%</div>
              <div className="mt-2 text-sm text-gray-400">{isRTL ? "מסמכים רשמיים" : "Official Documents"}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">{isRTL ? "דקות" : "Minutes"}</div>
              <div className="mt-2 text-sm text-gray-400">{isRTL ? "זמן קבלת המסמך" : "Document Delivery"}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">{isRTL ? "מאובטח" : "Secure"}</div>
              <div className="mt-2 text-sm text-gray-400">{isRTL ? "תשלום מוגן SSL" : "SSL Protected Payment"}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">24/7</div>
              <div className="mt-2 text-sm text-gray-400">{isRTL ? "שירות זמין" : "Available Service"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
