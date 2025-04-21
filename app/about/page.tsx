"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { Shield, Award, Clock, Users, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const { isRTL } = useLanguage()

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      titleEn: "Official & Legally Valid",
      titleHe: "רשמי ותקף משפטית",
      descriptionEn: "All documents are official extracts from the Israel Land Registry with full legal validity.",
      descriptionHe: "כל המסמכים הם נסחים רשמיים מרשם המקרקעין בישראל עם תוקף משפטי מלא.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      titleEn: "Certified Digital Signature",
      titleHe: "חתימה דיגיטלית מאושרת",
      descriptionEn: "Our documents include a secure digital signature that ensures their authenticity and validity.",
      descriptionHe: "המסמכים שלנו כוללים חתימה דיגיטלית מאובטחת המבטיחה את האותנטיות והתוקף שלהם.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      titleEn: "Instant Delivery",
      titleHe: "משלוח מיידי",
      descriptionEn: "Receive your documents instantly via email after payment, no waiting required.",
      descriptionHe: "קבל את המסמכים שלך מיידית באימייל לאחר התשלום, ללא צורך בהמתנה.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      titleEn: "Expert Support",
      titleHe: "תמיכה מקצועית",
      descriptionEn: "Our team of experts is available to assist you with any questions or issues.",
      descriptionHe: "צוות המומחים שלנו זמין לסייע לך בכל שאלה או בעיה.",
    },
  ]

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                {isRTL ? "אודות Tabu.net.il" : "About Tabu.net.il"}
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                {isRTL
                  ? "אנו מספקים גישה מהירה, בטוחה ונוחה למסמכי רישום מקרקעין רשמיים בישראל"
                  : "We provide fast, secure, and convenient access to official land registry documents in Israel"}
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center md:text-4xl">
                {isRTL ? "המשימה שלנו" : "Our Mission"}
              </h2>
              <div className={`mt-8 text-lg text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
                <p className="mb-4">
                  {isRTL
                    ? "ב-Tabu.net.il, המשימה שלנו היא להפוך את תהליך השגת מסמכי רישום מקרקעין רשמיים לפשוט, מהיר ונגיש לכולם."
                    : "At Tabu.net.il, our mission is to make the process of obtaining official land registry documents simple, fast, and accessible to everyone."}
                </p>
                <p className="mb-4">
                  {isRTL
                    ? 'אנו מבינים את החשיבות של מסמכים אלה בעסקאות נדל"ן, תכנון פיננסי, וענייני משפט, ומחויבים לספק שירות אמין ויעיל שחוסך לך זמן, כסף ומאמץ.'
                    : "We understand the importance of these documents in real estate transactions, financial planning, and legal matters, and are committed to providing a reliable and efficient service that saves you time, money, and effort."}
                </p>
                <p>
                  {isRTL
                    ? "הפלטפורמה שלנו מחוברת ישירות למאגרי המידע הרשמיים של רשם המקרקעין בישראל, מה שמבטיח שתקבל תמיד את המידע העדכני והמדויק ביותר."
                    : "Our platform connects directly to the official databases of the Israel Land Registry, ensuring that you always receive the most up-to-date and accurate information."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center md:text-4xl">
              {isRTL ? "למה לבחור בנו" : "Why Choose Us"}
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{isRTL ? feature.titleHe : feature.titleEn}</h3>
                  <p className="mt-2 text-base text-gray-600">
                    {isRTL ? feature.descriptionHe : feature.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center md:text-4xl">
                {isRTL ? "הצוות שלנו" : "Our Team"}
              </h2>
              <p className="mt-6 text-xl text-gray-600 text-center">
                {isRTL
                  ? 'הצוות שלנו מורכב ממומחי נדל"ן, משפטנים ומומחי טכנולוגיה המחויבים לספק לך את השירות הטוב ביותר'
                  : "Our team consists of real estate experts, legal professionals, and technology specialists dedicated to providing you with the best service"}
              </p>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full bg-gray-200"></div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{isRTL ? "דניאל כהן" : "Daniel Cohen"}</h3>
                  <p className="text-sm text-gray-600">{isRTL ? 'מנכ"ל ומייסד' : "CEO & Founder"}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full bg-gray-200"></div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{isRTL ? "מיכל לוי" : "Michal Levy"}</h3>
                  <p className="text-sm text-gray-600">{isRTL ? "יועצת משפטית" : "Legal Advisor"}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-32 w-32 rounded-full bg-gray-200"></div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{isRTL ? "אלון ישראלי" : "Alon Israeli"}</h3>
                  <p className="text-sm text-gray-600">{isRTL ? "מנהל טכנולוגיות" : "CTO"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center md:text-4xl">
              {isRTL ? "מה לקוחותינו אומרים" : "What Our Customers Say"}
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className={`mt-4 text-gray-600 ${isRTL ? "text-right" : ""}`}>
                  {isRTL
                    ? '"שירות מעולה! קיבלתי את נסח הטאבו תוך דקות ספורות. חסך לי המון זמן וטרחה."'
                    : '"Excellent service! I received my Tabu extract within minutes. Saved me a lot of time and hassle."'}
                </p>
                <div className={`mt-4 ${isRTL ? "text-right" : ""}`}>
                  <p className="font-medium text-gray-900">{isRTL ? "רונית ג." : "Ronit G."}</p>
                  <p className="text-sm text-gray-600">{isRTL ? 'עורכת דין נדל"ן' : "Real Estate Lawyer"}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className={`mt-4 text-gray-600 ${isRTL ? "text-right" : ""}`}>
                  {isRTL
                    ? '"הייתי צריך נסח טאבו דחוף לפגישה עם הבנק. הזמנתי דרך האתר וקיבלתי אותו תוך 5 דקות. מדהים!"'
                    : '"I needed an urgent Tabu extract for a meeting with the bank. I ordered through the website and received it within 5 minutes. Amazing!"'}
                </p>
                <div className={`mt-4 ${isRTL ? "text-right" : ""}`}>
                  <p className="font-medium text-gray-900">{isRTL ? "יוסי מ." : "Yossi M."}</p>
                  <p className="text-sm text-gray-600">{isRTL ? 'משקיע נדל"ן' : "Real Estate Investor"}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className={`mt-4 text-gray-600 ${isRTL ? "text-right" : ""}`}>
                  {isRTL
                    ? '"ממשק משתמש נוח ופשוט. התהליך היה קל ומהיר. אשתמש בשירות הזה שוב בעתיד."'
                    : '"User-friendly interface. The process was easy and fast. Will use this service again in the future."'}
                </p>
                <div className={`mt-4 ${isRTL ? "text-right" : ""}`}>
                  <p className="font-medium text-gray-900">{isRTL ? "שרה ל." : "Sarah L."}</p>
                  <p className="text-sm text-gray-600">{isRTL ? 'סוכנת נדל"ן' : "Real Estate Agent"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
