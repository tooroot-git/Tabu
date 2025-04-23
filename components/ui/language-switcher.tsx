"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

type Language = "en" | "he"

interface LanguageSwitcherProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "he" : "en"
    onLanguageChange(newLanguage)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 text-gray-300 hover:text-primary-400"
      onClick={toggleLanguage}
    >
      <Globe className="h-4 w-4" />
      <span>{currentLanguage === "en" ? "עברית" : "English"}</span>
    </Button>
  )
}
