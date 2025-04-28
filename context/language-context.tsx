"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

// Define available languages
export type Language = "he" | "en"

// Define translations
const translations = {
  he: {
    home: "דף הבית",
    services: "שירותים",
    orderNow: "הזמן עכשיו",
    faq: "שאלות נפוצות",
    contact: "צור קשר",
    login: "התחברות",
    signup: "הרשמה",
    myOrders: "ההזמנות שלי",
    profile: "פרופיל",
    signOut: "התנתק",
    openMenu: "פתח תפריט",
    closeMenu: "סגור תפריט",
    // Add more translations as needed
  },
  en: {
    home: "Home",
    services: "Services",
    orderNow: "Order Now",
    faq: "FAQ",
    contact: "Contact",
    login: "Login",
    signup: "Sign Up",
    myOrders: "My Orders",
    profile: "Profile",
    signOut: "Sign Out",
    openMenu: "Open Menu",
    closeMenu: "Close Menu",
    // Add more translations as needed
  },
}

// Define context type
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
  isHebrew: boolean
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguage] = useState<Language>("he") // Default to Hebrew
  const isRTL = language === "he"
  const isHebrew = language === "he"

  // Detect language from URL on initial load
  useEffect(() => {
    // This is a simplified check - in a real app you might want more robust detection
    if (pathname?.startsWith("/en")) {
      setLanguage("en")
    } else {
      setLanguage("he")
    }
  }, [pathname])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const useTranslation = () => {
    return { t, isHebrew }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, isHebrew }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const useTranslation = () => {
  const { language } = useLanguage()
  const isHebrew = language === "he"

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return { t, isHebrew }
}
