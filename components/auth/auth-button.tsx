"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

interface AuthButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function AuthButton({ variant = "default", size = "default", className = "" }: AuthButtonProps) {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAuth = async () => {
    if (user) {
      setIsLoading(true)
      try {
        await signOut()
        router.push("/")
      } catch (error) {
        console.error("Error signing out:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      router.push("/login")
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleAuth} disabled={isLoading}>
      {isLoading ? "טוען..." : user ? "התנתק" : "התחבר"}
    </Button>
  )
}

export default AuthButton
