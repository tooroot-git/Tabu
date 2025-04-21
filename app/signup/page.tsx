"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2, UserPlus } from "lucide-react"
import Link from "next/link"

// בסביבת ייצור, יש להחליף את הקוד הזה בקוד הבא:
// import { useUser } from "@auth0/nextjs-auth0/client"

export default function SignupPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/"
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

  useEffect(() => {
    // אם המשתמש כבר מחובר, נפנה אותו לדף הבית או לדף שממנו הגיע
    if (user && !isLoading) {
      router.push(returnTo)
    }
  }, [user, isLoading, router, returnTo])

  // פונקציה להרשמה בסביבת התצוגה המקדימה
  const handleSignup = () => {
    // בסביבת התצוגה המקדימה, נשמור משתמש מוק בלוקל סטורג'
    const mockUser = {
      name: "משתמש לדוגמה",
      email: "user@example.com",
      picture: "/vibrant-street-market.png",
      sub: "auth0|123456789",
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem("mock_user", JSON.stringify(mockUser))
    router.push(returnTo)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        <p className="mt-4 text-lg">{isRTL ? "טוען..." : "Loading..."}</p>
      </div>
    )
  }

  // אם המשתמש כבר מחובר, לא נציג את דף ההרשמה
  if (user) {
    return null // יופנה בהמשך ב-useEffect
  }

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{isRTL ? "הרשמה" : "Sign Up"}</CardTitle>
              <CardDescription>
                {isRTL
                  ? "צור חשבון חדש כדי להתחיל להשתמש בשירותים שלנו"
                  : "Create a new account to start using our services"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full gap-2" size="lg" onClick={handleSignup}>
                  <UserPlus className="h-5 w-5" />
                  {isRTL ? "הירשם עם Auth0" : "Sign up with Auth0"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {isRTL
                    ? "על ידי הרשמה, אתה מסכים לתנאי השימוש ולמדיניות הפרטיות שלנו"
                    : "By signing up, you agree to our Terms of Service and Privacy Policy"}
                </p>

                <div className="text-center text-sm">
                  {isRTL ? "כבר יש לך חשבון?" : "Already have an account?"}{" "}
                  <Link href="/login" className="font-medium text-primary-600 hover:underline">
                    {isRTL ? "התחבר" : "Login"}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
