import { HeroSection } from "@/components/home/hero-section"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "נסח טאבו רשמי תוך דקות | טאבו ישראל",
  description:
    "נסח טאבו חתום דיגיטלית אונליין תוך דקות. הזמנת נסח לפי גוש חלקה או כתובת. טאבו ישראל - שירות מהיר, מאובטח ומקצועי.",
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  )
}
