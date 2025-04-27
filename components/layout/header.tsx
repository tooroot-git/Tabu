"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { Logo } from "@/components/ui/logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { language, t, isHebrew } = useLanguage()
  const { user, signOut } = useAuth()

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
  }, [pathname])

  // Determine if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/" || pathname === "/en"
    }

    const currentPath = pathname || ""
    const normalizedPath = currentPath.replace(/^\/en/, "")
    return normalizedPath.startsWith(path)
  }

  // Get the correct link path based on current language
  const getLink = (path: string) => {
    if (path === "/") {
      return language === "he" ? "/" : "/en"
    }
    return language === "he" ? path : `/en${path}`
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-[#0A0E17]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo - Now correctly wrapped in a single Link */}
        <Link href={getLink("/")} className="flex items-center">
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 md:flex md:space-x-2">
          <Link
            href={getLink("/")}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/") ? "text-blue-400" : "text-gray-300 hover:text-white"
            }`}
          >
            {t("home")}
          </Link>
          <Link
            href={getLink("/services")}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/services") ? "text-blue-400" : "text-gray-300 hover:text-white"
            }`}
          >
            {t("services")}
          </Link>
          <Link
            href={getLink("/order")}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/order") ? "text-blue-400" : "text-gray-300 hover:text-white"
            }`}
          >
            {t("orderNow")}
          </Link>
          <Link
            href={getLink("/faq")}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/faq") ? "text-blue-400" : "text-gray-300 hover:text-white"
            }`}
          >
            {t("faq")}
          </Link>
          <Link
            href={getLink("/contact")}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/contact") ? "text-blue-400" : "text-gray-300 hover:text-white"
            }`}
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Right side - Auth & Language */}
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />

          {user ? (
            <div className="hidden items-center space-x-2 md:flex">
              <Link href={getLink("/my-orders")}>
                <Button variant="ghost" size="sm" className="text-sm">
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  {t("myOrders")}
                </Button>
              </Link>
              <Link href={getLink("/profile")}>
                <Button variant="ghost" size="sm" className="text-sm">
                  <User className="mr-1 h-4 w-4" />
                  {t("profile")}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="text-sm">
                {t("signOut")}
              </Button>
            </div>
          ) : (
            <div className="hidden items-center space-x-2 md:flex">
              <Link href={getLink("/login")}>
                <Button variant="ghost" size="sm" className="text-sm">
                  {t("login")}
                </Button>
              </Link>
              <Link href={getLink("/signup")}>
                <Button variant="primary" size="sm" className="text-sm">
                  {t("signup")}
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="rounded-md p-2 text-gray-300 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-[#0A0E17]/95 backdrop-blur-md md:hidden">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href={getLink("/")}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/") ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {t("home")}
              </Link>
              <Link
                href={getLink("/services")}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/services") ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {t("services")}
              </Link>
              <Link
                href={getLink("/order")}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/order") ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {t("orderNow")}
              </Link>
              <Link
                href={getLink("/faq")}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/faq") ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {t("faq")}
              </Link>
              <Link
                href={getLink("/contact")}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/contact") ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {t("contact")}
              </Link>

              {/* Auth links for mobile */}
              <div className="mt-4 border-t border-gray-700 pt-4">
                {user ? (
                  <>
                    <Link
                      href={getLink("/my-orders")}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t("myOrders")}
                    </Link>
                    <Link
                      href={getLink("/profile")}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                      <User className="mr-2 h-4 w-4" />
                      {t("profile")}
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                      {t("signOut")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={getLink("/login")}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                      {t("login")}
                    </Link>
                    <Link
                      href={getLink("/signup")}
                      className="mt-2 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      {t("signup")}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
