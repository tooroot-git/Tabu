"use client"

import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { Mail, FileText, Info, HelpCircle, Shield, Heart } from "lucide-react"

export function Footer() {
  const { isRTL } = useLanguage()
  const currentYear = new Date().getFullYear()

  const links = [
    {
      href: "/services",
      labelEn: "Services",
      labelHe: "שירותים",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      href: "/about",
      labelEn: "About",
      labelHe: "אודות",
      icon: <Info className="h-4 w-4" />,
    },
    {
      href: "/faq",
      labelEn: "FAQ",
      labelHe: "שאלות נפוצות",
      icon: <HelpCircle className="h-4 w-4" />,
    },
    {
      href: "/terms",
      labelEn: "Terms of Service",
      labelHe: "תנאי שימוש",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      href: "/privacy",
      labelEn: "Privacy Policy",
      labelHe: "מדיניות פרטיות",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      href: "/accessibility",
      labelEn: "Accessibility",
      labelHe: "נגישות",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      href: "/contact",
      labelEn: "Contact Us",
      labelHe: "צור קשר",
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-primary-500" />,
      textEn: "support@tabuisrael.co.il",
      textHe: "support@tabuisrael.co.il",
      href: "mailto:support@tabuisrael.co.il",
    },
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 ${isRTL ? "text-right" : "text-left"}`}>
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              <Link href="/" className="text-xl font-bold text-primary-500">
                TabuIsrael.co.il
              </Link>
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              {isRTL
                ? "הדרך המהירה והבטוחה להזמין נסחי טאבו רשמיים באופן מקוון"
                : "The fast and secure way to order official land registry documents online"}
            </p>

            <div className="flex mt-4 space-x-4 rtl:space-x-reverse">
              {/* Social icons would go here */}
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{isRTL ? "קישורים מהירים" : "Quick Links"}</h3>
            <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
              {links.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                  >
                    <span className={`${isRTL ? "ml-2" : "mr-2"}`}>{link.icon}</span>
                    {isRTL ? link.labelHe : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{isRTL ? "מידע חוקי" : "Legal"}</h3>
            <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
              {links.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center"
                  >
                    <span className={`${isRTL ? "ml-2" : "mr-2"}`}>{link.icon}</span>
                    {isRTL ? link.labelHe : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{isRTL ? "צור קשר" : "Contact Us"}</h3>
            <ul className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center text-sm text-gray-400">
                  <span className={`flex-shrink-0 ${isRTL ? "ml-3" : "mr-3"}`}>{item.icon}</span>
                  <a href={item.href} className="hover:text-primary-400 transition-colors">
                    {isRTL ? item.textHe : item.textEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-8 border-t border-gray-800 pt-6 text-center text-sm text-gray-500`}>
          <p>
            {isRTL
              ? `© ${currentYear} Open Source Intelligence LLC. כל הזכויות שמורות.`
              : `© ${currentYear} Open Source Intelligence LLC. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
