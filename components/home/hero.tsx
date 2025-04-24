"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { QuickOrder } from "./quick-order"

export function Hero() {
  const { isRTL } = useLanguage()
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-primary-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-secondary-500/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Hero content */}
          <div className={`text-center lg:text-${isRTL ? "right" : "left"}`}>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {isRTL ? (
                <>
                  <span className="text-primary-500">נסח טאבו רשמי</span>
                  <br />
                  תוך דקות בלבד
                </>
              ) : (
                <>
                  <span className="text-primary-500">Official Land Registry</span>
                  <br />
                  in Minutes
                </>
              )}
            </h1>

            <p className="mb-8 text-lg text-gray-300 md:text-xl">
              {isRTL
                ? "הזמן נסח טאבו רשמי ומעודכן באופן מקוון, מאובטח ומהיר. קבל את המסמך הדיגיטלי ישירות למייל."
                : "Order official and up-to-date Israeli Land Registry documents online, securely and quickly. Get your digital document delivered directly to your email."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="group w-full bg-gradient-to-r from-primary-500 to-primary-600 sm:w-auto"
              >
                <Link href="/order" className="flex items-center whitespace-nowrap">
                  <span>{isRTL ? "הזמן נסח טאבו" : "Order Land Registry"}</span>
                  <ArrowIcon
                    className={`h-4 w-4 transition-transform ${isRTL ? "mr-2" : "ml-2"} group-hover:translate-x-1`}
                  />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white sm:w-auto"
              >
                <Link href="/services">{isRTL ? "השירותים שלנו" : "Our Services"}</Link>
              </Button>
            </div>
          </div>

          {/* Quick order form */}
          <div className="mx-auto w-full max-w-md lg:mx-0">
            <QuickOrder />
          </div>
        </div>
      </div>
    </section>
  )
}
