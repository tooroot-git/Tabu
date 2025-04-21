"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Shield, Clock, CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

export default function LandingPage() {
  const { language, isRTL } = useLanguage()

  const steps = [
    {
      icon: <FileText className="h-8 w-8" />,
      titleEn: "Enter Property Details",
      titleHe: "הזן פרטי נכס",
      descriptionEn: "Provide the Block (Gush), Parcel (Helka), and Sub-parcel (Tat-Helka) numbers.",
      descriptionHe: "הזן את מספרי הגוש, החלקה ותת-החלקה של הנכס.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      titleEn: "Select Document Type",
      titleHe: "בחר סוג מסמך",
      descriptionEn: "Choose from Regular Extract, Historical Extract, Full Extract, or Document Retrieval.",
      descriptionHe: "בחר מבין נסח רגיל, נסח היסטורי, נסח מלא או אחזור מסמך.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      titleEn: "Pay & Receive Instantly",
      titleHe: "שלם וקבל מיידית",
      descriptionEn: "Complete your payment securely and receive your document instantly via email.",
      descriptionHe: "השלם את התשלום באופן מאובטח וקבל את המסמך שלך מיידית באימייל.",
    },
  ]

  const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Official Documents",
      titleHe: "מסמכים רשמיים",
      descriptionEn: "All documents are official and legally valid extracts from the Israel Land Registry.",
      descriptionHe: "כל המסמכים הם נסחים רשמיים ותקפים משפטית מרשם המקרקעין בישראל.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Instant Delivery",
      titleHe: "משלוח מיידי",
      descriptionEn: "Receive your documents instantly via email after payment.",
      descriptionHe: "קבל את המסמכים שלך מיידית באימייל לאחר התשלום.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Secure & Private",
      titleHe: "מאובטח ופרטי",
      descriptionEn: "Your data is encrypted and protected with bank-level security.",
      descriptionHe: "המידע שלך מוצפן ומוגן ברמת אבטחה בנקאית.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "24/7 Availability",
      titleHe: "זמינות 24/7",
      descriptionEn: "Order documents any time, day or night, from anywhere.",
      descriptionHe: "הזמן מסמכים בכל זמן, יום או לילה, מכל מקום.",
    },
  ]

  const faqs = [
    {
      questionEn: "What is a Tabu Extract (Nesach Tabu)?",
      questionHe: "מהו נסח טאבו?",
      answerEn:
        "A Tabu Extract is an official document from the Israel Land Registry that provides information about property ownership, rights, mortgages, liens, and other legal details registered against a property.",
      answerHe:
        "נסח טאבו הוא מסמך רשמי מרשם המקרקעין בישראל המספק מידע על בעלות בנכס, זכויות, משכנתאות, שעבודים ופרטים משפטיים אחרים הרשומים כנגד נכס.",
    },
    {
      questionEn: "How do I find my Block (Gush) and Parcel (Helka) numbers?",
      questionHe: "איך אני מוצא את מספרי הגוש והחלקה שלי?",
      answerEn:
        "You can find these numbers on your property tax (Arnona) bill, previous Tabu extracts, or purchase agreements. If you don't have these, you can contact your local municipality or a real estate lawyer.",
      answerHe:
        'ניתן למצוא מספרים אלה בחשבון הארנונה שלך, בנסחי טאבו קודמים או בהסכמי רכישה. אם אין לך את אלה, תוכל לפנות לעירייה המקומית שלך או לעורך דין נדל"ן.',
    },
    {
      questionEn: "What's the difference between the document types?",
      questionHe: "מה ההבדל בין סוגי המסמכים?",
      answerEn:
        "A Regular Extract shows current ownership and rights. A Historical Extract includes past ownership changes. A Full Extract contains all registered information including detailed plans. Document Retrieval allows you to get a previously issued extract.",
      answerHe:
        "נסח רגיל מציג בעלות וזכויות נוכחיות. נסח היסטורי כולל שינויי בעלות בעבר. נסח מלא מכיל את כל המידע הרשום כולל תוכניות מפורטות. אחזור מסמך מאפשר לך לקבל נסח שהונפק בעבר.",
    },
    {
      questionEn: "How long is a Tabu Extract valid for?",
      questionHe: "לכמה זמן נסח טאבו תקף?",
      answerEn:
        "A Tabu Extract is valid as of the date it was issued. For most legal and financial purposes, extracts should be no older than 30 days, but requirements may vary depending on the intended use.",
      answerHe:
        "נסח טאבו תקף נכון לתאריך הנפקתו. לרוב המטרות המשפטיות והפיננסיות, נסחים צריכים להיות לא יותר מ-30 יום, אך הדרישות עשויות להשתנות בהתאם לשימוש המיועד.",
    },
    {
      questionEn: "Is my payment information secure?",
      questionHe: "האם פרטי התשלום שלי מאובטחים?",
      answerEn:
        "Yes, we use industry-standard SSL encryption and do not store your credit card details. All payments are processed through secure payment gateways that comply with PCI DSS standards.",
      answerHe:
        "כן, אנו משתמשים בהצפנת SSL בתקן תעשייתי ולא שומרים את פרטי כרטיס האשראי שלך. כל התשלומים מעובדים דרך שערי תשלום מאובטחים העומדים בתקני PCI DSS.",
    },
  ]

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className={`text-center md:text-left ${isRTL ? "md:text-right" : ""}`}>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                {isRTL
                  ? "הזמנת נסחי טאבו באופן מקוון, מהיר ופשוט"
                  : "Order Land Registry Documents Online, Fast & Simple"}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {isRTL
                  ? "קבל נסחי טאבו רשמיים באופן מיידי, ישירות למייל שלך"
                  : "Get official Tabu extracts instantly, delivered directly to your email"}
              </p>
              <div
                className={`mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 ${isRTL ? "sm:space-x-reverse" : ""} sm:space-x-4`}
              >
                <Button size="lg" className="text-base" asChild>
                  <Link href="/order">{isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base" asChild>
                  <Link href="/about">{isRTL ? "למד עוד" : "Learn More"}</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              {/* כאן נשתמש בתמונת נסח הטאבו שהמשתמש סיפק */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D7%A0%D7%A1%D7%97-%D7%98%D7%90%D7%91%D7%95-%D7%9C%D7%93%D7%95%D7%92%D7%9E%D7%90-%D7%95%D7%94%D7%A1%D7%91%D7%A8%D7%99%D7%9D-1466435373.jpg-zp3WJJJoyR0lvaNLyYlHyD11cM1wEI.jpeg"
                alt={isRTL ? "דוגמה לנסח טאבו" : "Sample Tabu Extract"}
                className="mx-auto rounded-lg shadow-lg"
                width={500}
                height={700}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {isRTL ? "איך זה עובד" : "How It Works"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              {isRTL
                ? "שלושה צעדים פשוטים לקבלת נסח טאבו רשמי"
                : "Three simple steps to get your official Tabu extract"}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  {step.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">{isRTL ? step.titleHe : step.titleEn}</h3>
                <p className="mt-2 text-base text-gray-600">{isRTL ? step.descriptionHe : step.descriptionEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {isRTL ? "למה להשתמש בשירות שלנו" : "Why Use Our Service"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              {isRTL
                ? "הפלטפורמה המהירה והבטוחה ביותר להזמנת נסחי טאבו"
                : "The fastest and most secure platform for ordering Tabu extracts"}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{isRTL ? benefit.titleHe : benefit.titleEn}</h3>
                <p className="mt-2 text-base text-gray-600">{isRTL ? benefit.descriptionHe : benefit.descriptionEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {isRTL ? "שאלות נפוצות" : "Frequently Asked Questions"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              {isRTL ? "מצא תשובות לשאלות הנפוצות ביותר" : "Find answers to the most common questions"}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left rtl:text-right">
                    {isRTL ? faq.questionHe : faq.questionEn}
                  </AccordionTrigger>
                  <AccordionContent>{isRTL ? faq.answerHe : faq.answerEn}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {isRTL ? "מוכן להזמין נסח טאבו?" : "Ready to Order Your Tabu Extract?"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-primary-100">
            {isRTL
              ? "קבל את המסמך שלך תוך דקות, ישירות למייל"
              : "Get your document in minutes, delivered straight to your email"}
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary" className="text-base" asChild>
              <Link href="/order">{isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
