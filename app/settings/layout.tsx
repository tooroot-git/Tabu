"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { User, Shield, Bell, CreditCard, HelpCircle, LogOut, Loader2 } from "lucide-react"

export default function SettingsLayout({ children }) {
  const { isRTL } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push("/")
  }

  const navItems = [
    {
      href: "/settings/profile",
      label: isRTL ? "פרופיל" : "Profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      href: "/settings/security",
      label: isRTL ? "אבטחה" : "Security",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      href: "/settings/notifications",
      label: isRTL ? "התראות" : "Notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      href: "/settings/billing",
      label: isRTL ? "חיוב ותשלום" : "Billing & Payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      href: "/settings/help",
      label: isRTL ? "עזרה ותמיכה" : "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-primary-500/10 text-primary-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className={`${isRTL ? "ml-3" : "mr-3"}`}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-6"
              onClick={handleSignOut}
            >
              <LogOut className={`h-5 w-5 ${isRTL ? "ml-3" : "mr-3"}`} />
              <span>{isRTL ? "התנתק" : "Sign out"}</span>
            </Button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
