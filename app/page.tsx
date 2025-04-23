"use client"
import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"
import { useLanguage } from "@/context/language-context"
import { MetaTags } from "@/components/seo/meta-tags"
import { StructuredData } from "@/components/seo/structured-data"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  const { isRTL } = useLanguage()

  const title = isRTL
    ? "טאבוי ישראל – נסח טאבו רשמי תוך דקות"
    : "TabuIsrael - Official Land Registry Documents in Minutes"

  const description = isRTL
    ? "הזמנת נסח טאבו רשמי ומעודכן לפי גוש, חלקה וכתובת – 100% דיגיטלי ומאובטח. קבל נסח תוך דקות למייל."
    : "Order official Israeli Land Registry documents by block, parcel, or address - 100% digital and secure. Get your document in minutes."

  return (
    <>
      <MetaTags title={title} description={description} />
      <StructuredData type="Organization" />

      <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
        <Header />
        <main id="main-content" role="main" aria-label={isRTL ? "תוכן ראשי" : "Main content"}>
          <Hero />
          <Features />
          <HowItWorks />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}
