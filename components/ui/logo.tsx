"use client"

import { useLanguage } from "@/context/language-context"
import Link from "next/link"

interface LogoProps {
  className?: string
  linkWrapper?: boolean
}

export function Logo({ className = "h-8", linkWrapper = true }: LogoProps) {
  const { isRTL } = useLanguage()

  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <div className="relative h-10 w-32">
        <span className="text-2xl font-bold tracking-tight">
          {isRTL ? (
            <span className="text-white">
              טאבו<span className="text-[#F05A28]">ישראל</span>
            </span>
          ) : (
            <span className="text-white">
              Tabu<span className="text-[#F05A28]">Israel</span>
            </span>
          )}
        </span>
      </div>
    </div>
  )

  if (linkWrapper) {
    return (
      <Link href="/" className="flex items-center">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
