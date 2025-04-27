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
  author?: string
  publisher?: string
}

export function MetaTags({
  title,
  description,
  ogImage = "https://tabuisrael.co.il/og-image.png",
  ogType = "website",
  noindex = false,
  keywords,
  author = "TabuIsrael Team",
  publisher = "TabuIsrael.co.il",
}: MetaTagsProps) {
  const pathname = usePathname()
  const { language, isRTL } = useLanguage()

  // SEO-optimized titles for different pages
  const getTitleByPath = () => {
    if (pathname === "/") {
      return isRTL ? "נסח טאבו רשמי תוך דקות | טאבו ישראל" : "Official Land Registry Extract in Minutes | TabuIsrael"
    }
    if (pathname?.includes("/order")) {
      return isRTL ? "הזמנת נסח טאבו אונליין | טאבו ישראל" : "Order Land Registry Extract Online | TabuIsrael"
    }
    if (pathname?.includes("/document-selection")) {
      return isRTL ? "בחירת סוג נסח טאבו | טאבו ישראל" : "Select Document Type | TabuIsrael"
    }
    if (pathname?.includes("/payment")) {
      return isRTL ? "תשלום מאובטח לנסח טאבו | טאבו ישראל" : "Secure Payment for Land Registry Extract | TabuIsrael"
    }
    if (pathname?.includes("/confirmation")) {
      return isRTL ? "הזמנת נסח טאבו הושלמה | טאבו ישראל" : "Order Completed | TabuIsrael"
    }
    if (pathname?.includes("/dashboard")) {
      return isRTL ? "לוח הבקרה שלי | טאבו ישראל" : "My Dashboard | TabuIsrael"
    }
    if (pathname?.includes("/my-orders")) {
      return isRTL ? "ההזמנות שלי | טאבו ישראל" : "My Orders | TabuIsrael"
    }
    if (pathname?.includes("/login")) {
      return isRTL ? "התחברות | טאבו ישראל" : "Login | TabuIsrael"
    }
    if (pathname?.includes("/signup")) {
      return isRTL ? "הרשמה | טאבו ישראל" : "Sign Up | TabuIsrael"
    }
    if (pathname?.includes("/about")) {
      return isRTL ? "אודות שירות נסח טאבו אונליין | טאבו ישראל" : "About Our Land Registry Service | TabuIsrael"
    }
    if (pathname?.includes("/faq")) {
      return isRTL ? "שאלות נפוצות על נסח טאבו | טאבו ישראל" : "FAQ About Land Registry Extracts | TabuIsrael"
    }
    if (pathname?.includes("/contact")) {
      return isRTL ? "צור קשר | טאבו ישראל" : "Contact Us | TabuIsrael"
    }

    // Default title if no specific path matches
    return isRTL ? "טאבו ישראל – נסח טאבו רשמי תוך דקות" : "TabuIsrael - Official Land Registry Documents in Minutes"
  }

  // SEO-optimized descriptions for different pages
  const getDescriptionByPath = () => {
    if (pathname === "/") {
      return isRTL
        ? "נסח טאבו חתום דיגיטלית אונליין תוך דקות. הזמנת נסח לפי גוש חלקה או כתובת. טאבו ישראל - שירות מהיר, מאובטח ומקצועי."
        : "Get official digital land registry extracts in minutes. Order by block, parcel or address. TabuIsrael - fast, secure and professional service."
    }
    if (pathname?.includes("/order")) {
      return isRTL
        ? "הזמן נסח טאבו אונליין לפי גוש וחלקה, כתובת או תעודת זהות. שירות מהיר ומאובטח עם קבלת הנסח תוך דקות."
        : "Order land registry extract online by block and parcel, address or ID. Fast and secure service with document delivery in minutes."
    }

    // Default description if no specific path matches
    return isRTL
      ? "הזמנת נסח טאבו רשמי ומעודכן לפי גוש, חלקה וכתובת – 100% דיגיטלי ומאובטח. קבל נסח תוך דקות למייל."
      : "Order official Israeli Land Registry documents by block, parcel, or address - 100% digital and secure. Get your document in minutes."
  }

  // SEO-optimized keywords for different pages
  const getKeywordsByPath = () => {
    if (pathname === "/") {
      return isRTL
        ? "נסח טאבו, טאבו אונליין, הזמנת נסח טאבו, נסח קרקע, טאבו, נסח חלקה, נסח טאבו מהיר, נסח טאבו דיגיטלי"
        : "land registry extract, tabu online, order land registry, property extract, tabu, parcel extract, fast land registry, digital land registry"
    }
    if (pathname?.includes("/order")) {
      return isRTL
        ? "הזמנת נסח טאבו, גוש חלקה, נסח לפי כתובת, נסח טאבו אונליין, נסח טאבו מהיר, טאבו דיגיטלי"
        : "order land registry, block parcel, extract by address, online land registry, fast land registry, digital tabu"
    }

    // Default keywords if no specific path matches
    return isRTL
      ? "נסח טאבו, רשם המקרקעין, טאבו, מקרקעין, נסח היסטורי, נסח מרוכז, רישום מקרקעין, בית משותף, גוש, חלקה"
      : "land registry, tabu extract, tabu, israel property, historical extract, concentrated extract, land registration, block, parcel"
  }

  const defaultTitle = title || getTitleByPath()
  const defaultDescription = description || getDescriptionByPath()
  const defaultKeywords = keywords || getKeywordsByPath()

  // Clean up the pathname to use for canonical URLs
  const canonicalUrl = `https://tabuisrael.co.il${pathname}`
  const heUrl = `https://tabuisrael.co.il/he${pathname.replace("/he", "").replace("/en", "")}`
  const enUrl = `https://tabuisrael.co.il/en${pathname.replace("/he", "").replace("/en", "")}`

  // Update document title and meta tags when title or description changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = defaultTitle
    }
  }, [defaultTitle])

  return (
    <Head>
      <title>{defaultTitle}</title>
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content={defaultKeywords} />
      <meta name="author" content={author} />
      <meta name="publisher" content={publisher} />

      {/* Robots */}
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang */}
      <link rel="alternate" hreflang="he" href={heUrl} />
      <link rel="alternate" hreflang="en" href={enUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="TabuIsrael.co.il" />
      <meta property="og:locale" content={isRTL ? "he_IL" : "en_US"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
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
