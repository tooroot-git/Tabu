"use client"

import Link from "next/link"
import { useLanguage } from "@/context/language-context"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  const { isRTL } = useLanguage()

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  }

  return (
    <Link href="/" className="flex items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="flex items-center">
          <div className="relative">
            <span className="font-bold">
              <span className="text-primary-500">טאבו</span>
              <span className="text-white">ישראל</span>
            </span>
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </Link>
  )
}
