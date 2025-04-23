"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

export function LanguageSwitcher({ currentLanguage }: { currentLanguage?: string }) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "he" ? "en" : "he")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
    >
      {language === "he" ? "English" : "עברית"}
    </Button>
  )
}
