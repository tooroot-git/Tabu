"use client"

import { useLanguage } from "@/context/language-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
  const { isRTL } = useLanguage()

  const sections = [
    {
      titleEn: "1. Acceptance of Terms",
      titleHe: "1. קבלת תנאים",
      contentEn:
        "By accessing and using the TabuIsrael website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services. These Terms of Service constitute a legally binding agreement between you and Open Source Intelligence LLC, the operator of TabuIsrael.",
      contentHe:
        "על ידי גישה ושימוש באתר ובשירותים של TabuIsrael, אתה מאשר כי קראת, הבנת ומסכים להיות מחויב לתנאי שירות אלה. אם אינך מסכים לחלק כלשהו מתנאים אלה, אינך רשאי להשתמש בשירותים שלנו. תנאי שירות אלה מהווים הסכם מחייב משפטית בינך לבין Open Source Intelligence LLC, המפעילה של TabuIsrael.",
    },
    {
      titleEn: "2. Service Description",
      titleHe: "2. תיאור השירות",
      contentEn:
        "TabuIsrael provides online access to official Land Registry (Tabu) documents in Israel. Our service allows users to order and receive digital copies of these documents. The documents provided through our service are official extracts from the Israel Land Registry and are digitally signed. We act as an intermediary service that facilitates the retrieval of these documents from the official government databases.",
      contentHe:
        "TabuIsrael מספק גישה מקוונת למסמכי רישום מקרקעין (טאבו) רשמיים בישראל. השירות שלנו מאפשר למשתמשים להזמין ולקבל עותקים דיגיטליים של מסמכים אלה. המסמכים המסופקים באמצעות השירות שלנו הם נסחים רשמיים מרשם המקרקעין בישראל והם חתומים דיגיטלית. אנו פועלים כשירות מתווך המסייע בהשגת מסמכים אלה ממאגרי המידע הממשלתיים הרשמיים.",
    },
    {
      titleEn: "3. User Obligations",
      titleHe: "3. התחייבויות המשתמש",
      contentEn:
        "Users are responsible for providing accurate information when ordering documents. Users must not use our service for any illegal or unauthorized purpose. Users are responsible for maintaining the confidentiality of their account information. You agree not to use the service to conduct any activity that would constitute a civil or criminal offense or violate any local, state, national or international law. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission from Open Source Intelligence LLC.",
      contentHe:
        "המשתמשים אחראים לספק מידע מדויק בעת הזמנת מסמכים. המשתמשים אינם רשאים להשתמש בשירות שלנו לכל מטרה בלתי חוקית או בלתי מורשית. המשתמשים אחראים לשמור על סודיות פרטי החשבון שלהם. אתה מסכים שלא להשתמש בשירות לביצוע כל פעילות שתהווה עבירה אזרחית או פלילית או תפר כל חוק מקומי, מדינתי, לאומי או בינלאומי. אתה מסכים שלא לשכפל, להעתיק, למכור, למכור מחדש או לנצל כל חלק מהשירות ללא אישור מפורש בכתב מ-Open Source Intelligence LLC.",
    },
    {
      titleEn: "4. Payment and Refunds",
      titleHe: "4. תשלום והחזרים",
      contentEn:
        "All payments are processed securely through our payment providers. Prices for our services are clearly displayed before purchase. Due to the immediate delivery of digital documents, refunds are generally not provided unless there is a technical issue on our part that prevents document delivery. In such cases, we will either resolve the issue and provide the document or issue a full refund. We reserve the right to change our prices at any time. Any price changes will not affect orders that have already been confirmed.",
      contentHe:
        "כל התשלומים מעובדים באופן מאובטח באמצעות ספקי התשלום שלנו. המחירים עבור השירותים שלנו מוצגים בבירור לפני הרכישה. בשל המסירה המיידית של מסמכים דיגיטליים, החזרים בדרך כלל אינם ניתנים אלא אם כן יש בעיה טכנית מצדנו שמונעת את מסירת המסמך. במקרים כאלה, אנו נפתור את הבעיה ונספק את המסמך או ננפיק החזר כספי מלא. אנו שומרים לעצמנו את הזכות לשנות את המחירים שלנו בכל עת. שינויי מחירים לא ישפיעו על הזמנות שכבר אושרו.",
    },
    {
      titleEn: "5. Privacy Policy",
      titleHe: "5. מדיניות פרטיות",
      contentEn:
        "We respect your privacy and are committed to protecting your personal data. Our Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services. By using our services, you consent to the collection and use of information in accordance with our Privacy Policy. We implement appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information.",
      contentHe:
        "אנו מכבדים את פרטיותך ומחויבים להגן על הנתונים האישיים שלך. מדיניות הפרטיות שלנו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלך כאשר אתה משתמש באתר ובשירותים שלנו. על ידי שימוש בשירותים שלנו, אתה מסכים לאיסוף ושימוש במידע בהתאם למדיניות הפרטיות שלנו. We implement appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information.",
    },
  ]

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      <main className="container mx-auto py-12">
        <h1 className="text-2xl font-bold mb-8">Terms of Service</h1>
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{isRTL ? section.titleHe : section.titleEn}</h2>
            <p className="text-gray-700">{isRTL ? section.contentHe : section.contentEn}</p>
          </div>
        ))}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">הגבלת אחריות</h2>
          <p className="mb-4">
            חברת Open Source Intelligence LLC, המפעילה את אתר TabuIsrael, אינה אחראית לכל נזק ישיר, עקיף, מקרי, מיוחד או
            תוצאתי הנובע מהשימוש או חוסר היכולת להשתמש בשירותים המוצעים באתר.
          </p>
          <p className="mb-4">
            המידע המסופק באמצעות השירות מתקבל ממקורות רשמיים, אך איננו מתחייבים לדיוק מוחלט של המידע. האחריות לאימות
            המידע ולשימוש בו היא על המשתמש בלבד.
          </p>
          <p className="mb-4">
            השירותים מסופקים "כפי שהם" (AS IS) ללא כל אחריות מכל סוג שהוא, מפורשת או משתמעת, לרבות אך לא רק, אחריות
            משתמעת לסחירות, התאמה למטרה מסוימת ואי-הפרה.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">שיפוי</h2>
          <p className="mb-4">
            המשתמש מסכים לשפות ולהגן על חברת Open Source Intelligence LLC, מנהליה, עובדיה, סוכניה ושותפיה מפני כל תביעה,
            נזק, חבות, עלות והוצאה (כולל שכר טרחת עורכי דין) הנובעים מהפרת תנאי השימוש אלה על ידי המשתמש או מכל שימוש
            לרעה בשירותים.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">קניין רוחני</h2>
          <p className="mb-4">
            כל התוכן המוצג באתר TabuIsrael, לרבות אך לא רק, טקסט, גרפיקה, לוגואים, סימנים מסחריים, תמונות, קוד תוכנה
            ועיצוב האתר, הינו קניינה הבלעדי של חברת Open Source Intelligence LLC או של ספקי התוכן שלה, ומוגן על ידי חוקי
            זכויות יוצרים וקניין רוחני.
          </p>
          <p className="mb-4">
            אין להעתיק, להפיץ, לשכפל, להציג בפומבי, לבצע, לשדר, לפרסם, להתאים, ליצור יצירות נגזרות או לנצל בכל דרך אחרת
            כל חלק מהתוכן ללא אישור מפורש בכתב מאת החברה.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
