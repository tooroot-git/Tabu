"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { Menu, X } from "lucide-react"

// The component was defined but not properly exported
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { isRTL, toggleLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: isRTL ? "צור קשר" : "Contact", href: "/contact" },
    { name: isRTL ? "שאלות נפוצות" : "FAQ", href: "/faq" },
    { name: isRTL ? "אודות" : "About", href: "/about" },
    { name: isRTL ? "שירותים" : "Services", href: "/services" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-gray-900/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Right side in RTL, Left side in LTR */}
          <div className={`order-${isRTL ? "last" : "first"}`}>
            <Logo size="lg" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === item.href
                    ? "text-primary-500 bg-gray-800/50"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-md"
            >
              {isRTL ? "English" : "עברית"}
            </Button>
            <Button variant="default" className="ml-4 rtl:mr-4 rtl:ml-0 bg-primary-500 hover:bg-primary-600" asChild>
              <Link href="/login">{isRTL ? "התחבר" : "Login"}</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-base font-medium rounded-md ${
                  pathname === item.href
                    ? "text-primary-500 bg-gray-800/50"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              onClick={() => {
                toggleLanguage()
                setIsMenuOpen(false)
              }}
              className="w-full justify-start px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-md"
            >
              {isRTL ? "English" : "עברית"}
            </Button>
            <div className="pt-2">
              <Button
                variant="default"
                className="w-full bg-primary-500 hover:bg-primary-600"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/login">{isRTL ? "התחבר" : "Login"}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// Add a default export as well to ensure compatibility with both import styles
export default Header
