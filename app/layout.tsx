import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { LanguageProvider } from "@/context/language-context"
import { AuthProvider } from "@/components/auth/auth-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
        {/* Google Tag Manager */}
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-90GNK6C2PY`} />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-90GNK6C2PY');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <AuthProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col bg-[#0A0E17] text-white">{children}</div>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
