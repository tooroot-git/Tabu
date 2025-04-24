"use client"

import { useLanguage } from "@/context/language-context"
import { Shield, Lock, CheckCircle, Award } from "lucide-react"

export function SecurityBadges() {
  const { isRTL } = useLanguage()

  const badges = [
    {
      icon: <Lock className="h-5 w-5" />,
      titleEn: "256-bit SSL Encryption",
      titleHe: "הצפנת SSL 256-bit",
      descriptionEn: "Your data is secured with bank-level encryption",
      descriptionHe: "המידע שלך מאובטח עם הצפנה ברמת בנק",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      titleEn: "Secure Payments",
      titleHe: "תשלומים מאובטחים",
      descriptionEn: "PCI DSS compliant payment processing",
      descriptionHe: "עיבוד תשלומים תואם PCI DSS",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      titleEn: "Official Documents",
      titleHe: "מסמכים רשמיים",
      descriptionEn: "Certified by the Israeli Land Registry",
      descriptionHe: "מאושרים על ידי רשם המקרקעין הישראלי",
    },
    {
      icon: <Award className="h-5 w-5" />,
      titleEn: "Trusted Service",
      titleHe: "שירות אמין",
      descriptionEn: "Thousands of satisfied customers",
      descriptionHe: "אלפי לקוחות מרוצים",
    },
  ]

  return (
    <div className="w-full py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800 transition-all duration-300 hover:border-primary-500/50 hover:bg-gray-900/70"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-500 mb-3">
                {badge.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{isRTL ? badge.titleHe : badge.titleEn}</h3>
              <p className="text-xs text-gray-400">{isRTL ? badge.descriptionHe : badge.descriptionEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
