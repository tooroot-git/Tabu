"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { language, t } = useLanguage()
  const isHebrew = language === "he"

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">{isHebrew ? "אירעה שגיאה" : "Something went wrong"}</h1>
      <p className="mb-8 text-lg">
        {isHebrew
          ? "אנו מתנצלים, אירעה שגיאה בעת טעינת העמוד. אנא נסה שוב."
          : "We're sorry, but there was an error loading this page. Please try again."}
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          onClick={reset}
          className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          {isHebrew ? "נסה שוב" : "Try again"}
        </button>
        <Link
          href={isHebrew ? "/" : "/en"}
          className="rounded-md border border-gray-300 bg-transparent px-6 py-3 text-white transition-colors hover:bg-gray-700"
        >
          {isHebrew ? "חזרה לדף הבית" : "Back to Home"}
        </Link>
      </div>
    </div>
  )
}
