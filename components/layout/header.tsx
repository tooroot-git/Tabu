"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/context/language-context"
import { usePathname } from "next/navigation"
import { AuthButton } from "@/components/auth/auth-button"
import { Menu, X, Home, FileText, HelpCircle, Info, Mail, LayoutDashboard } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Logo } from "@/components/ui/logo"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function Header() {
  const { language, isRTL } = useLanguage()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const supabase = createClientComponentClient()

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)
    }

    checkAuth()

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Add event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check (for page refreshes already scrolled down)
    handleScroll()

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileMenuOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Navigation items
  const navItems = [
    {
      href: "/services",
      labelEn: "Services",
      labelHe: "שירותים",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/about",
      labelEn: "About",
      labelHe: "אודות",
      icon: <Info className="h-5 w-5" />,
    },
    {
      href: "/faq",
      labelEn: "FAQ",
      labelHe: "שאלות נפוצות",
      icon: <HelpCircle className="h-5 w-5" />,
    },
    {
      href: "/contact",
      labelEn: "Contact",
      labelHe: "צור קשר",
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  // Add dashboard link for logged-in users
  const allNavItems = isLoggedIn
    ? [
        ...navItems,
        {
          href: "/dashboard",
          labelEn: "Dashboard",
          labelHe: "לוח בקרה",
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
      ]
    : navItems

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      role="banner"
      aria-label={isRTL ? "ניווט ראשי" : "Main navigation"}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className={isRTL ? "order-last" : "order-first"}>
          <Logo />
        </div>

        {/* Desktop menu */}
        <div className={`hidden md:flex items-center gap-4 ${isRTL ? "order-first" : "order-last"}`}>
          {/* Start Order Button - Only in Hebrew */}
          {isRTL && (
            <Button
              size="sm"
              className="bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/order">
                <span className="btn-text-fix">התחל הזמנה</span>
              </Link>
            </Button>
          )}

          {/* Navigation Links */}
          <nav
            className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
            aria-label={isRTL ? "ניווט ראשי" : "Main navigation"}
          >
            {allNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 rounded-md px-3 py-2 ${
                  pathname?.startsWith(item.href)
                    ? "text-primary-500 bg-primary-500/10"
                    : "text-gray-300 hover:text-primary-400 hover:bg-gray-800/50"
                }`}
              >
                {isRTL ? item.labelHe : item.labelEn}
              </Link>
            ))}
          </nav>

          {/* Auth and Language */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLanguage={language} />
            <AuthButton />

            {/* Start Order Button - Only in English */}
            {!isRTL && (
              <Button
                size="sm"
                className="bg-primary-500 hover:bg-primary-600 text-white ml-1 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/order">
                  <span className="btn-text-fix">Start Order</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white transition-all duration-200 hover:bg-gray-800/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? (isRTL ? "סגור תפריט" : "Close menu") : isRTL ? "פתח תפריט" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu - Full screen overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-40 flex flex-col animate-fade-in" id="mobile-menu">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={isRTL ? "סגור תפריט" : "Close menu"}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center mb-6 animate-slide-down">
            <Logo size="lg" />
          </div>

          <nav
            className={`flex flex-col mt-6 px-6 ${isRTL ? "text-right" : "text-left"} animate-slide-up`}
            aria-label={isRTL ? "ניווט מובייל" : "Mobile navigation"}
          >
            <Link
              href="/"
              className={`mobile-menu-item ${
                pathname === "/"
                  ? "bg-primary-500/20 text-primary-500"
                  : "text-gray-300 hover:bg-gray-800 hover:text-primary-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className={`h-5 w-5 ${isRTL ? "ml-3" : "mr-3"}`} />
              {isRTL ? "דף הבית" : "Home"}
            </Link>

            {allNavItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-menu-item ${
                  pathname?.startsWith(item.href)
                    ? "bg-primary-500/20 text-primary-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-primary-400"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={`${isRTL ? "ml-3" : "mr-3"}`}>{item.icon}</span>
                {isRTL ? item.labelHe : item.labelEn}
              </Link>
            ))}
          </nav>

          <div className="mt-auto px-6 pb-8 space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex justify-center pt-6 border-t border-gray-800">
              <LanguageSwitcher currentLanguage={language} />
            </div>

            <div className="flex flex-col gap-4">
              <AuthButton />
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 transition-all duration-300"
                asChild
              >
                <Link href="/order">{isRTL ? "התחל הזמנה" : "Start Order"}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
