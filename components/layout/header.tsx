"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/context/language-context"
import { usePathname } from "next/navigation"

export function Header() {
  const { language, setLanguage, isRTL } = useLanguage()
  const pathname = usePathname()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-600">Tabu.net.il</span>
          </Link>
        </div>

        <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />

          <nav className={`hidden md:flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link
              href="/services"
              className={`text-sm font-medium ${pathname.startsWith("/services") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"}`}
            >
              {isRTL ? "שירותים" : "Services"}
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${pathname.startsWith("/about") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"}`}
            >
              {isRTL ? "אודות" : "About"}
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-medium ${pathname.startsWith("/faq") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"}`}
            >
              {isRTL ? "שאלות נפוצות" : "FAQ"}
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${pathname.startsWith("/contact") ? "text-primary-600" : "text-gray-700 hover:text-primary-600"}`}
            >
              {isRTL ? "צור קשר" : "Contact"}
            </Link>
          </nav>

          <Button size="sm" variant="default" asChild>
            <Link href="/order">{isRTL ? "התחל הזמנה" : "Start Order"}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
