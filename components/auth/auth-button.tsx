"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { LogIn, LogOut, User } from "lucide-react"

export function AuthButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { isRTL } = useLanguage()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState(null)

  // Check if user is logged in
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user || null)
  })

  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user || null)
  })

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      router.push("/login")
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfile = () => {
    router.push("/dashboard")
  }

  if (user) {
    return (
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={handleProfile} className="text-gray-200 hover:text-white">
          <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="hidden md:inline">{isRTL ? "החשבון שלי" : "My Account"}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          disabled={isLoading}
          className="text-gray-200 hover:text-white"
        >
          <LogOut className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="hidden md:inline">{isRTL ? "התנתק" : "Logout"}</span>
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogin}
      disabled={isLoading}
      className="text-gray-200 hover:text-white"
    >
      <LogIn className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
      <span>{isRTL ? "התחבר" : "Login"}</span>
    </Button>
  )
}
