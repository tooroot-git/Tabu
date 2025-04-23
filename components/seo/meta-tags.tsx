"use client"

import Head from "next/head"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { useEffect } from "react"

interface MetaTagsProps {
  title?: string
  description?: string
  ogImage?: string
  ogType?: string
  noindex?: boolean
  keywords?: string
}

export function MetaTags({
  title,
  description,
  ogImage = "https://tabuisrael.co.il/og-image.png",
  ogType = "website",
  noindex = false,
  keywords,
}: MetaTagsProps) {
  const pathname = usePathname()
  const { language, isRTL } = useLanguage()

  const defaultTitle = isRTL
    ? "טאבוי ישראל – נסח טאבו רשמי תוך דקות"
    : "TabuIsrael - Official Land Registry Documents in Minutes"

  const defaultDescription = isRTL
    ? "הזמנת נסח טאבו רשמי ומעודכן לפי גוש, חלקה וכתובת – 100% דיגיטלי ומאובטח. קבל נסח תוך דקות למייל."
    : "Order official Israeli Land Registry documents by block, parcel, or address - 100% digital and secure. Get your document in minutes."

  const defaultKeywords = isRTL
    ? "נסח טאבו, רשם המקרקעין, טאבו, מקרקעין, נסח היסטורי, נסח מרוכז, רישום מקרקעין, בית משותף, גוש, חלקה"
    : "land registry, tabu extract, tabu, israel property, historical extract, concentrated extract, land registration, block, parcel"

  const siteTitle = title ? `${title} | TabuIsrael.co.il` : defaultTitle
  const siteDescription = description || defaultDescription
  const siteKeywords = keywords || defaultKeywords

  // Clean up the pathname to use for canonical URLs
  const canonicalUrl = `https://tabuisrael.co.il${pathname}`
  const heUrl = `https://tabuisrael.co.il/he${pathname.replace("/he", "").replace("/en", "")}`
  const enUrl = `https://tabuisrael.co.il/en${pathname.replace("/he", "").replace("/en", "")}`

  // Update document title and meta tags when title or description changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = siteTitle
    }
  }, [siteTitle])

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />

      {/* Robots */}
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang */}
      <link rel="alternate" hreflang="he" href={heUrl} />
      <link rel="alternate" hreflang="en" href={enUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="TabuIsrael.co.il" />
      <meta property="og:locale" content={isRTL ? "he_IL" : "en_US"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Viewport for mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

      {/* Google Search Console Verification - Replace with actual verification code */}
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Head>
  )
}
