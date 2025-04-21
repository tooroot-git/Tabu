"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"

export default function TermsPage() {
  const { isRTL } = useLanguage()

  const sections = [
    {
      titleEn: "1. Acceptance of Terms",
      titleHe: "1. קבלת תנאים",
      contentEn:
        "By accessing and using the Tabu.net.il website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.",
      contentHe:
        "על ידי גישה ושימוש באתר ובשירותים של Tabu.net.il, אתה מאשר כי קראת, הבנת ומסכים להיות מחויב לתנאי שירות אלה. אם אינך מסכים לחלק כלשהו מתנאים אלה, אינך רשאי להשתמש בשירותים שלנו.",
    },
    {
      titleEn: "2. Service Description",
      titleHe: "2. תיאור השירות",
      contentEn:
        "Tabu.net.il provides online access to official Land Registry (Tabu) documents in Israel. Our service allows users to order and receive digital copies of these documents. The documents provided through our service are official extracts from the Israel Land Registry and are digitally signed.",
      contentHe:
        "Tabu.net.il מספק גישה מקוונת למסמכי רישום מקרקעין (טאבו) רשמיים בישראל. השירות שלנו מאפשר למשתמשים להזמין ולקבל עותקים דיגיטליים של מסמכים אלה. המסמכים המסופקים באמצעות השירות שלנו הם נסחים רשמיים מרשם המקרקעין בישראל והם חתומים דיגיטלית.",
    },
    {
      titleEn: "3. User Obligations",
      titleHe: "3. התחייבויות המשתמש",
      contentEn:
        "Users are responsible for providing accurate information when ordering documents. Users must not use our service for any illegal or unauthorized purpose. Users are responsible for maintaining the confidentiality of their account information.",
      contentHe:
        "המשתמשים אחראים לספק מידע מדויק בעת הזמנת מסמכים. המשתמשים אינם רשאים להשתמש בשירות שלנו לכל מטרה בלתי חוקית או בלתי מורשית. המשתמשים אחראים לשמור על סודיות פרטי החשבון שלהם.",
    },
    {
      titleEn: "4. Payment and Refunds",
      titleHe: "4. תשלום והחזרים",
      contentEn:
        "All payments are processed securely through our payment providers. Prices for our services are clearly displayed before purchase. Due to the immediate delivery of digital documents, refunds are generally not provided unless there is a technical issue on our part that prevents document delivery.",
      contentHe:
        "כל התשלומים מעובדים באופן מאובטח באמצעות ספקי התשלום שלנו. המחירים עבור השירותים שלנו מוצגים בבירור לפני הרכישה. בשל המסירה המיידית של מסמכים דיגיטליים, החזרים בדרך כלל אינם ניתנים אלא אם כן יש בעיה טכנית מצדנו שמונעת את מסירת המסמך.",
    },
    {
      titleEn: "5. Privacy Policy",
      titleHe: "5. מדיניות פרטיות",
      contentEn:
        "We respect your privacy and are committed to protecting your personal data. Our Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.",
      contentHe:
        "אנו מכבדים את פרטיותך ומחויבים להגן על הנתונים האישיים שלך. מדיניות הפרטיות שלנו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלך כאשר אתה משתמש באתר ובשירותים שלנו.",
    },
    {
      titleEn: "6. Intellectual Property",
      titleHe: "6. קניין רוחני",
      contentEn:
        "All content on the Tabu.net.il website, including text, graphics, logos, and software, is the property of Tabu.net.il or its content suppliers and is protected by Israeli and international copyright laws.",
      contentHe:
        "כל התוכן באתר Tabu.net.il, כולל טקסט, גרפיקה, לוגואים ותוכנה, הוא רכושה של Tabu.net.il או ספקי התוכן שלה ומוגן על ידי חוקי זכויות יוצרים ישראליים ובינלאומיים.",
    },
    {
      titleEn: "7. Limitation of Liability",
      titleHe: "7. הגבלת אחריות",
      contentEn:
        "Tabu.net.il provides documents as they appear in the official Land Registry. We are not responsible for the accuracy of the information contained in these documents. Our service is provided on an 'as is' and 'as available' basis without warranties of any kind.",
      contentHe:
        "Tabu.net.il מספקת מסמכים כפי שהם מופיעים ברישום המקרקעין הרשמי. איננו אחראים לדיוק המידע הכלול במסמכים אלה. השירות שלנו ניתן על בסיס 'כמות שהוא' ו'כפי שהוא זמין' ללא אחריות מכל סוג שהוא.",
    },
    {
      titleEn: "8. Changes to Terms",
      titleHe: "8. שינויים בתנאים",
      contentEn:
        "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on the website. Your continued use of our service after any changes indicates your acceptance of the new terms.",
      contentHe:
        "אנו שומרים לעצמנו את הזכות לשנות את תנאי השירות הללו בכל עת. השינויים יכנסו לתוקף מיד עם פרסומם באתר. המשך השימוש שלך בשירות שלנו לאחר שינויים כלשהם מעיד על הסכמתך לתנאים החדשים.",
    },
    {
      titleEn: "9. Governing Law",
      titleHe: "9. חוק שולט",
      contentEn:
        "These Terms of Service shall be governed by and construed in accordance with the laws of the State of Israel, without regard to its conflict of law provisions.",
      contentHe: "תנאי שירות אלה יהיו כפופים ויפורשו בהתאם לחוקי מדינת ישראל, ללא התחשבות בהוראות סתירת החוק שלה.",
    },
    {
      titleEn: "10. Contact Information",
      titleHe: "10. פרטי קשר",
      contentEn: "If you have any questions about these Terms of Service, please contact us at support@tabu.net.il.",
      contentHe: "אם יש לך שאלות כלשהן לגבי תנאי שירות אלה, אנא צור איתנו קשר בכתובת support@tabu.net.il.",
    },
  ]

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center md:text-5xl">
              {isRTL ? "תנאי שימוש" : "Terms of Service"}
            </h1>
            <p className="mt-6 text-xl text-gray-600 text-center">
              {isRTL ? "עודכן לאחרונה: 1 במאי, 2023" : "Last Updated: May 1, 2023"}
            </p>

            <div className="mt-12 space-y-8">
              {sections.map((section, index) => (
                <div key={index} className={isRTL ? "text-right" : ""}>
                  <h2 className="text-xl font-bold text-gray-900">{isRTL ? section.titleHe : section.titleEn}</h2>
                  <p className="mt-2 text-gray-600">{isRTL ? section.contentHe : section.contentEn}</p>
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
