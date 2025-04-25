"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { User, Shield, Bell, CreditCard, HelpCircle, LogOut, ChevronRight } from "lucide-react"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isRTL } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getUser() {
      setIsLoading(true)
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          throw sessionError
        }

        if (!session) {
          // If no session, redirect to login
          router.push("/login")
          return
        }

        setUser(session.user)
      } catch (error: any) {
        console.error("Error in settings layout:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [supabase, router])

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

  const menuItems = [
    {
      href: "/settings/profile",
      icon: <User className="h-5 w-5" />,
      labelEn: "Profile",
      labelHe: "פרופיל",
    },
    {
      href: "/settings/security",
      icon: <Shield className="h-5 w-5" />,
      labelEn: "Security",
      labelHe: "אבטחה",
    },
    {
      href: "/settings/notifications",
      icon: <Bell className="h-5 w-5" />,
      labelEn: "Notifications",
      labelHe: "התראות",
    },
    {
      href: "/settings/billing",
      icon: <CreditCard className="h-5 w-5" />,
      labelEn: "Billing",
      labelHe: "חיובים",
    },
    {
      href: "/settings/help",
      icon: <HelpCircle className="h-5 w-5" />,
      labelEn: "Help & Support",
      labelHe: "עזרה ותמיכה",
    },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className={`container mx-auto px-4 py-12 ${isRTL ? "font-sans-hebrew" : "font-sans"}`}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-20">
            <h2 className="text-xl font-bold text-white mb-6">{isRTL ? "הגדרות" : "Settings"}</h2>

            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                    pathname === item.href
                      ? "bg-primary-500/20 text-primary-500"
                      : "text-gray-300 hover:bg-gray-800 hover:text-primary-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{isRTL ? item.labelHe : item.labelEn}</span>
                  </div>
                  {pathname === item.href && <ChevronRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />}
                </Link>
              ))}

              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>{isRTL ? "התנתק" : "Sign Out"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
