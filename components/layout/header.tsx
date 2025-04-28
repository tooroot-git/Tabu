"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { Logo } from "@/components/ui/logo"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { Menu, X, User, ChevronDown, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, isRTL } = useLanguage()
  const { user, signOut, isLoading } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  const navLinks = [
    { href: "/", label: isRTL ? "דף הבית" : "Home" },
    { href: "/services", label: isRTL ? "שירותים" : "Services" },
    { href: "/about", label: isRTL ? "אודות" : "About" },
    { href: "/contact", label: isRTL ? "צור קשר" : "Contact" },
    { href: "/faq", label: isRTL ? "שאלות נפוצות" : "FAQ" },
  ]

  const userNavLinks = [
    { href: "/dashboard", label: isRTL ? "לוח בקרה" : "Dashboard" },
    { href: "/my-orders", label: isRTL ? "ההזמנות שלי" : "My Orders" },
    { href: "/profile", label: isRTL ? "פרופיל" : "Profile" },
    { href: "/settings", label: isRTL ? "הגדרות" : "Settings" },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-[#0A0E17]/95 backdrop-blur-md shadow-md" : "bg-[#0A0E17]/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo linkWrapper={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white bg-[#1A1F2E] border border-[#2A3042]"
                    : "text-gray-300 hover:text-white hover:bg-[#1A1F2E] hover:border hover:border-[#2A3042]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side - Auth & Language */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Auth Buttons */}
            {!isLoading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-1 rtl:space-x-reverse rounded-md bg-[#1A1F2E] border border-[#2A3042] px-3 py-2 text-sm font-medium text-white hover:bg-[#232A3F] transition-colors"
                      aria-expanded={isUserMenuOpen}
                      aria-haspopup="true"
                    >
                      <User className="h-4 w-4 mr-1.5 rtl:mr-0 rtl:ml-1.5" />
                      <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-48 rounded-md bg-[#1A1F2E] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-[#2A3042]">
                        <div className="py-1">
                          {userNavLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#232A3F]"
                            >
                              {link.label}
                            </Link>
                          ))}
                          <button
                            onClick={() => signOut()}
                            className="block w-full text-start px-4 py-2 text-sm text-gray-200 hover:bg-[#232A3F]"
                          >
                            {isRTL ? "התנתקות" : "Sign Out"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hidden sm:block">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#F05A28] to-[#E04A18] hover:from-[#E04A18] hover:to-[#D03A08] text-white border-none shadow-lg rounded-md px-4 py-2 font-medium"
                    >
                      <Link href="/login">{isRTL ? "התחברות / הרשמה" : "Login / Register"}</Link>
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#1A1F2E] border border-transparent hover:border-[#2A3042] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-[#2A3042]">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.href
                      ? "text-white bg-[#1A1F2E] border border-[#2A3042]"
                      : "text-gray-300 hover:text-white hover:bg-[#1A1F2E] hover:border hover:border-[#2A3042]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <div className="flex flex-col space-y-2 pt-2 border-t border-[#2A3042] mt-2">
                  <Link
                    href="/login"
                    className="rounded-md bg-gradient-to-r from-[#F05A28] to-[#E04A18] px-3 py-2 text-base font-medium text-white hover:from-[#E04A18] hover:to-[#D03A08] transition-colors text-center flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <LogIn className="h-4 w-4" />
                    {isRTL ? "התחברות / הרשמה" : "Login / Register"}
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
