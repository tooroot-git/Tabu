"use client"

import type React from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LandingPage() {
  const { language, isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    block: "",
    parcel: "",
    subparcel: "",
    street: "",
    houseNumber: "",
    city: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // בדיקה איזה טאב פעיל
    const activeTab = document.querySelector('[data-state="active"]')?.getAttribute("value")

    if (activeTab === "address") {
      window.location.href = `/document-selection?street=${encodeURIComponent(formData.street)}&houseNumber=${encodeURIComponent(formData.houseNumber)}&city=${encodeURIComponent(formData.city)}&inputType=address`
    } else {
      window.location.href = `/document-selection?block=${formData.block}&parcel=${formData.parcel}&subparcel=${formData.subparcel}&inputType=blockParcel`
    }
  }

  const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Official & Legally Valid",
      titleHe: "רשמי ותקף משפטית",
      descriptionEn: "All documents are official extracts from the Israel Land Registry with full legal validity.",
      descriptionHe: "כל המסמכים הם נסחים רשמיים מרשם המקרקעין בישראל עם תוקף משפטי מלא.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Instant Delivery",
      titleHe: "משלוח מיידי",
      descriptionEn: "Receive your documents instantly via email after payment, no waiting required.",
      descriptionHe: "קבל את המסמכים שלך מיידית באימייל לאחר התשלום, ללא צורך בהמתנה.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "Bank-Level Security",
      titleHe: "אבטחה ברמה בנקאית",
      descriptionEn: "Your data is encrypted and protected with the highest security standards.",
      descriptionHe: "המידע שלך מוצפן ומוגן בסטנדרטים הגבוהים ביותר של אבטחה.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      titleEn: "24/7 Availability",
      titleHe: "זמינות 24/7",
      descriptionEn: "Order documents any time, day or night, from anywhere.",
      descriptionHe: "הזמן מסמכים בכל זמן, יום או לילה, מכל מקום.",
    },
  ]

  const steps = [
    {
      icon: <FileText className="h-8 w-8" />,
      titleEn: "Enter Property Details",
      titleHe: "הזן פרטי נכס",
      descriptionEn:
        "Provide the Block (Gush), Parcel (Helka), and Sub-parcel (Tat-Helka) numbers or property address.",
      descriptionHe: "הזן את מספרי הגוש, החלקה ותת-החלקה של הנכס או את כתובת הנכס.",
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
    <div className={`${isRTL ? "font-sans-hebrew" : "font-sans"} bg-[#0A0E17] text-white`}>
      <Header />

      {/* Hero Section - Auth0 Style */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary-500/20 to-primary-700/20 blur-[120px]"></div>
          <div className="absolute top-[20%] right-[5%] h-[400px] w-[700px] rounded-full bg-gradient-to-l from-blue-500/10 to-purple-500/10 blur-[120px]"></div>
          <div className="absolute -bottom-[10%] left-[30%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-600/20 to-blue-600/5 blur-[100px]"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400">
              <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
              {isRTL ? "הדרך המהירה ביותר לקבלת נסחי טאבו" : "The fastest way to get Tabu extracts"}
            </div>

            <h1 className="mt-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
              {isRTL ? "נסח טאבו ומסמכים רשמיים" : "Official Land Registry"}
              <span className="mt-2 block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                {isRTL ? "במהירות ובקלות" : "Fast & Secure Access"}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-400">
              {isRTL
                ? "קבל נסח טאבו ומסמכים רשמיים באופן מיידי, ישירות למייל שלך. הפלטפורמה המהירה והמאובטחת ביותר בישראל."
                : "Get official Tabu extracts instantly, delivered directly to your email. The fastest and most secure platform in Israel."}
            </p>

            {/* Centralized Form */}
            <div className="mx-auto mt-10 max-w-3xl">
              <div className="rounded-xl border border-gray-800 bg-gray-900/80 p-8 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs defaultValue="blockParcel" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="blockParcel" className="text-sm">
                        {isRTL ? "גוש וחלקה" : "Block & Parcel"}
                      </TabsTrigger>
                      <TabsTrigger value="address" className="text-sm">
                        {isRTL ? "כתובת נכס" : "Property Address"}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="blockParcel">
                      <div className="grid gap-6 md:grid-cols-3">
                        <div>
                          <label htmlFor="block" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "גוש" : "Block (Gush)"}*
                          </label>
                          <Input
                            id="block"
                            type="text"
                            placeholder={isRTL ? "הזן מספר גוש" : "Enter Block number"}
                            helperText={isRTL ? "לדוגמה: 6941" : "Example: 6941"}
                            className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            value={formData.block}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="parcel" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "חלקה" : "Parcel (Helka)"}*
                          </label>
                          <Input
                            id="parcel"
                            type="text"
                            placeholder={isRTL ? "הזן מספר חלקה" : "Enter Parcel number"}
                            helperText={isRTL ? "לדוגמה: 198" : "Example: 198"}
                            className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            value={formData.parcel}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="subparcel" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "תת-חלקה (אופציונלי)" : "Sub-parcel (Optional)"}
                          </label>
                          <Input
                            id="subparcel"
                            type="text"
                            placeholder={isRTL ? "הזן מספר תת-חלקה" : "Enter Sub-parcel"}
                            helperText={isRTL ? "השאר ריק אם אין" : "Leave empty if none"}
                            className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            value={formData.subparcel}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="address">
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-1">
                          <label htmlFor="street" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "רחוב" : "Street"}*
                          </label>
                          <Input
                            id="street"
                            type="text"
                            placeholder={isRTL ? "הזן את שם הרחוב" : "Enter street name"}
                            className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            value={formData.street}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "מספר בית" : "House Number"}*
                          </label>
                          <Input
                            id="houseNumber"
                            type="text"
                            placeholder={isRTL ? "הזן מספר בית" : "Enter house number"}
                            className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            value={formData.houseNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="md:col-span-1">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "יישוב" : "City"}*
                          </label>
                          <Input
                            id="city"
                            type="text"
                            placeholder={isRTL ? "הזן את שם היישוב" : "Enter city name"}
                            className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-6 w-full bg-gradient-to-r from-primary-500 to-primary-600 py-6 text-lg font-medium text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                  >
                    {isRTL ? "הזמן נסח עכשיו" : "Get Your Extract Now"}
                  </Button>
                </form>

                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="mr-2 h-4 w-4" />
                  {isRTL ? "מאובטח ב-256 ביט SSL" : "Secured with 256-bit SSL"}
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-8">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <CheckCircle className="h-5 w-5 text-primary-500" />
                <span>{isRTL ? "מסמכים רשמיים" : "Official Documents"}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <CheckCircle className="h-5 w-5 text-primary-500" />
                <span>{isRTL ? "משלוח מיידי" : "Instant Delivery"}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <CheckCircle className="h-5 w-5 text-primary-500" />
                <span>{isRTL ? "אבטחה מתקדמת" : "Advanced Security"}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <CheckCircle className="h-5 w-5 text-primary-500" />
                <span>{isRTL ? "תמיכה 24/7" : "24/7 Support"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page content... */}
      {/* Document Preview Section */}
      <section className="relative py-20">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div className={`${isRTL ? "md:order-2" : "md:order-1"}`}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-500 to-blue-600 opacity-30 blur-lg"></div>
                <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D7%A0%D7%A1%D7%97-%D7%98%D7%90%D7%91%D7%95-%D7%9C%D7%93%D7%95%D7%92%D7%9E%D7%90-%D7%95%D7%94%D7%A1%D7%91%D7%A8%D7%99%D7%9D-1466435373.jpg-qbksRvPQlu2qsx8xwbZ4Bzg8rKoj8G.jpeg"
                    alt={isRTL ? "דוגמה לנסח טאבו" : "Sample Tabu Extract"}
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
                </div>
              </div>
            </div>
            <div className={`${isRTL ? "md:order-1 text-right" : "md:order-2 text-left"}`}>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {isRTL ? "נסח טאבו רשמי ומאובטח" : "Official & Secure Tabu Extract"}
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                {isRTL
                  ? "נסח טאבו הוא מסמך רשמי המספק מידע מקיף על נכס מקרקעין. הוא כולל פרטים על הבעלות, זכויות, משכנתאות, שעבודים ומידע משפטי נוסף."
                  : "A Tabu Extract is an official document providing comprehensive information about a real estate property. It includes details about ownership, rights, mortgages, liens, and other legal information."}
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  isRTL ? "מידע מלא על בעלות הנכס" : "Complete property ownership information",
                  isRTL ? "פרטים על משכנתאות ושעבודים" : "Details about mortgages and liens",
                  isRTL ? "מידע על זכויות וחובות" : "Information about rights and obligations",
                  isRTL ? "חתימה דיגיטלית רשמית" : "Official digital signature",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className={`${isRTL ? "ml-2" : "mr-2"} h-5 w-5 text-primary-500`} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                  asChild
                >
                  <Link href="/services">{isRTL ? "גלה את כל השירותים שלנו" : "Discover All Our Services"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[10%] right-[20%] h-[400px] w-[600px] rounded-full bg-gradient-to-l from-primary-500/10 to-blue-500/10 blur-[120px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              {isRTL ? "למה להשתמש בשירות שלנו" : "Why Use Our Service"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
              {isRTL
                ? "הפלטפורמה המהירה והבטוחה ביותר להזמנת נסחי טאבו"
                : "The fastest and most secure platform for ordering Tabu extracts"}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative rounded-xl border border-gray-800 bg-gray-900/80 p-8 transition-all duration-300 hover:border-primary-500/50 hover:bg-gray-900 hover:shadow-lg hover:shadow-primary-500/5"
              >
                <div className="absolute -inset-px z-0 rounded-xl bg-gradient-to-br from-primary-500/20 via-transparent to-transparent opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 transition-all duration-300 group-hover:bg-primary-500/20">
                    {benefit.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{isRTL ? benefit.titleHe : benefit.titleEn}</h3>
                  <p className="text-gray-400">{isRTL ? benefit.descriptionHe : benefit.descriptionEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-600/10 to-primary-600/10 blur-[120px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              {isRTL ? "איך זה עובד" : "How It Works"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
              {isRTL
                ? "שלושה צעדים פשוטים לקבלת נסח טאבו רשמי"
                : "Three simple steps to get your official Tabu extract"}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative rounded-xl border border-gray-800 bg-gray-900/80 p-8 transition-all duration-300 hover:border-primary-500/30 hover:bg-gray-900"
              >
                <div className="absolute -top-5 left-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white">
                  {index + 1}
                </div>
                <div className="mb-4 mt-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{isRTL ? step.titleHe : step.titleEn}</h3>
                <p className="text-gray-400">{isRTL ? step.descriptionHe : step.descriptionEn}</p>
              </div>
            ))}
          </div>

          {/* Process Flow Visualization */}
          <div className="mx-auto mt-16 hidden max-w-4xl md:block">
            <div className="relative h-2 rounded-full bg-gray-800">
              <div className="absolute left-0 top-0 h-2 w-1/3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"></div>
              <div className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/4 rounded-full border-2 border-primary-500 bg-gray-900"></div>
              <div className="absolute left-1/3 top-0 h-4 w-4 -translate-y-1/4 rounded-full border-2 border-primary-500 bg-gray-900"></div>
              <div className="absolute left-2/3 top-0 h-4 w-4 -translate-y-1/4 rounded-full border-2 border-primary-500 bg-gray-900"></div>
              <div className="absolute right-0 top-0 h-4 w-4 translate-x-1/2 -translate-y-1/4 rounded-full border-2 border-primary-500 bg-gray-900"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-blue-600/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/subtle-woven-texture.png')] bg-center opacity-[0.03]"></div>
        </div>

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
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 py-6 text-lg font-medium text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20 sm:w-auto"
                asChild
              >
                <Link href="/order" className="inline-flex items-center">
                  {isRTL ? "הזמן נסח עכשיו" : "Order Extract Now"}
                  <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-gray-700 py-6 text-lg font-medium text-white hover:bg-gray-800 sm:w-auto"
                asChild
              >
                <Link href="/contact">{isRTL ? "צור קשר לייעוץ" : "Contact for Advice"}</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="h-5 w-5 text-primary-500" />
                <span>{isRTL ? "מאובטח ב-256 ביט SSL" : "Secured with 256-bit SSL"}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="h-5 w-5 text-primary-500" />
                <span>{isRTL ? "משלוח מיידי" : "Instant Delivery"}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <CheckCircle className="h-5 w-5 text-primary-500" />
                <span>{isRTL ? "100% מסמכים רשמיים" : "100% Official Documents"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
