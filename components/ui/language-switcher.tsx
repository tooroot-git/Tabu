"use client"

import { useLanguage } from "@/context/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, toggleLanguage, isRTL } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 rtl:space-x-reverse rounded-md bg-[#1A1F2E] border border-[#2A3042] px-3 py-2 text-sm font-medium text-white hover:bg-[#232A3F] transition-colors"
      aria-label={isRTL ? "Switch to English" : "החלף לעברית"}
    >
      <Globe className="h-4 w-4 mr-1.5 rtl:mr-0 rtl:ml-1.5" />
      <span>{isRTL ? "English" : "עברית"}</span>
    </button>
  )
}
