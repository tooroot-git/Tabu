import Link from "next/link"

export default function NotFound() {
  // Since this is a server component, we need to handle translations differently
  const hebrewContent = {
    title: "404 - דף לא נמצא",
    message: "הדף שחיפשת אינו קיים או שהוסר.",
    backHome: "חזרה לדף הבית",
  }

  const englishContent = {
    title: "404 - Page Not Found",
    message: "The page you were looking for doesn't exist or has been removed.",
    backHome: "Back to Home",
  }

  // Detect language from URL
  const isEnglish = typeof window !== "undefined" && window.location.pathname.startsWith("/en")
  const content = isEnglish ? englishContent : hebrewContent

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">{content.title}</h1>
      <p className="mb-8 text-lg">{content.message}</p>
      <Link
        href={isEnglish ? "/en" : "/"}
        className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
      >
        {content.backHome}
      </Link>
    </div>
  )
}
