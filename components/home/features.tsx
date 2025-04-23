"use client"

import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Features() {
  const { language, isRTL } = useLanguage()

  return (
    <section className="relative py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div className={`${isRTL ? "md:order-2" : "md:order-1"}`}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-500 to-blue-600 opacity-30 blur-lg"></div>
              <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D7%A0%D7%A1%D7%97-%D7%98%D7%90%D7%91%D7%95-%D7%9C%D7%93%D7%95%D7%92%D7%9E%D7%90-%D7%95%D7%94%D7%A1%D7%91%D7%A8%D7%99%D7%9D-1466435373.jpg-qbksRvPQlu2qsx8xwbZ4Bzg8rKoj8G.jpeg"
                  alt={isRTL ? "דוגמה לנסח טאבו" : "Sample Tabu Extract"}
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
              </div>
            </div>
          </div>
          <div className={`${isRTL ? "md:order-1 text-right" : "md:order-2 text-left"}`}>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {isRTL ? "נסח טאבו רשמי ומאובטח" : "Official & Secure Tabu Extract"}
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              {isRTL
                ? "נסח טאבו הוא מסמך רשמי המספק מידע מקיף על נכס מקרקעין. הוא כולל פרטים על הבעלות, זכויות, משכנתאות, שעבודים ומידע משפטי נוסף."
                : "A Tabu Extract is an official document providing comprehensive information about a real estate property. It includes details about ownership, rights, mortgages, liens, and other legal information."}
            </p>
            <ul className="mt-6 space-y-4">
              {[
                isRTL ? "מידע מלא על בעלות הנכס" : "Complete property ownership information",
                isRTL ? "פרטים על משכנתאות ושעבודים" : "Details about mortgages and liens",
                isRTL ? "מידע על זכויות וחובות" : "Information about rights and obligations",
                isRTL ? "חתימה דיגיטלית רשמית" : "Official digital signature",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className={`${isRTL ? "ml-2" : "mr-2"} h-5 w-5 text-primary-500`} />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                asChild
              >
                <Link href="/services">{isRTL ? "גלה את כל השירותים שלנו" : "Discover All Our Services"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
