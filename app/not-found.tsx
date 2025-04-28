export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-4xl font-bold">דף לא נמצא</h2>
      <p className="mb-8 text-lg">העמוד שחיפשת אינו קיים.</p>
      <a href="/" className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
        חזרה לדף הבית
      </a>
    </div>
  )
}
