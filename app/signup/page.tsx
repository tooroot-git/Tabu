"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Lock, User } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { isRTL } = useLanguage()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        throw error
      }

      setIsSuccess(true)
      // Redirect to login after successful signup
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "Failed to sign up")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[#0A0E17] px-4 py-12 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}
    >
      <div className="w-full max-w-md">
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white text-center">{isRTL ? "הרשמה" : "Sign Up"}</CardTitle>
            <CardDescription className="text-center text-gray-400">
              {isRTL
                ? "צור חשבון חדש כדי להזמין נסחים ולעקוב אחר ההזמנות שלך"
                : "Create a new account to order extracts and track your orders"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert className="mb-4 bg-green-900/20 border-green-800">
                <AlertDescription>
                  {isRTL
                    ? "נרשמת בהצלחה! בדוק את האימייל שלך להשלמת התהליך."
                    : "Successfully signed up! Check your email to complete the process."}
                </AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  {isRTL ? "שם מלא" : "Full Name"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRTL ? "הזן את שמך המלא" : "Enter your full name"}
                    required
                    className="bg-gray-800 border-gray-700 pl-10"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>
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
                <Label htmlFor="password" className="text-white">
                  {isRTL ? "סיסמה" : "Password"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isRTL ? "הזן סיסמה (לפחות 6 תווים)" : "Enter password (min 6 characters)"}
                    required
                    minLength={6}
                    className="bg-gray-800 border-gray-700 pl-10"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (isRTL ? "נרשם..." : "Signing up...") : isRTL ? "הרשם" : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <p className="text-sm text-gray-400">
              {isRTL ? "כבר יש לך חשבון?" : "Already have an account?"}{" "}
              <Link href="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                {isRTL ? "התחבר" : "Sign in"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
