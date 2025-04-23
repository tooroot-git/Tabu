"use client"

import { useLanguage } from "@/context/language-context"
import { CheckCircle } from "lucide-react"

export function Testimonials() {
  const { language, isRTL } = useLanguage()

  const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Official & Legally Valid",
      titleHe: "רשמי ותקף משפטית",
      descriptionEn: "All documents are official extracts from the Israel Land Registry with full legal validity.",
      descriptionHe: "כל המסמכים הם נסחים רשמיים מרשם המקרקעין בישראל עם תוקף משפטי מלא.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Instant Delivery",
      titleHe: "משלוח מיידי",
      descriptionEn: "Receive your documents instantly via email after payment, no waiting required.",
      descriptionHe: "קבל את המסמכים שלך מיידית באימייל לאחר התשלום, ללא צורך בהמתנה.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Bank-Level Security",
      titleHe: "אבטחה ברמה בנקאית",
      descriptionEn: "Your data is encrypted and protected with the highest security standards.",
      descriptionHe: "המידע שלך מוצפן ומוגן בסטנדרטים הגבוהים ביותר של אבטחה.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "24/7 Availability",
      titleHe: "זמינות 24/7",
      descriptionEn: "Order documents any time, day or night, from anywhere.",
      descriptionHe: "הזמן מסמכים בכל זמן, יום או לילה, מכל מקום.",
    },
  ]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] right-[20%] h-[400px] w-[600px] rounded-full bg-gradient-to-l from-primary-500/10 to-blue-500/10 blur-[120px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            {isRTL ? "למה להשתמש בשירות שלנו" : "Why Use Our Service"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            {isRTL
              ? "הפלטפורמה המהירה והבטוחה ביותר להזמנת נסחי טאבו"
              : "The fastest and most secure platform for ordering Tabu extracts"}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-gray-800 bg-gray-900/80 p-8 transition-all duration-300 hover:border-primary-500/50 hover:bg-gray-900 hover:shadow-lg hover:shadow-primary-500/5"
            >
              <div className="absolute -inset-px z-0 rounded-xl bg-gradient-to-br from-primary-500/20 via-transparent to-transparent opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 transition-all duration-300 group-hover:bg-primary-500/20">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{isRTL ? benefit.titleHe : benefit.titleEn}</h3>
                <p className="text-gray-400">{isRTL ? benefit.descriptionHe : benefit.descriptionEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
