"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // בסביבת תצוגה מקדימה, נשתמש בהתחברות מדומה
      // הגדרת משתמש מדומה ב-localStorage
      localStorage.setItem(
        "mockUser",
        JSON.stringify({
          name: "משתמש לדוגמה",
          email: "user@example.com",
          picture: "/abstract-user-icon.png",
        }),
      )

      // הפניה לדשבורד
      router.push("/dashboard")
    } catch (err) {
      console.error("Login error:", err)
      setError("אירעה שגיאה בתהליך ההתחברות. אנא נסה שוב.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">התחברות</CardTitle>
          <CardDescription>התחבר כדי לצפות בהזמנות שלך ולנהל את החשבון שלך</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "מתחבר..." : "התחבר למערכת"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center">
            אין לך חשבון?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              הירשם
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
