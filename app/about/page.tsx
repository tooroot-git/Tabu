"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { Shield, Award, Clock, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
        <section className="relative overflow-hidden py-24">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-700/20 blur-[120px]"></div>
            <div className="absolute top-[20%] right-[5%] h-[400px] w-[700px] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-[120px]"></div>
            <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                {isRTL ? "אודות TabuIsrael" : "About TabuIsrael"}
              </h1>
              <p className="mt-6 text-xl text-gray-400">
                {isRTL
                  ? "אנו מספקים גישה מהירה, בטוחה ונוחה למסמכי רישום מקרקעין רשמיים בישראל"
                  : "We provide fast, secure, and convenient access to official land registry documents in Israel"}
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[10%] right-[20%] h-[400px] w-[600px] rounded-full bg-gradient-to-l from-primary-500/10 to-blue-500/10 blur-[120px]"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                {isRTL ? "המשימה שלנו" : "Our Mission"}
              </h2>
              <div className={`mt-8 text-lg text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
                <p className="mb-4">
                  {isRTL
                    ? "ב-TabuIsrael, המשימה שלנו היא להפוך את תהליך השגת מסמכי רישום מקרקעין רשמיים לפשוט, מהיר ונגיש לכולם."
                    : "At TabuIsrael, our mission is to make the process of obtaining official land registry documents simple, fast, and accessible to everyone."}
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
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-600/10 to-primary-600/10 blur-[120px]"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              {isRTL ? "למה לבחור בנו" : "Why Choose Us"}
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl border border-gray-800 bg-gray-900/80 p-8 text-center transition-all duration-300 hover:border-primary-500/50 hover:bg-gray-900 hover:shadow-lg hover:shadow-primary-500/5"
                >
                  <div className="absolute -inset-px z-0 rounded-xl bg-gradient-to-br from-primary-500/20 via-transparent to-transparent opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10 text-primary-500 transition-all duration-300 group-hover:bg-primary-500/20">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-white">{isRTL ? feature.titleHe : feature.titleEn}</h3>
                    <p className="mt-2 text-base text-gray-400">
                      {isRTL ? feature.descriptionHe : feature.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[30%] left-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-r from-primary-500/10 to-blue-500/5 blur-[100px]"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                {isRTL ? "הצוות שלנו" : "Our Team"}
              </h2>
              <p className="mt-6 text-center text-xl text-gray-400">
                {isRTL
                  ? 'הצוות שלנו מורכב ממומחי נדל"ן, משפטנים ומומחי טכנולוגיה המחויבים לספק לך את השירות הטוב ביותר'
                  : "Our team consists of real estate experts, legal professionals, and technology specialists dedicated to providing you with the best service"}
              </p>

              <div className="mt-12 space-y-8">
                <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white">{isRTL ? "יועצים משפטיים" : "Legal Advisors"}</h3>
                  <p className="mt-4 text-gray-400">
                    {isRTL
                      ? 'צוות היועצים המשפטיים שלנו מורכב מעורכי דין מנוסים המתמחים בדיני מקרקעין. הם מבטיחים שכל המסמכים שאנו מספקים עומדים בכל הדרישות החוקיות ומספקים ייעוץ מקצועי בנושאי רישום מקרקעין, זכויות קנייניות, ועסקאות נדל"ן.'
                      : "Our legal team consists of experienced attorneys specializing in real estate law. They ensure that all documents we provide meet all legal requirements and offer professional advice on land registration issues, property rights, and real estate transactions."}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white">{isRTL ? "מומחי טכנולוגיה" : "Technology Experts"}</h3>
                  <p className="mt-4 text-gray-400">
                    {isRTL
                      ? "מומחי הטכנולוגיה שלנו פיתחו מערכת מתקדמת המתממשקת ישירות עם מאגרי המידע הרשמיים של רשם המקרקעין. הם מבטיחים שהפלטפורמה שלנו מאובטחת, מהירה ואמינה, ועובדים ללא הרף על שיפור חווית המשתמש ויעילות המערכת."
                      : "Our technology experts have developed an advanced system that interfaces directly with the official databases of the Land Registry. They ensure our platform is secure, fast, and reliable, and work tirelessly to improve user experience and system efficiency."}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white">{isRTL ? 'מומחי נדל"ן' : "Real Estate Specialists"}</h3>
                  <p className="mt-4 text-gray-400">
                    {isRTL
                      ? 'מומחי הנדל"ן שלנו מביאים ניסיון עשיר בשוק הנדל"ן הישראלי. הם מבינים את הצרכים הייחודיים של לקוחות שונים - מרוכשי דירות פרטיים ועד משקיעים מוסדיים - ומסייעים בהתאמת השירותים שלנו לצרכים אלה.'
                      : "Our real estate specialists bring extensive experience in the Israeli real estate market. They understand the unique needs of different clients - from private home buyers to institutional investors - and help tailor our services to these needs."}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white">
                    {isRTL ? "צוות שירות לקוחות" : "Customer Support Team"}
                  </h3>
                  <p className="mt-4 text-gray-400">
                    {isRTL
                      ? "צוות שירות הלקוחות המסור שלנו זמין לענות על כל שאלה ולסייע בכל בעיה. הם עברו הכשרה מקיפה בכל ההיבטים של שירותינו ומחויבים לספק חווית לקוח יוצאת דופן."
                      : "Our dedicated customer support team is available to answer any questions and assist with any issues. They have been thoroughly trained in all aspects of our services and are committed to providing an exceptional customer experience."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-blue-600/10 to-transparent"></div>
            <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              {isRTL ? "מה לקוחותינו אומרים" : "What Our Customers Say"}
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-6 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-primary-500" />
                    ))}
                  </div>
                </div>
                <p className={`mt-4 text-gray-300 ${isRTL ? "text-right" : ""}`}>
                  {isRTL
                    ? '"שירות מעולה! קיבלתי את נסח הטאבו תוך דקות ספורות. חסך לי המון זמן וטרחה."'
                    : '"Excellent service! I received my Tabu extract within minutes. Saved me a lot of time and hassle."'}
                </p>
                <div className={`mt-4 ${isRTL ? "text-right" : ""}`}>
                  <p className="font-medium text-white">{isRTL ? "רונית ג." : "Ronit G."}</p>
                  <p className="text-sm text-gray-400">{isRTL ? 'עורכת דין נדל"ן' : "Real Estate Lawyer"}</p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-6 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-primary-500" />
                    ))}
                  </div>
                </div>
                <p className={`mt-4 text-gray-300 ${isRTL ? "text-right" : ""}`}>
                  {isRTL
                    ? '"הייתי צריך נסח טאבו דחוף לפגישה עם הבנק. הזמנתי דרך האתר וקיבלתי אותו תוך 5 דקות. מדהים!"'
                    : '"I needed an urgent Tabu extract for a meeting with the bank. I ordered through the website and received it within 5 minutes. Amazing!"'}
                </p>
                <div className={`mt-4 ${isRTL ? "text-right" : ""}`}>
                  <p className="font-medium text-white">{isRTL ? "יוסי מ." : "Yossi M."}</p>
                  <p className="text-sm text-gray-400">{isRTL ? 'משקיע נדל"ן' : "Real Estate Investor"}</p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/80 p-6 backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle key={i} className="h-5 w-5 text-primary-500" />
                    ))}
                  </div>
                </div>
                <p className={`mt-4 text-gray-300 ${isRTL ? "text-right" : ""}`}>
                  {isRTL
                    ? '"ממשק משתמש נוח ופשוט. התהליך היה קל ומהיר. אשתמש בשירות הזה שוב בעתיד."'
                    : '"User-friendly interface. The process was easy and fast. Will use this service again in the future."'}
                </p>
                <div className={`mt-4 ${isRTL ? "text-right" : ""}`}>
                  <p className="font-medium text-white">{isRTL ? "שרה ל." : "Sarah L."}</p>
                  <p className="text-sm text-gray-400">{isRTL ? 'סוכנת נדל"ן' : "Real Estate Agent"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-2xl border border-primary-500/20 bg-gradient-to-b from-gray-900 to-gray-900/95 p-12 text-center shadow-xl shadow-primary-500/5 backdrop-blur-sm">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {isRTL ? "מוכן להזמין נסח טאבו?" : "Ready to Order Your Tabu Extract?"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-300">
                {isRTL
                  ? "קבל את המסמך שלך תוך דקות, ישירות למייל"
                  : "Get your document in minutes, delivered straight to your email"}
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 py-6 text-lg font-medium text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                  asChild
                >
                  <Link href="/order">{isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
