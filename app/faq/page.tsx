"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  const { isRTL } = useLanguage()

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
        "A Regular Extract shows current ownership and rights. A Historical Extract includes past ownership changes. A Concentrated Extract contains information about condominiums. Extract by Address allows you to get a document using only the property address. Property Report by ID shows all properties associated with a specific ID number.",
      answerHe:
        "נסח רגיל מציג בעלות וזכויות נוכחיות. נסח היסטורי כולל שינויי בעלות בעבר. נסח מרוכז מכיל מידע על בתים משותפים. נסח לפי כתובת מאפשר לך לקבל מסמך באמצעות כתובת הנכס בלבד. דוח נכסים לפי ת.ז מציג את כל הנכסים הקשורים למספר תעודת זהות מסוים.",
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
    {
      questionEn: "How quickly will I receive my document?",
      questionHe: "כמה מהר אקבל את המסמך שלי?",
      answerEn:
        "For Regular, Historical, and Concentrated Extracts, you'll receive your document instantly after payment. For Extract by Address and Property Report by ID, it typically takes 1-2 business hours as these require manual processing by our team.",
      answerHe:
        "עבור נסחים רגילים, היסטוריים ומרוכזים, תקבל את המסמך שלך מיד לאחר התשלום. עבור נסח לפי כתובת ודוח נכסים לפי ת.ז, זה בדרך כלל לוקח 1-2 שעות עבודה מכיוון שאלה דורשים עיבוד ידני על ידי הצוות שלנו.",
    },
    {
      questionEn: "Can I use the digital extract for legal purposes?",
      questionHe: "האם אני יכול להשתמש בנסח הדיגיטלי למטרות משפטיות?",
      answerEn:
        "Yes, the digital extract includes an official electronic signature and is legally valid as long as it remains in its digital form. It is accepted by banks, lawyers, and government offices.",
      answerHe:
        "כן, הנסח הדיגיטלי כולל חתימה אלקטרונית רשמית והוא תקף משפטית כל עוד הוא נשאר בצורתו הדיגיטלית. הוא מתקבל על ידי בנקים, עורכי דין ומשרדי ממשלה.",
    },
  ]

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="relative py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-700/20 blur-[120px]"></div>
          <div className="absolute top-[20%] right-[5%] h-[400px] w-[700px] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
              {isRTL ? "שאלות נפוצות" : "Frequently Asked Questions"}
            </h1>
            <p className="mt-6 text-xl text-gray-400">
              {isRTL ? "מצא תשובות לשאלות הנפוצות ביותר" : "Find answers to the most common questions"}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="mb-4 overflow-hidden rounded-lg border border-gray-800 bg-gray-900/80 transition-all duration-200 hover:border-primary-500/30"
                >
                  <AccordionTrigger
                    className={`px-6 py-4 text-left text-lg font-medium text-white hover:text-primary-400 ${isRTL ? "text-right" : ""}`}
                  >
                    {isRTL ? faq.questionHe : faq.questionEn}
                  </AccordionTrigger>
                  <AccordionContent className={`px-6 pb-4 text-gray-400 ${isRTL ? "text-right" : ""}`}>
                    {isRTL ? faq.answerHe : faq.answerEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mx-auto mt-16 max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white">{isRTL ? "עדיין יש לך שאלות?" : "Still Have Questions?"}</h2>
            <p className="mt-4 text-lg text-gray-400">
              {isRTL
                ? "אם לא מצאת את התשובה שחיפשת, אל תהסס לפנות אלינו"
                : "If you couldn't find the answer you were looking for, don't hesitate to contact us"}
            </p>
            <Button
              className="mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
              asChild
            >
              <Link href="/contact">{isRTL ? "צור קשר" : "Contact Us"}</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
