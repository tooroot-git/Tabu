"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, EyeOff, Eye } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { createClient } from "@/lib/supabase"
import { MetaTags } from "@/components/seo/meta-tags"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isRTL } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const returnTo = searchParams.get("returnTo") || "/dashboard"

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      } else {
        router.push(returnTo)
        router.refresh()
      }
    } catch (error: any) {
      setError(error.message || (isRTL ? "שגיאת התחברות" : "Authentication error"))
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <MetaTags
        title={isRTL ? "התחברות | טאבוי ישראל" : "Login | TabuIsrael"}
        description={
          isRTL
            ? "התחבר לחשבונך והזמן נסחי טאבו מהר ובקלות"
            : "Login to your account and order Tabu extracts quickly and easily"
        }
      />

      <Header />

      <main className="flex min-h-screen items-center justify-center py-16">
        <div className="container px-4">
          <Card className="mx-auto w-full max-w-md border-gray-800 bg-gray-900/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white">{isRTL ? "התחברות" : "Login"}</CardTitle>
              <CardDescription className="text-gray-400">
                {isRTL ? "הזן את פרטי ההתחברות שלך כדי לגשת לחשבונך" : "Enter your credentials to access your account"}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    {isRTL ? "אימייל" : "Email"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={isRTL ? "הזן את האימייל שלך" : "Enter your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    dir="ltr"
                    leftIcon={<Mail className="h-4 w-4" />}
                    className="border-gray-700 bg-gray-800/80 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">
                      {isRTL ? "סיסמה" : "Password"}
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary-400 hover:text-primary-300 hover:underline"
                    >
                      {isRTL ? "שכחת סיסמה?" : "Forgot password?"}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isRTL ? "הזן את הסיסמה שלך" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    dir="ltr"
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    className="border-gray-700 bg-gray-800/80 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                  disabled={isLoading}
                  isLoading={isLoading}
                  loadingText={isRTL ? "מתחבר..." : "Logging in..."}
                >
                  {isRTL ? "התחבר" : "Login"}
                </Button>
              </CardContent>
            </form>

            <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
              <div className="text-sm text-center text-gray-400">
                {isRTL ? "אין לך חשבון?" : "Don't have an account?"}{" "}
                <Link href="/signup" className="font-medium text-primary-400 hover:text-primary-300 hover:underline">
                  {isRTL ? "הירשם" : "Sign up"}
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  )
}
