"use client"

import { useLanguage } from "@/context/language-context"
import Link from "next/link"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const { isRTL } = useLanguage()

  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative">
        {isRTL ? (
          <div className="flex flex-col items-center font-bold">
            <span className="text-primary-500 font-heading tracking-tight flex flex-col items-center">
              <span className={`${sizeClasses[size]} font-extrabold`}>טאבו</span>
              <span className={`${sizeClasses[size]} font-light`}>ישראל</span>
            </span>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center font-bold">
            <span className="text-primary-500 font-heading tracking-tight flex flex-col items-center">
              <span className={`${sizeClasses[size]} font-extrabold`}>Tabu</span>
              <span className={`${sizeClasses[size]} font-light`}>Israel</span>
            </span>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"></div>
          </div>
        )}
      </div>
    </Link>
  )
}
