"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, UserPlus } from "lucide-react"
import Link from "next/link"
import { getUser, login } from "@/lib/auth-utils"

export default function SignupPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/"
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(getUser())
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // If user is already logged in, redirect to returnTo or home
    if (user && !isLoading) {
      router.push(returnTo)
    }
  }, [user, isLoading, router, returnTo])

  // Function for signup in preview environment
  const handleSignup = () => {
    login()
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

  // If user is already logged in, don't show signup page
  if (user) {
    return null // Will redirect in useEffect
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
