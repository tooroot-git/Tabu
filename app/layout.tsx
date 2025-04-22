import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { AuthProvider } from "@/components/auth/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tabu.net.il - מסמכי רישום מקרקעין רשמיים",
  description: "הזמן נסחי טאבו רשמיים באופן מקוון, במהירות ובאופן מאובטח.",
    generator: 'v0.dev'
}

// Add Stripe publishable key to the environment
if (typeof window !== "undefined") {
  window.ENV = {
    ...window.ENV,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      "pk_live_51R43bERufrEbUWEImjimDjTs5Ke8Iy0Fi8YNpNvcd7xEesmXpz3biE8z8Nybx5zLUj1XjXa9k5clDkaDXKo5iKXp003tafQBZJ",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <body className={`${inter.className} bg-[#0A0E17] text-white font-sans-hebrew`}>
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
