"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { isHebrewPath, getTranslation } from "@/utils/language-utils"
import Link from "next/link"

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const isHebrew = isHebrewPath(pathname)

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-4xl font-bold">{getTranslation("errorTitle", isHebrew)}</h2>
      <p className="mb-8 text-lg">{getTranslation("errorMessage", isHebrew)}</p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <button
          onClick={() => reset()}
          className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          {getTranslation("tryAgain", isHebrew)}
        </button>
        <Link
          href={isHebrew ? "/" : "/en"}
          className="rounded-md border border-gray-300 bg-transparent px-6 py-3 text-white transition-colors hover:bg-gray-700"
        >
          {getTranslation("backToHome", isHebrew)}
        </Link>
      </div>
    </div>
  )
}
