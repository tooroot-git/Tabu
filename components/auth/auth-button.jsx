"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { getUser, login, logout } from "@/lib/auth-utils"

export function AuthButton() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(getUser())
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    const newUser = login()
    setUser(newUser)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="text-gray-300">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" onClick={handleLogout}>
          Logout
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
      onClick={handleLogin}
    >
      Login / Sign Up
    </Button>
  )
}
