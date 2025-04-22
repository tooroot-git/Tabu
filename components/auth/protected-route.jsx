"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { getUser, login } from "@/lib/auth-utils"

export function ProtectedRoute({ children }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getUser()
    setUser(currentUser)
    setIsLoading(false)

    if (!currentUser) {
      // In production, this would redirect to /api/auth/login
      // For preview, we'll just show a login prompt
      const shouldLogin = window.confirm("You need to be logged in to access this page. Would you like to log in?")

      if (shouldLogin) {
        const newUser = login()
        setUser(newUser)
      } else {
        router.push("/")
      }
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null // Will handle in the useEffect
  }

  return <>{children}</>
}
