import { HeroSection } from "@/components/home/hero-section"
import { QuickOrder } from "@/components/home/quick-order"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Testimonials } from "@/components/home/testimonials"
import { FAQ } from "@/components/home/faq"
import { CTA } from "@/components/home/cta"

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Add spacing to move QuickOrder down */}
      <div className="relative -mt-20 pb-16">
        <div className="container mx-auto px-4 pt-32">
          <QuickOrder />
        </div>
      </div>

      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  )
}
