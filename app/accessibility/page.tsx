"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"

export default function AccessibilityPage() {
  const { isRTL } = useLanguage()

  const sections = [
    {
      titleEn: "Our Commitment to Accessibility",
      titleHe: "המחויבות שלנו לנגישות",
      contentEn:
        "At Tabu.net.il, we are committed to ensuring that our website is accessible to all users, including those with disabilities. We strive to comply with the Israeli Equal Rights for Persons with Disabilities Law and international accessibility standards.",
      contentHe:
        "ב-Tabu.net.il, אנו מחויבים להבטיח שהאתר שלנו נגיש לכל המשתמשים, כולל אנשים עם מוגבלויות. אנו שואפים לעמוד בחוק שוויון זכויות לאנשים עם מוגבלויות הישראלי ובתקני נגישות בינלאומיים.",
    },
    {
      titleEn: "Accessibility Features",
      titleHe: "תכונות נגישות",
      contentEn:
        "Our website includes the following accessibility features:\n\n- Keyboard navigation: All functionality is available using the keyboard\n- Screen reader compatibility: Our content is structured to work with screen readers\n- Text resizing: Users can resize text without loss of functionality\n- Color contrast: We maintain sufficient color contrast for text and important graphics\n- Form labels: All form fields have appropriate labels\n- Alternative text: Images have descriptive alternative text\n- Language selection: Support for both Hebrew (RTL) and English (LTR)",
      contentHe:
        "האתר שלנו כולל את תכונות הנגישות הבאות:\n\n- ניווט במקלדת: כל הפונקציונליות זמינה באמצעות המקלדת\n- תאימות לקורא מסך: התוכן שלנו מובנה לעבודה עם קוראי מסך\n- שינוי גודל טקסט: משתמשים יכולים לשנות את גודל הטקסט ללא אובדן פונקציונליות\n- ניגודיות צבעים: אנו שומרים על ניגודיות צבעים מספקת עבור טקסט וגרפיקה חשובה\n- תוויות טפסים: לכל שדות הטופס יש תוויות מתאימות\n- טקסט חלופי: לתמונות יש טקסט חלופי תיאורי\n- בחירת שפה: תמיכה הן בעברית (RTL) והן באנגלית (LTR)",
    },
    {
      titleEn: "Accessibility Guidelines",
      titleHe: "הנחיות נגישות",
      contentEn:
        "Our website is designed to conform to level AA of the Web Content Accessibility Guidelines (WCAG) 2.1. These guidelines explain how to make web content more accessible to people with disabilities.",
      contentHe:
        "האתר שלנו מתוכנן להתאים לרמה AA של הנחיות נגישות תוכן באינטרנט (WCAG) 2.1. הנחיות אלה מסבירות כיצד להפוך את תוכן האינטרנט לנגיש יותר לאנשים עם מוגבלויות.",
    },
    {
      titleEn: "Assistive Technologies",
      titleHe: "טכנולוגיות מסייעות",
      contentEn:
        "Our website is designed to be compatible with the following assistive technologies:\n\n- Screen readers (such as NVDA, JAWS, and VoiceOver)\n- Screen magnifiers\n- Speech recognition software\n- Keyboard-only navigation",
      contentHe:
        "האתר שלנו מתוכנן להיות תואם לטכנולוגיות המסייעות הבאות:\n\n- קוראי מסך (כגון NVDA, JAWS ו-VoiceOver)\n- מגדילי מסך\n- תוכנות זיהוי דיבור\n- ניווט באמצעות מקלדת בלבד",
    },
    {
      titleEn: "Known Limitations",
      titleHe: "מגבלות ידועות",
      contentEn:
        "While we strive to ensure that our website is accessible to all users, there may be some limitations. We are continuously working to improve our website's accessibility and address any issues that arise.",
      contentHe:
        "בעוד שאנו שואפים להבטיח שהאתר שלנו נגיש לכל המשתמשים, ייתכנו מגבלות מסוימות. אנו עובדים באופן מתמיד לשפר את נגישות האתר שלנו ולטפל בבעיות שעולות.",
    },
    {
      titleEn: "Feedback",
      titleHe: "משוב",
      contentEn:
        "We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us at accessibility@tabu.net.il.",
      contentHe:
        "אנו מקבלים בברכה את המשוב שלך על נגישות האתר שלנו. אם נתקלת במחסומי נגישות כלשהם או יש לך הצעות לשיפור, אנא צור איתנו קשר בכתובת accessibility@tabu.net.il.",
    },
  ]

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center md:text-5xl">
              {isRTL ? "הצהרת נגישות" : "Accessibility Statement"}
            </h1>
            <p className="mt-6 text-xl text-gray-600 text-center">
              {isRTL ? "עודכן לאחרונה: 1 במאי, 2023" : "Last Updated: May 1, 2023"}
            </p>

            <div className="mt-12 space-y-8">
              {sections.map((section, index) => (
                <div key={index} className={isRTL ? "text-right" : ""}>
                  <h2 className="text-xl font-bold text-gray-900">{isRTL ? section.titleHe : section.titleEn}</h2>
                  <div className="mt-2 text-gray-600 whitespace-pre-line">
                    {isRTL ? section.contentHe : section.contentEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
