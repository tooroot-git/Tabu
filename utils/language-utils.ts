/**
 * Utility functions for language detection and translation
 * that don't rely on context providers
 */

/**
 * Determines if the current path is for Hebrew content
 * @param path The current path
 * @returns boolean indicating if the content should be in Hebrew
 */
export function isHebrewPath(path: string | null): boolean {
  if (!path) return true // Default to Hebrew
  return !path.startsWith("/en")
}

/**
 * Simple translation function that doesn't rely on context
 * @param key The translation key
 * @param language The language code
 * @returns The translated string
 */
export function getTranslation(key: string, isHebrew: boolean): string {
  const translations: Record<string, Record<string, string>> = {
    errorTitle: {
      he: "שגיאה",
      en: "Error Occurred",
    },
    errorMessage: {
      he: "אנו מתנצלים, אירעה שגיאה בעת טעינת העמוד. אנא נסה שוב.",
      en: "We apologize, but an error occurred while loading the page. Please try again.",
    },
    tryAgain: {
      he: "נסה שוב",
      en: "Try Again",
    },
    backToHome: {
      he: "חזרה לדף הבית",
      en: "Back to Home",
    },
  }

  const lang = isHebrew ? "he" : "en"
  return translations[key]?.[lang] || key
}
