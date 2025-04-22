"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, History, FileSearch, MapPin, UserSearch } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const { isRTL } = useLanguage()

  const services = [
    {
      id: "regular",
      icon: <FileText className="h-10 w-10" />,
      titleEn: "Regular Tabu Extract",
      titleHe: "נסח טאבו רגיל",
      descriptionEn:
        "A document that contains all information about the registered property owners in the Land Registry, including property description, owners and their rights, as well as liens and actions registered on the property, if any.",
      descriptionHe:
        "מסמך המרכז את כל המידע על בעלי הזכויות הרשומים בפנקסי המקרקעין, הכולל את תיאור המקרקעין, בעלי הזכויות ומהות זכויותיהם, וכן שעבודים ופעולות הרשומים במקרקעין, במידה וישנם.",
      priceEn: "₪39",
      priceHe: "₪39",
    },
    {
      id: "concentrated",
      icon: <FileSearch className="h-10 w-10" />,
      titleEn: "Concentrated Tabu Extract",
      titleHe: "נסח טאבו מרוכז",
      descriptionEn:
        "A concentrated extract indicates that the property is registered in the Condominium Register. This applies when there are two or more apartments on the same plot, with one or more buildings.",
      descriptionHe:
        "נסח מרוכז מעיד כי הנכס רשום בפנקס הבתים המשותפים. המושג בית משותף קיים במקרים בהם יש על אותה חלקה שתי דירות או יותר, בעל מבנה אחד או יותר. הבית המשותף רשום בפנקס הבתים המשותפים בלשכות רישום המקרקעין (טאבו).",
      priceEn: "₪59",
      priceHe: "₪59",
    },
    {
      id: "historical",
      icon: <History className="h-10 w-10" />,
      titleEn: "Historical Tabu Extract",
      titleHe: "נסח טאבו היסטורי",
      descriptionEn:
        "A historical extract includes current information and computerized historical records. All information recorded since the computer era is included. Information from before the computer era is found in microfilms.",
      descriptionHe:
        "נסח טאבו היסטורי כלול במידע מלא עכשוי וכולל רשומות היסטוריות ממוחשבות. כל המידע אשר נרשם מאז תקופת המחשב, כל המידע אשר קיים בתיק לפני תקופת המחשב נמצא במיקרופילים.",
      priceEn: "₪69",
      priceHe: "₪69",
    },
    {
      id: "by-address",
      icon: <MapPin className="h-10 w-10" />,
      titleEn: "Tabu Extract by Address",
      titleHe: "נסח טאבו לפי כתובת",
      descriptionEn:
        "Our representatives will locate the plot details based on the address you provided and send you a digitally signed extract via email. The online extract has the status of an official extract as long as it remains in its digital form.",
      descriptionHe:
        'נציגנו יאתרו עבורכם את פרטי החלקה ע"פ הכתובת שמסרתם ויעבירו לכם למייל נסח חתום דיגיטלית. לנסח המקוון מעמד של נסח רשמי כל עוד הוא נשאר בתצורתו הדיגיטלית.',
      priceEn: "₪79",
      priceHe: "₪79",
    },
    {
      id: "property-report",
      icon: <UserSearch className="h-10 w-10" />,
      titleEn: "Property Report by ID",
      titleHe: "דוח נכסים לפי ת.ז",
      descriptionEn:
        "A property report by ID is a document that details the list of all properties currently and/or previously mortgaged by a person, an Israeli citizen.",
      descriptionHe:
        "דוח נכסים לפי תעודת זהות הינו דוח המפרט את רשימת כל הנכסים המשועבדים בהווה ו/או בעבר של אדם, אזרח בישראל.",
      priceEn: "₪99",
      priceHe: "₪99",
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
              {isRTL ? "השירותים שלנו" : "Our Services"}
            </h1>
            <p className="mt-6 text-xl text-gray-400">
              {isRTL
                ? "אנו מציעים מגוון שירותים להשגת מסמכי רישום מקרקעין רשמיים"
                : "We offer a variety of services for obtaining official land registry documents"}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="flex h-full flex-col border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                    {service.icon}
                  </div>
                  <CardTitle className="text-white">{isRTL ? service.titleHe : service.titleEn}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className={`text-base text-gray-400 ${isRTL ? "text-right" : ""}`}>
                    {isRTL ? service.descriptionHe : service.descriptionEn}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-4">
                  <div className="text-2xl font-bold text-primary-500">{isRTL ? service.priceHe : service.priceEn}</div>
                  <Button
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                    asChild
                  >
                    <Link href={`/order?service=${service.id}`}>{isRTL ? "הזמן עכשיו" : "Order Now"}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 rounded-xl border border-primary-500/20 bg-gradient-to-b from-gray-900 to-gray-900/95 p-8 shadow-xl shadow-primary-500/5 backdrop-blur-sm">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-white">
                {isRTL ? "לא בטוח איזה מסמך אתה צריך?" : "Not sure which document you need?"}
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                {isRTL
                  ? "צוות המומחים שלנו ישמח לעזור לך לבחור את המסמך המתאים לצרכים שלך"
                  : "Our team of experts will be happy to help you choose the right document for your needs"}
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                asChild
              >
                <Link href="/contact">{isRTL ? "צור קשר לייעוץ" : "Contact Us for Advice"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
