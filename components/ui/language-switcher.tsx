"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "he" ? "en" : "he")
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="bg-transparent border border-gray-600 hover:bg-gray-800 text-white"
    >
      {language === "he" ? "English" : "עברית"}
    </Button>
  )
}
