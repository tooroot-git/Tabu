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
import { AlertCircle, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { isRTL } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/dashboard"
  const supabase = createClientComponentClient()

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        console.log("User already logged in, redirecting to:", returnTo)
        router.push(returnTo)
      }
    }

    checkSession()
  }, [supabase, router, returnTo])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      console.log("Attempting login with:", email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Login error:", error.message)
        throw error
      }

      if (data.session) {
        console.log("Login successful, session established")
        setIsRedirecting(true)

        // Force a refresh to ensure the session is properly set
        await supabase.auth.refreshSession()

        // Redirect immediately without setTimeout
        console.log("Redirecting to:", returnTo)
        router.push(returnTo)
        router.refresh()
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to sign in")
      setIsLoading(false)
      setIsRedirecting(false)
    }
  }

  if (isRedirecting) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#0A0E17]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">{isRTL ? "מעביר אותך..." : "Redirecting..."}</p>
          {/* Add a backup link in case redirect fails */}
          <button
            onClick={() => router.push(returnTo)}
            className="mt-4 text-primary-400 hover:text-primary-300 underline text-sm"
          >
            {isRTL ? "לחץ כאן אם אינך מועבר אוטומטית" : "Click here if not redirected automatically"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[#0A0E17] px-4 py-12 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}
    >
      <div className="w-full max-w-md">
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white text-center">{isRTL ? "התחברות" : "Sign In"}</CardTitle>
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
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isRTL ? "הזן את האימייל שלך" : "Enter your email"}
                    required
                    className="bg-gray-800 border-gray-700 pl-10"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
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
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isRTL ? "הזן את הסיסמה שלך" : "Enter your password"}
                    required
                    className="bg-gray-800 border-gray-700 pl-10"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (isRTL ? "מתחבר..." : "Signing in...") : isRTL ? "התחבר" : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <p className="text-sm text-gray-400">
              {isRTL ? "אין לך חשבון?" : "Don't have an account?"}{" "}
              <Link href="/signup" className="text-primary-400 hover:text-primary-300 font-medium">
                {isRTL ? "הירשם" : "Sign up"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
