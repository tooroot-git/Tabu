"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/context/language-context"
import { usePathname } from "next/navigation"
import { AuthButton } from "@/components/auth/auth-button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Header() {
  const { language, setLanguage, isRTL } = useLanguage()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // בדיקה אם המשתמש גלל למטה
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-500">TabuIsrael.co.il</span>
          </Link>
        </div>

        {/* תפריט למסכים גדולים */}
        <div className={`hidden md:flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
          <nav className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/services") ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
              }`}
            >
              {isRTL ? "שירותים" : "Services"}
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/about") ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
              }`}
            >
              {isRTL ? "אודות" : "About"}
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/faq") ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
              }`}
            >
              {isRTL ? "שאלות נפוצות" : "FAQ"}
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/contact") ? "text-primary-500" : "text-gray-300 hover:text-primary-400"
              }`}
            >
              {isRTL ? "צור קשר" : "Contact"}
            </Link>
          </nav>

          <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
          <AuthButton />

          <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white" asChild>
            <Link href="/order">{isRTL ? "התחל הזמנה" : "Start Order"}</Link>
          </Button>
        </div>

        {/* כפתור תפריט למובייל */}
        <div className="md:hidden flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* תפריט מובייל */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className={`flex flex-col gap-4 ${isRTL ? "text-right" : "text-left"}`}>
              <Link
                href="/services"
                className={`text-sm font-medium p-2 rounded-md ${
                  pathname.startsWith("/services")
                    ? "bg-primary-500/20 text-primary-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-primary-400"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isRTL ? "שירותים" : "Services"}
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium p-2 rounded-md ${
                  pathname.startsWith("/about")
                    ? "bg-primary-500/20 text-primary-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-primary-400"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isRTL ? "אודות" : "About"}
              </Link>
              <Link
                href="/faq"
                className={`text-sm font-medium p-2 rounded-md ${
                  pathname.startsWith("/faq")
                    ? "bg-primary-500/20 text-primary-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-primary-400"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isRTL ? "שאלות נפוצות" : "FAQ"}
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium p-2 rounded-md ${
                  pathname.startsWith("/contact")
                    ? "bg-primary-500/20 text-primary-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-primary-400"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isRTL ? "צור קשר" : "Contact"}
              </Link>
            </nav>

            <div className="mt-4 flex flex-col gap-4">
              <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
              <AuthButton />
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white" asChild>
                <Link href="/order" onClick={() => setIsMobileMenuOpen(false)}>
                  {isRTL ? "התחל הזמנה" : "Start Order"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
