"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { useEffect, useState } from "react"

// בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
// import { useUser } from "@auth0/nextjs-auth0/client"

export function AuthButton() {
  const { isRTL } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // מוק לבדיקת משתמש בסביבת התצוגה המקדימה
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("mock_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setIsLoading(false)
    }
  }, [])

  // פונקציה להתחברות בסביבת התצוגה המקדימה
  const handleLogin = () => {
    // בסביבת התצוגה המקדימה, נשמור משתמש מוק בלוקל סטורג'
    const mockUser = {
      name: "משתמש לדוגמה",
      email: "user@example.com",
      picture: "/vibrant-street-market.png",
      sub: "auth0|123456789",
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem("mock_user", JSON.stringify(mockUser))
    setUser(mockUser)
    window.location.href = "/dashboard"
  }

  // פונקציה להתנתקות בסביבת התצוגה המקדימה
  const handleLogout = () => {
    localStorage.removeItem("mock_user")
    setUser(null)
    window.location.href = "/"
  }

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
        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" onClick={handleLogout}>
          {isRTL ? "התנתק" : "Logout"}
        </Button>
      </div>
    )
  }

  // בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
  // return (
  //   <Button variant="outline" size="sm" asChild>
  //     <Link href="/api/auth/login">{isRTL ? "התחבר / הירשם" : "Login / Sign Up"}</Link>
  //   </Button>
  // )

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-white border-gray-700 bg-gray-800/70 hover:bg-gray-800"
      onClick={handleLogin}
    >
      {isRTL ? "התחבר / הירשם" : "Login / Sign Up"}
    </Button>
  )
}
