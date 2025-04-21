"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"

export default function PrivacyPage() {
  const { isRTL } = useLanguage()

  const sections = [
    {
      titleEn: "1. Information We Collect",
      titleHe: "1. מידע שאנו אוספים",
      contentEn:
        "We collect personal information that you voluntarily provide to us when you use our services, such as your name, email address, phone number, and property details. We also collect payment information, but this is processed securely by our payment providers and we do not store your full credit card details.",
      contentHe:
        "אנו אוספים מידע אישי שאתה מספק לנו מרצונך כאשר אתה משתמש בשירותים שלנו, כגון שמך, כתובת האימייל שלך, מספר הטלפון שלך ופרטי הנכס. אנו גם אוספים פרטי תשלום, אך אלה מעובדים באופן מאובטח על ידי ספקי התשלום שלנו ואיננו שומרים את פרטי כרטיס האשראי המלאים שלך.",
    },
    {
      titleEn: "2. How We Use Your Information",
      titleHe: "2. כיצד אנו משתמשים במידע שלך",
      contentEn:
        "We use your personal information to provide and improve our services, process your orders, communicate with you, and comply with legal obligations. We may also use your information to send you updates about our services, but you can opt out of these communications at any time.",
      contentHe:
        "אנו משתמשים במידע האישי שלך כדי לספק ולשפר את השירותים שלנו, לעבד את ההזמנות שלך, לתקשר איתך ולעמוד בהתחייבויות חוקיות. אנו עשויים גם להשתמש במידע שלך כדי לשלוח לך עדכונים על השירותים שלנו, אך תוכל לבטל את ההרשמה לתקשורת זו בכל עת.",
    },
    {
      titleEn: "3. Information Sharing and Disclosure",
      titleHe: "3. שיתוף וגילוי מידע",
      contentEn:
        "We do not sell, trade, or otherwise transfer your personal information to outside parties except as described in this policy. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.",
      contentHe:
        "איננו מוכרים, סוחרים או מעבירים בדרך אחרת את המידע האישי שלך לגורמים חיצוניים למעט כמתואר במדיניות זו. אנו עשויים לשתף את המידע שלך עם צדדים שלישיים אמינים המסייעים לנו בהפעלת האתר שלנו, בניהול העסק שלנו או בשירות שלך, כל עוד אותם צדדים מסכימים לשמור על מידע זה בסודיות.",
    },
    {
      titleEn: "4. Data Security",
      titleHe: "4. אבטחת נתונים",
      contentEn:
        "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.",
      contentHe:
        "אנו מיישמים מגוון אמצעי אבטחה כדי לשמור על בטיחות המידע האישי שלך. המידע האישי שלך מוכל מאחורי רשתות מאובטחות ונגיש רק למספר מוגבל של אנשים בעלי זכויות גישה מיוחדות למערכות כאלה.",
    },
    {
      titleEn: "5. Cookies and Tracking Technologies",
      titleHe: "5. קובצי עוגיות וטכנולוגיות מעקב",
      contentEn:
        "We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
      contentHe:
        "אנו משתמשים בעוגיות וטכנולוגיות מעקב דומות כדי לעקוב אחר הפעילות באתר שלנו ולהחזיק מידע מסוים. עוגיות הן קבצים עם כמות קטנה של נתונים שעשויים לכלול מזהה ייחודי אנונימי. אתה יכול להורות לדפדפן שלך לסרב לכל העוגיות או לציין מתי עוגייה נשלחת.",
    },
    {
      titleEn: "6. Third-Party Links",
      titleHe: "6. קישורים לצד שלישי",
      contentEn:
        "Our website may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites.",
      contentHe:
        "האתר שלנו עשוי להכיל קישורים לאתרים אחרים. אם תלחץ על קישור של צד שלישי, תופנה לאתר זה. שים לב שאתרים חיצוניים אלה אינם מופעלים על ידינו. לכן, אנו ממליצים לך בחום לעיין במדיניות הפרטיות של אתרים אלה.",
    },
    {
      titleEn: "7. Children's Privacy",
      titleHe: "7. פרטיות ילדים",
      contentEn:
        "Our services are not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.",
      contentHe:
        "השירותים שלנו אינם מיועדים לשימוש על ידי ילדים מתחת לגיל 18. איננו אוספים ביודעין מידע אישי מילדים מתחת לגיל 18. אם אתה הורה או אפוטרופוס ואתה מודע לכך שילדך סיפק לנו מידע אישי, אנא צור איתנו קשר.",
    },
    {
      titleEn: "8. Changes to This Privacy Policy",
      titleHe: "8. שינויים במדיניות פרטיות זו",
      contentEn:
        "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.",
      contentHe:
        "אנו עשויים לעדכן את מדיניות הפרטיות שלנו מעת לעת. אנו נודיע לך על כל שינוי על ידי פרסום מדיניות הפרטיות החדשה בדף זה. מומלץ לעיין במדיניות פרטיות זו מעת לעת לאיתור שינויים.",
    },
    {
      titleEn: "9. Contact Us",
      titleHe: "9. צור קשר",
      contentEn: "If you have any questions about this Privacy Policy, please contact us at privacy@tabu.net.il.",
      contentHe: "אם יש לך שאלות כלשהן לגבי מדיניות פרטיות זו, אנא צור איתנו קשר בכתובת privacy@tabu.net.il.",
    },
  ]

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center md:text-5xl">
              {isRTL ? "מדיניות פרטיות" : "Privacy Policy"}
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
