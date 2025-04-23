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

export default function ResetPasswordPage() {
  const router = useRouter()
  const { isRTL } = useLanguage()
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

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
    } else {
      setSuccessMessage(
        isRTL
          ? "הסיסמה עודכנה בהצלחה. כעת תוכל להתחבר עם הסיסמה החדשה."
          : "Password updated successfully. You can now login with your new password.",
      )
    }

    setIsLoading(false)
  }

  return (
    <div className="container flexex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{isRTL ? "איפוס סיסמה" : "Reset Password"}</CardTitle>
          <CardDescription>{isRTL ? "הזן את הסיסמה החדשה שלך" : "Enter your new password"}</CardDescription>
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
              <Label htmlFor="password">{isRTL ? "סיסמה חדשה" : "New Password"}</Label>
              <Input
                id="password"
                type="password"
                placeholder={isRTL ? "הזן סיסמה חדשה" : "Enter new password"}
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
                placeholder={isRTL ? "הזן שוב את הסיסמה החדשה" : "Confirm your new password"}
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
                    {isRTL ? "מעדכן..." : "Updating..."}
                  </span>
                ) : isRTL ? (
                  "עדכן סיסמה"
                ) : (
                  "Update Password"
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
            <Link href="/login" className="font-medium text-primary hover:underline">
              {isRTL ? "חזרה להתחברות" : "Back to Login"}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
