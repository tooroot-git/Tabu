import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { LanguageProvider } from "@/context/language-context"
import { AuthProvider } from "@/components/auth/auth-provider"
import Script from "next/script"
import { logEnvWarnings } from "@/utils/validate-env"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { GoogleConsent } from "@/components/analytics/google-consent"
import { CookieConsent } from "@/components/cookie-consent"

// Log any environment variable warnings during initialization
if (typeof window === "undefined") {
  logEnvWarnings()
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Improves performance by allowing the font to be displayed before it's fully loaded
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap", // Improves performance
})

export const metadata: Metadata = {
  title: "TabuIsrael - Israeli Land Registry Documents",
  description: "Order official Israeli Land Registry documents (Tabu Extracts) quickly and securely.",
  metadataBase: new URL("https://tabuisrael.co.il"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      he: "/he",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://tabuisrael.co.il",
    title: "TabuIsrael - Israeli Land Registry Documents",
    description: "Order official Israeli Land Registry documents (Tabu Extracts) quickly and securely.",
    siteName: "TabuIsrael",
    images: [
      {
        url: "https://tabuisrael.co.il/og-image.png",
        width: 1200,
        height: 630,
        alt: "TabuIsrael",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TabuIsrael - Israeli Land Registry Documents",
    description: "Order official Israeli Land Registry documents (Tabu Extracts) quickly and securely.",
    images: ["https://tabuisrael.co.il/og-image.png"],
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  // Add security headers
  other: {
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.tabuisrael.co.il https://www.google-analytics.com;",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        {/* Google Consent Mode */}
        <GoogleConsent measurementId="G-90GNK6C2PY" />

        {/* Google Analytics */}
        <GoogleAnalytics measurementId="G-90GNK6C2PY" />

        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <AuthProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col bg-[#0A0E17] text-white">
              {children}
              <CookieConsent />
            </div>
          </LanguageProvider>
        </AuthProvider>

        {/* Structured data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TabuIsrael",
              url: "https://tabuisrael.co.il",
              logo: "https://tabuisrael.co.il/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "",
                contactType: "customer service",
                email: "support@tabuisrael.co.il",
                availableLanguage: ["English", "Hebrew"],
              },
              sameAs: [
                "https://www.facebook.com/tabuisrael",
                "https://twitter.com/tabuisrael",
                "https://www.linkedin.com/company/tabuisrael",
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
