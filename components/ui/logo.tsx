"use client"

import { useLanguage } from "@/context/language-context"
import Link from "next/link"

interface LogoProps {
  className?: string
}

export function Logo({ className = "h-8 w-auto" }: LogoProps) {
  const { isRTL } = useLanguage()

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold">
        <span className="text-white">Tabu</span>
        <span className="text-[#F05A28]">.net.il</span>
      </span>
    </Link>
  )
}
