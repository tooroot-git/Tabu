"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "he"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // בדיקה אם אנחנו בצד הלקוח כדי לגשת ל-localStorage
  const isClient = typeof window !== "undefined"

  // ננסה לקרוא את השפה מה-localStorage, אחרת נשתמש באנגלית כברירת מחדל
  const [language, setLanguage] = useState<Language>(() => {
    if (isClient) {
      const savedLanguage = localStorage.getItem("language") as Language
      return savedLanguage === "he" ? "he" : "en"
    }
    return "en"
  })

  const isRTL = language === "he"

  // עדכון ה-localStorage כאשר השפה משתנה
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("language", language)
      document.documentElement.dir = isRTL ? "rtl" : "ltr"
      document.documentElement.lang = language
    }
  }, [language, isRTL, isClient])

  return <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
