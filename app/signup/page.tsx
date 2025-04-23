"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { createClient } from "@/lib/supabase"

export default function SignupPage() {
  const router = useRouter()
  const { isRTL } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(isRTL ? "הסיסמאות אינן תואמות" : "Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError(isRTL ? "הסיסמה חייבת להכיל לפחות 8 תווים" : "Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      setSuccessMessage(
        isRTL
          ? "נשלח אימייל אימות. אנא בדוק את תיבת הדואר שלך ולחץ על הקישור לאימות החשבון."
          : "Verification email sent. Please check your inbox and click the link to verify your account.",
      )
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{isRTL ? "הרשמה" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isRTL
              ? "צור חשבון חדש כדי להזמין נסחי טאבו ולעקוב אחר ההזמנות שלך"
              : "Create a new account to order Tabu extracts and track your orders"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{isRTL ? "אימייל" : "Email"}</Label>
              <Input
                id="email"
                type="email"
                placeholder={isRTL ? "הזן את האימייל שלך" : "Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                disabled={!!successMessage}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{isRTL ? "סיסמה" : "Password"}</Label>
              <Input
                id="password"
                type="password"
                placeholder={isRTL ? "הזן סיסמה" : "Enter password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                disabled={!!successMessage}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{isRTL ? "אימות סיסמה" : "Confirm Password"}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={isRTL ? "הזן שוב את הסיסמה" : "Confirm your password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                dir="ltr"
                disabled={!!successMessage}
              />
            </div>
            {!successMessage && (
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    {isRTL ? "נרשם..." : "Signing up..."}
                  </span>
                ) : isRTL ? (
                  "הירשם"
                ) : (
                  "Sign Up"
                )}
              </Button>
            )}
            {successMessage && (
              <Button type="button" className="w-full" onClick={() => router.push("/login")}>
                {isRTL ? "עבור לדף ההתחברות" : "Go to Login"}
              </Button>
            )}
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center">
            {isRTL ? "כבר יש לך חשבון?" : "Already have an account?"}{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              {isRTL ? "התחבר" : "Login"}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
