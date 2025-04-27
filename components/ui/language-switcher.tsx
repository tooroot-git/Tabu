"use client"

import { useLanguage } from "@/context/language-context"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  const toggleLanguage = () => {
    const newLanguage = language === "he" ? "en" : "he"
    setLanguage(newLanguage)

    // Update URL based on language
    if (newLanguage === "en" && !pathname?.startsWith("/en")) {
      router.push(`/en${pathname}`)
    } else if (newLanguage === "he" && pathname?.startsWith("/en")) {
      router.push(pathname.replace(/^\/en/, ""))
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2 py-1 text-sm"
      aria-label={language === "he" ? "Switch to English" : "עבור לעברית"}
    >
      {language === "he" ? "English" : "עברית"}
    </Button>
  )
}
