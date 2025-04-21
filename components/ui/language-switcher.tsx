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
    <div className={cn("flex rounded-md border border-gray-700 bg-gray-800 p-1", className)} {...props}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-3 text-sm",
          currentLanguage === "en" ? "bg-primary-500 text-white" : "text-gray-300 hover:text-white",
        )}
        onClick={() => onLanguageChange("en")}
      >
        English
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-3 text-sm",
          currentLanguage === "he" ? "bg-primary-500 text-white" : "text-gray-300 hover:text-white",
        )}
        onClick={() => onLanguageChange("he")}
      >
        עברית
      </Button>
    </div>
  )
}
