"use client"
import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"
import { useLanguage } from "@/context/language-context"

export default function HomePage() {
  const { isRTL } = useLanguage()

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  )
}
