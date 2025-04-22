"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { useUser } from "@/lib/auth-mock"

export function AuthButton() {
  const { isRTL } = useLanguage()
  const { user, error, isLoading, login, logout } = useUser()

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="text-gray-300">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {isRTL ? "טוען..." : "Loading..."}
      </Button>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" asChild>
          <Link href="/dashboard">{isRTL ? "האזור האישי" : "Dashboard"}</Link>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" onClick={logout}>
          {isRTL ? "התנתק" : "Logout"}
        </Button>
      </div>
    )
  }

  // In production, this would link to /api/auth/login
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-white border-gray-700 bg-gray-800/70 hover:bg-gray-800"
      onClick={login}
    >
      {isRTL ? "התחבר / הירשם" : "Login / Sign Up"}
    </Button>
  )
}
