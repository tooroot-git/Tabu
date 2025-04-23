"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Package, Settings } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isRTL } = useLanguage()
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getUser() {
      setIsLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error("Error fetching user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [supabase])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className={`container mx-auto px-4 py-12 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{isRTL ? "לוח בקרה" : "Dashboard"}</h1>
        <p className="mt-2 text-gray-400">
          {isRTL ? `שלום, ${user.user_metadata?.name || "משתמש"}` : `Hello, ${user.user_metadata?.name || "User"}`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{isRTL ? "הזמנות אחרונות" : "Recent Orders"}</CardTitle>
            <CardDescription className="text-gray-400">
              {isRTL ? "צפה בהזמנות האחרונות שלך" : "View your recent orders"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/my-orders">
                <FileText className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {isRTL ? "צפה בהזמנות" : "View Orders"}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{isRTL ? "הזמנה חדשה" : "New Order"}</CardTitle>
            <CardDescription className="text-gray-400">
              {isRTL ? "הזמן נסח טאבו חדש" : "Order a new Tabu extract"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600" asChild>
              <Link href="/order">
                <Package className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {isRTL ? "התחל הזמנה" : "Start Order"}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{isRTL ? "הגדרות חשבון" : "Account Settings"}</CardTitle>
            <CardDescription className="text-gray-400">
              {isRTL ? "נהל את פרטי החשבון שלך" : "Manage your account details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {isRTL ? "הגדרות" : "Settings"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
