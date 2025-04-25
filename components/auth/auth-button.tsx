"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"

interface AuthButtonProps {
  onClose?: () => void // Optional callback for when auth action completes
}

export function AuthButton({ onClose }: AuthButtonProps) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { isRTL } = useLanguage()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      if (onClose) onClose()
      router.refresh() // Force refresh to update UI components
      router.push("/") // Redirect to home page
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="border-gray-700 text-white hover:bg-gray-800 hover:text-primary-400"
        onClick={handleSignOut}
        disabled={isLoading}
      >
        <LogOut className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
        <span>{isRTL ? "התנתק" : "Sign Out"}</span>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="border-gray-700 text-white hover:bg-gray-800 hover:text-primary-400"
      asChild
    >
      <Link href="/login" onClick={onClose}>
        <LogIn className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
        <span>{isRTL ? "התחבר" : "Sign In"}</span>
      </Link>
    </Button>
  )
}
