"use client"

import { useLanguage } from "@/context/language-context"

interface StructuredDataProps {
  type: "Organization" | "Service" | "FAQPage" | "Order" | "WebSite" | "BreadcrumbList"
  data?: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const { isRTL } = useLanguage()

  let structuredData = {}

  switch (type) {
    case "Organization":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "טאבו ישראל",
        url: "https://tabuisrael.co.il",
        logo: "https://tabuisrael.co.il/logo.png",
        sameAs: ["https://facebook.com/tabuisrael", "https://twitter.com/tabuisrael"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+972-1-700-700-830",
          contactType: "customer service",
          availableLanguage: ["Hebrew", "English"],
          areaServed: "IL",
        },
        description: isRTL
          ? "הזמנת נסח טאבו רשמי ומעודכן לפי גוש, חלקה וכתובת – 100% דיגיטלי ומאובטח."
          : "Order official Israeli Land Registry documents by block, parcel, or address - 100% digital and secure.",
      }
      break

    case "Service":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: isRTL ? "נסח טאבו דיגיטלי" : "Digital Land Registry Extract",
        provider: {
          "@type": "Organization",
          name: "טאבו ישראל",
          url: "https://tabuisrael.co.il",
        },
        serviceType: isRTL ? 'שירותי מידע נדל"ן' : "Real Estate Information Services",
        description: isRTL
          ? "שירות הזמנת נסח טאבו רשמי ומעודכן באופן מקוון, מהיר ומאובטח."
          : "Service for ordering official and updated land registry extracts online, fast and secure.",
        offers: {
          "@type": "Offer",
          price: "39.90",
          priceCurrency: "ILS",
        },
        areaServed: {
          "@type": "Country",
          name: "Israel",
        },
        termsOfService: "https://tabuisrael.co.il/terms",
        audience: {
          "@type": "Audience",
          audienceType: "Real Estate Professionals, Property Owners, Legal Advisors",
        },
      }
      break

    case "FAQPage":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity:
          data?.faqs?.map((faq: any) => ({
            "@type": "Question",
            name: isRTL ? faq.questionHe : faq.questionEn,
            acceptedAnswer: {
              "@type": "Answer",
              text: isRTL ? faq.answerHe : faq.answerEn,
            },
          })) || [],
      }
      break

    case "Order":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Order",
        orderNumber: data?.orderId || "",
        orderStatus: "https://schema.org/OrderDelivered",
        merchant: {
          "@type": "Organization",
          name: "טאבו ישראל",
        },
        acceptedOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isRTL ? "נסח טאבו דיגיטלי" : "Digital Land Registry Extract",
          },
        },
      }
      break

    case "WebSite":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: "https://tabuisrael.co.il",
        name: isRTL ? "טאבו ישראל - נסח טאבו רשמי תוך דקות" : "TabuIsrael - Official Land Registry Documents",
        description: isRTL
          ? "הזמנת נסח טאבו רשמי ומעודכן לפי גוש, חלקה וכתובת – 100% דיגיטלי ומאובטח."
          : "Order official Israeli Land Registry documents by block, parcel, or address - 100% digital and secure.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://tabuisrael.co.il/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
        inLanguage: isRTL ? "he-IL" : "en-US",
      }
      break

    case "BreadcrumbList":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement:
          data?.breadcrumbs?.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: isRTL ? item.nameHe : item.nameEn,
            item: `https://tabuisrael.co.il${item.url}`,
          })) || [],
      }
      break
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
