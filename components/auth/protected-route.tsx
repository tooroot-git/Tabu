"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useUser } from "@/lib/auth-mock"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isRTL } = useLanguage()
  const { user, isLoading, login } = useUser()

  useEffect(() => {
    if (!isLoading && !user) {
      // In production, this would redirect to /api/auth/login
      // For preview, we'll just show a login prompt
      const shouldLogin = window.confirm(
        isRTL
          ? "עליך להתחבר כדי לגשת לדף זה. האם ברצונך להתחבר?"
          : "You need to be logged in to access this page. Would you like to log in?",
      )

      if (shouldLogin) {
        login()
      } else {
        router.push("/")
      }
    }
  }, [user, isLoading, router, login, isRTL])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        <p className="mt-4 text-lg">{isRTL ? "טוען..." : "Loading..."}</p>
      </div>
    )
  }

  if (!user) {
    return null // Will handle in the useEffect
  }

  return <>{children}</>
}
