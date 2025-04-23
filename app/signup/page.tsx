"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { useUser } from "@/lib/useUser"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const { isRTL } = useLanguage()
  const { user, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div
      className={`container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}
    >
      <div className="mx-auto max-w-md">
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">{isRTL ? "הרשמה" : "Sign Up"}</CardTitle>
            <CardDescription className="text-gray-400">
              {isRTL
                ? "צור חשבון חדש כדי להזמין נסחי טאבו ולעקוב אחר ההזמנות שלך"
                : "Create a new account to order Tabu extracts and track your orders"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                asChild
              >
                <Link href="/api/auth/login">
                  <UserPlus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {isRTL ? "הירשם עם Auth0" : "Sign up with Auth0"}
                </Link>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">{isRTL ? "או" : "OR"}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400">{isRTL ? "כבר יש לך חשבון?" : "Already have an account?"}</p>
                <Button variant="link" className="mt-1 text-primary-400 hover:text-primary-500" asChild>
                  <Link href="/login">{isRTL ? "התחבר עכשיו" : "Login now"}</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
