"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"

type Language = "en" | "he"

interface TranslationObject {
  [key: string]: {
    en: string
    he: string
  }
}

// Common translations
const translations: TranslationObject = {
  loading: {
    en: "Loading",
    he: "טוען",
  },
  error: {
    en: "Error",
    he: "שגיאה",
  },
  success: {
    en: "Success",
    he: "הצלחה",
  },
  myOrders: {
    en: "My Orders",
    he: "ההזמנות שלי",
  },
  orderNewDocument: {
    en: "Order New Document",
    he: "הזמן מסמך חדש",
  },
  noOrdersFound: {
    en: "No orders found",
    he: "לא נמצאו הזמנות",
  },
  errorFetchingOrders: {
    en: "Error fetching orders",
    he: "שגיאה בטעינת הזמנות",
  },
  downloadDocument: {
    en: "Download Document",
    he: "הורד מסמך",
  },
  orderFor: {
    en: "Order for",
    he: "הזמנה עבור",
  },
  block: {
    en: "Block",
    he: "גוש",
  },
  parcel: {
    en: "Parcel",
    he: "חלקה",
  },
  subParcel: {
    en: "Sub-Parcel",
    he: "תת-חלקה",
  },
  orderDate: {
    en: "Order Date",
    he: "תאריך הזמנה",
  },
  status: {
    en: "Status",
    he: "סטטוס",
  },
  price: {
    en: "Price",
    he: "מחיר",
  },
  paid: {
    en: "Paid",
    he: "שולם",
  },
  pending: {
    en: "Pending",
    he: "ממתין",
  },
  processing: {
    en: "Processing",
    he: "בעיבוד",
  },
  completed: {
    en: "Completed",
    he: "הושלם",
  },
  failed: {
    en: "Failed",
    he: "נכשל",
  },
  startOrder: {
    en: "Start Order",
    he: "התחל הזמנה",
  },
  services: {
    en: "Services",
    he: "שירותים",
  },
  about: {
    en: "About",
    he: "אודות",
  },
  faq: {
    en: "FAQ",
    he: "שאלות נפוצות",
  },
  contact: {
    en: "Contact",
    he: "צור קשר",
  },
  openMenu: {
    en: "Open Menu",
    he: "פתח תפריט",
  },
  closeMenu: {
    en: "Close Menu",
    he: "סגור תפריט",
  },
  pageNotFound: {
    en: "Page Not Found",
    he: "דף לא נמצא",
  },
  returnHome: {
    en: "Return to Home",
    he: "חזרה לדף הבית",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  isHebrew: boolean
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "he", // Default to Hebrew
  setLanguage: () => {},
  isRTL: true, // Default to RTL
  isHebrew: true, // Default to Hebrew
  t: (key: string) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export const useTranslation = () => {
  const { language, t } = useContext(LanguageContext)
  const isHebrew = language === "he"

  return { t, isHebrew }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()

  // Always default to Hebrew
  const [language, setLanguageState] = useState<Language>("he")
  const isRTL = language === "he"
  const isHebrew = language === "he"

  // Detect language from URL on initial load
  useEffect(() => {
    // Check if we're on the English path
    if (pathname?.startsWith("/en")) {
      setLanguageState("en")
    } else {
      // Default to Hebrew for all other paths
      setLanguageState("he")
    }
  }, [pathname])

  // Update HTML lang and dir attributes when language changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
      document.documentElement.dir = isRTL ? "rtl" : "ltr"

      // Add/remove RTL-specific class to body for additional styling if needed
      if (isRTL) {
        document.body.classList.add("rtl")
      } else {
        document.body.classList.remove("rtl")
      }
    }
  }, [language, isRTL])

  // Handle language change
  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang)

      // Update URL to reflect language change
      if (lang === "en" && !pathname?.startsWith("/en")) {
        router.push(`/en${pathname}`)
      } else if (lang === "he" && pathname?.startsWith("/en")) {
        router.push(pathname.replace(/^\/en/, ""))
      }

      // Force refresh to apply RTL/LTR changes properly
      router.refresh()
    },
    [router, pathname],
  )

  // Translation function
  const t = useCallback(
    (key: string): string => {
      // Check if we have a translation for this key
      if (translations[key]?.[language]) {
        return translations[key][language]
      }

      // Fallback to the key itself
      return key
    },
    [language],
  )

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL,
        isHebrew,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
