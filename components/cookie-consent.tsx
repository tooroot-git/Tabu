"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const { isRTL } = useLanguage()

  useEffect(() => {
    // Check if consent has already been given
    const hasConsent = localStorage.getItem("cookie-consent")
    if (!hasConsent) {
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setIsVisible(false)

    // Update Google consent
    if (typeof window !== "undefined" && window.acceptAll) {
      window.acceptAll()
    }
  }

  const acceptAnalytics = () => {
    localStorage.setItem("cookie-consent", "analytics")
    setIsVisible(false)

    // Update Google consent
    if (typeof window !== "undefined" && window.acceptAnalytics) {
      window.acceptAnalytics()
    }
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "none")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-300 max-w-2xl">
            {isRTL
              ? "אנו משתמשים בעוגיות כדי לשפר את חווית המשתמש שלך. אתה יכול לבחור אילו עוגיות לאפשר."
              : "We use cookies to improve your experience. You can choose which cookies to allow."}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decline}
              className="text-gray-400 border-gray-700 hover:bg-gray-800"
            >
              {isRTL ? "דחה הכל" : "Decline All"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={acceptAnalytics}
              className="text-primary-400 border-primary-700 hover:bg-primary-900/50"
            >
              {isRTL ? "קבל אנליטיקה בלבד" : "Accept Analytics Only"}
            </Button>
            <Button size="sm" onClick={acceptAll} className="bg-primary-600 hover:bg-primary-700">
              {isRTL ? "קבל הכל" : "Accept All"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
