"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { isRTL } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/" // Changed default from /dashboard to /
  const supabase = createClientComponentClient()

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        setIsRedirecting(true)
        router.push(returnTo)
      }
    }

    checkSession()
  }, [supabase, router, returnTo])

  // בעמוד ההתחברות, נשנה את הלוגיקה של הניתוב כדי לוודא שהוא עובד כראוי

  // שינוי 1: נשפר את הלוגיקה של הניתוב אחרי התחברות מוצלחת
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.session) {
        // נוסיף השהייה קצרה לפני הניתוב כדי לוודא שהסשן נשמר כראוי
        setTimeout(() => {
          setIsRedirecting(true)
          // נשתמש בניתוב מוחלט במקום יחסי
          window.location.href = returnTo.startsWith("/") ? returnTo : "/" + returnTo
        }, 500)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to sign in")
      setIsLoading(false)
    }
  }

  if (isRedirecting) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">{isRTL ? "מעביר אותך..." : "Redirecting..."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`container mx-auto px-4 py-12 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
      <div className="flex justify-center">
        <Card className="w-full max-w-md border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-center">{isRTL ? "התחברות" : "Sign In"}</CardTitle>
            <CardDescription className="text-center text-gray-400">
              {isRTL
                ? "התחבר לחשבון שלך כדי לצפות בהזמנות ולהזמין נסחים"
                : "Sign in to your account to view orders and request extracts"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  {isRTL ? "אימייל" : "Email"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRTL ? "הזן את האימייל שלך" : "Enter your email"}
                  required
                  className="bg-gray-800 border-gray-700"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    {isRTL ? "סיסמה" : "Password"}
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300">
                    {isRTL ? "שכחת סיסמה?" : "Forgot password?"}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRTL ? "הזן את הסיסמה שלך" : "Enter your password"}
                  required
                  className="bg-gray-800 border-gray-700"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600"
                disabled={isLoading}
              >
                {isLoading ? (isRTL ? "מתחבר..." : "Signing in...") : isRTL ? "התחבר" : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-400">
              {isRTL ? "אין לך חשבון?" : "Don't have an account?"}{" "}
              <Link href="/signup" className="text-primary-400 hover:text-primary-300">
                {isRTL ? "הירשם" : "Sign up"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
