"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"

// בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
// import { useUser } from "@auth0/nextjs-auth0/client"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isRTL } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // מוק לבדיקת משתמש בסביבת התצוגה המקדימה
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("mock_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          setUser(null)
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoading && !user && !error) {
      // בסביבת התצוגה המקדימה, נפנה לדף התחברות מוק
      router.push("/login?returnTo=" + encodeURIComponent(window.location.pathname))
    }
  }, [user, isLoading, error, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        <p className="mt-4 text-lg">{isRTL ? "טוען..." : "Loading..."}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg text-red-600">{isRTL ? "שגיאת אימות" : "Authentication Error"}</p>
        <p className="mt-2">{error.message}</p>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return <>{children}</>
}
