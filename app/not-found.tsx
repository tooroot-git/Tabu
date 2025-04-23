"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MetaTags } from "@/components/seo/meta-tags"

export default function NotFound() {
  const { isRTL } = useLanguage()

  return (
    <>
      <MetaTags
        title={isRTL ? "דף לא נמצא | טאבוי ישראל" : "Page Not Found | TabuIsrael"}
        description={
          isRTL
            ? "הדף שחיפשת לא נמצא. נסה לחפש בדפים אחרים באתר."
            : "The page you were looking for could not be found. Try searching for other pages on the site."
        }
        noindex={true}
      />

      <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
        <Header />

        <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <h1 className="text-6xl font-bold text-primary-500">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-white">{isRTL ? "הדף לא נמצא" : "Page Not Found"}</h2>
          <p className="mt-2 text-gray-400 max-w-md">
            {isRTL
              ? "הדף שחיפשת לא נמצא. ייתכן שהוא הוסר, שונה שמו, או שאינו זמין כרגע."
              : "The page you were looking for doesn't exist. It may have been moved, renamed, or is temporarily unavailable."}
          </p>
          <Button className="mt-8" asChild>
            <Link href="/">{isRTL ? "חזרה לדף הבית" : "Return to Home"}</Link>
          </Button>
        </main>

        <Footer />
      </div>
    </>
  )
}
