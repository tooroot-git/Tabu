"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Loader2, LogIn, UserPlus } from "lucide-react"
import { useUser } from "@/lib/auth-mock"

export default function LoginPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/"
  const { user, isLoading, login } = useUser()

  useEffect(() => {
    // If user is already logged in, redirect to returnTo or home
    if (user && !isLoading) {
      router.push(returnTo)
    }
  }, [user, isLoading, router, returnTo])

  const handleLogin = () => {
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

  // If user is already logged in, don't show login page
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
              <CardTitle className="text-2xl">{isRTL ? "התחברות / הרשמה" : "Login / Sign Up"}</CardTitle>
              <CardDescription>
                {isRTL ? "התחבר לחשבון שלך או צור חשבון חדש" : "Sign in to your account or create a new one"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full gap-2" size="lg" onClick={handleLogin}>
                  <LogIn className="h-5 w-5" />
                  {isRTL ? "התחבר עם Auth0" : "Login with Auth0"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">{isRTL ? "או" : "OR"}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2" size="lg" onClick={handleLogin}>
                  <UserPlus className="h-5 w-5" />
                  {isRTL ? "הירשם עם Auth0" : "Sign up with Auth0"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {isRTL
                    ? "על ידי התחברות, אתה מסכים לתנאי השימוש ולמדיניות הפרטיות שלנו"
                    : "By signing in, you agree to our Terms of Service and Privacy Policy"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
