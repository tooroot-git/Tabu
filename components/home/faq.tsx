"use client"

import { useLanguage } from "@/context/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const { language, isRTL } = useLanguage()

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
        'ניתן למצוא מספרים אלה בחשבון הארנונה שלך, בנסחי טאבו קודמים או בהסכמי רכישה. אם אין לך את אלה, תוכל לפנות לעירייה המקומית שלך או לעור�� דין נדל"ן.',
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
    <section className="relative py-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[30%] left-[10%] h-[400px] w-[400px] rounded-full bg-gradient-to-r from-primary-500/10 to-blue-500/5 blur-[100px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            {isRTL ? "שאלות נפוצות" : "Frequently Asked Questions"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
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
      </div>
    </section>
  )
}
