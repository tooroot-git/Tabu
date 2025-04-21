"use client"

import type * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  currentLanguage: "en" | "he"
  onLanguageChange: (language: "en" | "he") => void
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange, className, ...props }: LanguageSwitcherProps) {
  return (
    <div className={cn("flex rounded-md border p-1", className)} {...props}>
      <Button
        variant="ghost"
        size="sm"
        className={cn("px-3", currentLanguage === "en" ? "bg-primary-100 text-primary-700" : "text-gray-600")}
        onClick={() => onLanguageChange("en")}
      >
        English
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn("px-3", currentLanguage === "he" ? "bg-primary-100 text-primary-700" : "text-gray-600")}
        onClick={() => onLanguageChange("he")}
      >
        עברית
      </Button>
    </div>
  )
}
