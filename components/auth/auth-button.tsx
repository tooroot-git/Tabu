"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

export function AuthButton() {
  const { user, signOut, isLoading } = useAuth()
  const { isRTL } = useLanguage()

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
      </Button>
    )
  }

  if (user) {
    return (
      <Button
        onClick={() => signOut()}
        variant="ghost"
        size="sm"
        className="text-gray-200 hover:text-white hover:bg-primary-700"
      >
        {isRTL ? "התנתק" : "Sign Out"}
      </Button>
    )
  }

  return (
    <Link href="/login">
      <Button variant="ghost" size="sm" className="text-gray-200 hover:text-white hover:bg-primary-700">
        {isRTL ? "התחבר" : "Sign In"}
      </Button>
    </Link>
  )
}
