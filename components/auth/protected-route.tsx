"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?returnTo=" + encodeURIComponent(window.location.pathname))
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">טוען...</div>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
