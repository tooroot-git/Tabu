"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"

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

  // ננסה לקרוא את השפה מה-localStorage, אחרת נשתמש בעברית כברירת מחדל
  const [language, setLanguage] = useState<Language>("he")
  const isRTL = language === "he"

  // טעינת השפה מה-localStorage רק בצד הלקוח
  useEffect(() => {
    if (isClient) {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage === "he" || savedLanguage === "en") {
        setLanguage(savedLanguage)
      }
    }
  }, [isClient])

  // עדכון ה-localStorage וכיוון המסמך כאשר השפה משתנה
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

export function useTranslation() {
  const { language } = useLanguage()
  const isHebrew = language === "he"

  const t = useCallback(
    (key: string) => {
      // Replace with your translation logic here
      // This is just a placeholder
      switch (key) {
        case "myOrders":
          return isHebrew ? "ההזמנות שלי" : "My Orders"
        case "loading":
          return isHebrew ? "טוען" : "Loading"
        case "errorFetchingOrders":
          return isHebrew ? "שגיאה בטעינת הזמנות" : "Error fetching orders"
        case "noOrdersFound":
          return isHebrew ? "לא נמצאו הזמנות" : "No orders found"
        case "orderNewDocument":
          return isHebrew ? "הזמן מסמך חדש" : "Order new document"
        case "orderFor":
          return isHebrew ? "הזמנה עבור" : "Order for"
        case "block":
          return isHebrew ? "גוש" : "Block"
        case "parcel":
          return isHebrew ? "חלקה" : "Parcel"
        case "orderDate":
          return isHebrew ? "תאריך הזמנה" : "Order date"
        case "orderID":
          return isHebrew ? "מספר הזמנה" : "Order ID"
        case "status":
          return isHebrew ? "סטטוס" : "Status"
        case "price":
          return isHebrew ? "מחיר" : "Price"
        case "paid":
          return isHebrew ? "שולם" : "paid"
        case "downloadDocument":
          return isHebrew ? "הורד מסמך" : "Download document"
        default:
          return key
      }
    },
    [isHebrew],
  )

  return { t, isHebrew }
}
