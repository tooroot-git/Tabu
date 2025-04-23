"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { createClient } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const { isRTL } = useLanguage()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccessMessage(
        isRTL
          ? "נשלח אימייל לאיפוס סיסמה. אנא בדוק את תיבת הדואר שלך ולחץ על הקישור לאיפוס הסיסמה."
          : "Password reset email sent. Please check your inbox and click the link to reset your password.",
      )
    }

    setIsLoading(false)
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{isRTL ? "שכחתי סיסמה" : "Forgot Password"}</CardTitle>
          <CardDescription>
            {isRTL
              ? "הזן את כתובת האימייל שלך ואנו נשלח לך קישור לאיפוס הסיסמה"
              : "Enter your email address and we'll send you a link to reset your password"}
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
            {!successMessage && (
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    {isRTL ? "שולח..." : "Sending..."}
                  </span>
                ) : isRTL ? (
                  "שלח קישור לאיפוס סיסמה"
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            )}
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center">
            <Link href="/login" className="font-medium text-primary hover:underline">
              {isRTL ? "חזרה להתחברות" : "Back to Login"}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
