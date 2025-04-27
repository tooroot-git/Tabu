"use client"

import { useLanguage } from "@/context/language-context"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"
import { DashboardCTA } from "@/components/home/dashboard-cta"
import { MetaTags } from "@/components/seo/meta-tags"
import { StructuredData } from "@/components/seo/structured-data"
import { HeroSection } from "@/components/home/hero-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  const { isRTL } = useLanguage()

  return (
    <>
      <MetaTags
        title={
          isRTL ? "טאבו ישראל - נסחי טאבו רשמיים באופן מקוון" : "Tabu Israel - Official Land Registry Documents Online"
        }
        description={
          isRTL
            ? "הזמן נסח טאבו רשמי באופן מקוון, מהיר ומאובטח. קבל את המסמך הרשמי ישירות למייל תוך דקות."
            : "Order official Land Registry documents online quickly and securely. Receive certified digital documents directly to your inbox."
        }
      />
      <StructuredData />

      <Header />
      <main dir={isRTL ? "rtl" : "ltr"}>
        <HeroSection />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <DashboardCTA />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
