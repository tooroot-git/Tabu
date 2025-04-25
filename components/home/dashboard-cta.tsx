"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { LayoutDashboard } from "lucide-react"
import Link from "next/link"

export function DashboardCTA() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { isRTL } = useLanguage()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)
      setIsLoading(false)
    }

    checkAuth()

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  if (isLoading || !isLoggedIn) {
    return null
  }

  return (
    <div className="fixed bottom-8 right-8 z-40 animate-fade-in">
      <Button
        size="lg"
        className="bg-primary-500 hover:bg-primary-600 text-white shadow-lg rounded-full px-6 flex items-center"
        asChild
      >
        <Link href="/dashboard" className="flex items-center">
          <LayoutDashboard className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
          {isRTL ? "לוח הבקרה שלי" : "My Dashboard"}
        </Link>
      </Button>
    </div>
  )
}
