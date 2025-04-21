"use client"

import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { language, isRTL } = useLanguage()
  const currentYear = new Date().getFullYear()

  const links = [
    { href: "/services", labelEn: "Services", labelHe: "שירותים" },
    { href: "/about", labelEn: "About", labelHe: "אודות" },
    { href: "/terms", labelEn: "Terms of Service", labelHe: "תנאי שימוש" },
    { href: "/privacy", labelEn: "Privacy Policy", labelHe: "מדיניות פרטיות" },
    { href: "/accessibility", labelEn: "Accessibility", labelHe: "נגישות" },
    { href: "/contact", labelEn: "Contact Us", labelHe: "צור קשר" },
  ]

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-3 ${isRTL ? "text-right" : "text-left"}`}>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{isRTL ? "טאבו.נט.איל" : "Tabu.net.il"}</h3>
            <p className="mt-2 text-sm text-gray-600">
              {isRTL
                ? "הדרך המהירה והבטוחה להזמין נסחי טאבו רשמיים באופן מקוון"
                : "The fast and secure way to order official land registry documents online"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">{isRTL ? "קישורים מהירים" : "Quick Links"}</h3>
            <ul className={`mt-2 space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-primary-600">
                    {isRTL ? link.labelHe : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">{isRTL ? "צור קשר" : "Contact Us"}</h3>
            <ul className={`mt-2 space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
              <li className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> support@tabu.net.il
              </li>
              <li className="text-sm text-gray-600">
                <span className="font-medium">{isRTL ? "טלפון:" : "Phone:"}</span> +972-3-123-4567
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-600 ${isRTL ? "text-right" : "text-left"}`}
        >
          <p>
            &copy; {currentYear} Tabu.net.il. {isRTL ? "כל הזכויות שמורות" : "All rights reserved"}.
          </p>
        </div>
      </div>
    </footer>
  )
}
