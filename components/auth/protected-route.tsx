"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Only redirect if we're on the client and not loading and there's no user
    if (!isLoading && !user) {
      router.push(`/login?returnTo=${encodeURIComponent(window.location.pathname)}`)
    }
  }, [user, isLoading, router])

  // Don't render anything on the server or while loading
  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  // If we have a user, render the children
  if (user) {
    return <>{children}</>
  }

  // Otherwise, render nothing (we'll redirect in the useEffect)
  return null
}
