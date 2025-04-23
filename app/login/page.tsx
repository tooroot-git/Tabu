"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth0"

export default function LoginPage() {
  const { user, isLoading, loginWithRedirect } = useAuth()
  const router = useRouter()

  // If the user is already logged in, redirect to dashboard
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
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">התחברות</CardTitle>
          <CardDescription>התחבר כדי לצפות בהזמנות שלך ולנהל את החשבון שלך</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button className="w-full" onClick={loginWithRedirect}>
              התחבר למערכת
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
