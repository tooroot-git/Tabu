import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { LanguageProvider } from "@/context/language-context"
import { AuthProvider } from "@/context/auth-context"
import Script from "next/script"
import { logEnvWarnings } from "@/utils/validate-env"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { GoogleConsent } from "@/components/analytics/google-consent"
import { CookieConsent } from "@/components/cookie-consent"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { inter, montserrat, heebo } from "@/lib/fonts"

// Log any environment variable warnings during initialization
if (typeof window === "undefined") {
  logEnvWarnings()
}

// Define a valid base URL for metadata
const SITE_URL = "https://tabuisrael.co.il"

export const metadata: Metadata = {
  title: "נסח טאבו רשמי תוך דקות | טאבו ישראל",
  description:
    "נסח טאבו חתום דיגיטלית אונליין תוך דקות. הזמנת נסח לפי גוש חלקה או כתובת. טאבו ישראל - שירות מהיר, מאובטח ומקצועי.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      he: "/",
    },
  },
  keywords: "נסח טאבו, טאבו אונליין, הזמנת נסח טאבו, נסח קרקע, טאבו, נסח חלקה, נסח טאבו מהיר, נסח טאבו דיגיטלי",
  authors: [{ name: "TabuIsrael Team" }],
  publisher: "TabuIsrael.co.il",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "נסח טאבו תוך דקות - טאבו ישראל",
    description: "הזמן נסח טאבו דיגיטלי באינטרנט בקלות ובמהירות דרך טאבו ישראל. שירות מהיר, מקצועי ומאובטח.",
    siteName: "טאבו ישראל",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "טאבו ישראל - נסח טאבו רשמי",
      },
    ],
    locale: "he_IL",
  },
  twitter: {
    card: "summary_large_image",
    title: "נסח טאבו תוך דקות - טאבו ישראל",
    description: "הזמן נסח טאבו דיגיטלי באינטרנט בקלות ובמהירות דרך טאבו ישראל. שירות מהיר, מקצועי ומאובטח.",
    images: [`${SITE_URL}/og-image.png`],
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
      <body className={`${inter.variable} ${montserrat.variable} ${heebo.variable} font-sans`}>
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
              <Header />
              <main id="main-content" className="flex-grow">
                {children}
              </main>
              <Footer />
              <CookieConsent />
            </div>
          </LanguageProvider>
        </AuthProvider>

        {/* Structured data for SEO */}
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "טאבו ישראל",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+972-1-700-700-830",
                contactType: "Customer Service",
                areaServed: "IL",
                availableLanguage: ["Hebrew", "English"],
              },
              sameAs: [
                "https://www.facebook.com/tabuisrael",
                "https://twitter.com/tabuisrael",
                "https://www.linkedin.com/company/tabuisrael",
              ],
            }),
          }}
        />

        <Script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: SITE_URL,
              name: "טאבו ישראל - נסח טאבו רשמי תוך דקות",
              description: "הזמנת נסח טאבו רשמי ומעודכן לפי גוש, חלקה וכתובת – 100% דיגיטלי ומאובטח.",
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
              inLanguage: "he-IL",
            }),
          }}
        />
      </body>
    </html>
  )
}
