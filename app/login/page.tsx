"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">התחברות</CardTitle>
          <CardDescription>התחבר כדי לצפות בהזמנות שלך ולנהל את החשבון שלך</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button className="w-full" onClick={() => (window.location.href = "/api/auth/login")}>
              התחבר עם Auth0
            </Button>
          </div>
          <div className="text-center text-sm">או</div>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // מוק להתחברות בסביבת תצוגה מקדימה
                localStorage.setItem(
                  "mockUser",
                  JSON.stringify({
                    name: "משתמש לדוגמה",
                    email: "user@example.com",
                    picture: "/abstract-user-icon.png",
                  }),
                )
                window.location.href = "/dashboard"
              }}
            >
              התחבר כמשתמש לדוגמה
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
