"use client"

import { FileText, Shield, Clock } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function HowItWorks() {
  const { language, isRTL } = useLanguage()

  const steps = [
    {
      icon: <FileText className="h-8 w-8" />,
      titleEn: "Enter Property Details",
      titleHe: "הזן פרטי נכס",
      descriptionEn:
        "Provide the Block (Gush), Parcel (Helka), and Sub-parcel (Tat-Helka) numbers or property address.",
      descriptionHe: "הזן את מספרי הגוש, החלקה ותת-החלקה של הנכס או את כתובת הנכס.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      titleEn: "Select Document Type",
      titleHe: "בחר סוג מסמך",
      descriptionEn: "Choose from Regular Extract, Historical Extract, Full Extract, or Document Retrieval.",
      descriptionHe: "בחר מבין נסח רגיל, נסח היסטורי, נסח מלא או אחזור מסמך.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      titleEn: "Pay & Receive Instantly",
      titleHe: "שלם וקבל מיידית",
      descriptionEn: "Complete your payment securely and receive your document instantly via email.",
      descriptionHe: "השלם את התשלום באופן מאובטח וקבל את המסמך שלך מיידית באימייל.",
    },
  ]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-600/10 to-primary-600/10 blur-[120px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            {isRTL ? "איך זה עובד" : "How It Works"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            {isRTL ? "שלושה צעדים פשוטים לקבלת נסח טאבו רשמי" : "Three simple steps to get your official Tabu extract"}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative rounded-xl border border-gray-800 bg-gray-900/80 p-8 transition-all duration-300 hover:border-primary-500/30 hover:bg-gray-900"
            >
              <div className="absolute -top-5 left-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                {index + 1}
              </div>
              <div className="mb-4 mt-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                {step.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{isRTL ? step.titleHe : step.titleEn}</h3>
              <p className="text-gray-400">{isRTL ? step.descriptionHe : step.descriptionEn}</p>
            </div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="mx-auto mt-16 hidden max-w-4xl md:block">
          <div className="relative h-2 rounded-full bg-gray-800">
            <div className="absolute left-0 top-0 h-2 w-1/3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"></div>
            <div className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/4 rounded-full border-2 border-primary-500 bg-gray-900"></div>
            <div className="absolute left-1/3 top-0 h-4 w-4 -translate-y-1/4 rounded-full border-2 border-primary-500 bg-gray-900"></div>
            <div className="absolute left-2/3 top-0 h-4 w-4 -translate-y-1/4 rounded-full border-2 border-primary-500 bg-gray-900"></div>
            <div className="absolute right-0 top-0 h-4 w-4 translate-x-1/2 -translate-y-1/4 rounded-full border-2 border-primary-500 bg-gray-900"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
