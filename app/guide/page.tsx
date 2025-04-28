"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  FileText,
  FileSearch,
  History,
  Clock,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  MapPin,
  Search,
  Download,
} from "lucide-react"
import Link from "next/link"
import { MetaTags } from "@/components/seo/meta-tags"
import { StructuredData } from "@/components/seo/structured-data"

export default function GuidePage() {
  const { isRTL } = useLanguage()

  const title = isRTL
    ? "המדריך המקיף להזמנת נסח טאבו רשמי | טאבו ישראל"
    : "Comprehensive Guide to Obtaining Official Tabu Extracts | TabuIsrael"

  const description = isRTL
    ? "מדריך מפורט להזמנת נסח טאבו רשמי בישראל - כל המידע על סוגי הנסחים, המסמכים הדרושים, תהליך ההזמנה, ועצות מקצועיות."
    : "Detailed guide to ordering official Tabu extracts in Israel - all information about extract types, required documents, ordering process, and professional tips."

  return (
    <>
      <MetaTags title={title} description={description} />
      <StructuredData type="Service" />

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
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                {isRTL
                  ? "המדריך המקיף להזמנת נסח טאבו רשמי"
                  : "Comprehensive Guide to Obtaining Official Tabu Extracts"}
              </h1>
              <p className="mt-6 text-xl text-gray-400">
                {isRTL
                  ? "כל מה שצריך לדעת על הזמנת נסחי טאבו, סוגי המסמכים, והתהליך המלא מהתחלה ועד הסוף"
                  : "Everything you need to know about ordering Tabu extracts, document types, and the complete process from start to finish"}
              </p>
            </div>

            <div className="mt-16">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-gray-800/50 rounded-lg p-1">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-primary-500">
                    {isRTL ? "סקירה כללית" : "Overview"}
                  </TabsTrigger>
                  <TabsTrigger value="types" className="data-[state=active]:bg-primary-500">
                    {isRTL ? "סוגי נסחים" : "Extract Types"}
                  </TabsTrigger>
                  <TabsTrigger value="process" className="data-[state=active]:bg-primary-500">
                    {isRTL ? "תהליך ההזמנה" : "Ordering Process"}
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="data-[state=active]:bg-primary-500">
                    {isRTL ? "מסמכים נדרשים" : "Required Documents"}
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="data-[state=active]:bg-primary-500">
                    {isRTL ? "שאלות נפוצות" : "FAQ"}
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                  <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white">
                        {isRTL ? "מהו נסח טאבו?" : "What is a Tabu Extract?"}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {isRTL
                          ? "הבנת החשיבות של מסמכי רישום המקרקעין בישראל"
                          : "Understanding the importance of land registry documents in Israel"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="prose prose-invert max-w-none">
                        <p>
                          {isRTL
                            ? "נסח טאבו הוא מסמך רשמי המונפק על ידי רשם המקרקעין (טאבו) בישראל, המספק מידע מפורט על נכס מקרקעין רשום. מסמך זה מהווה ראיה חוקית לבעלות על הנכס ומכיל מידע חיוני על זכויות הקניין, שעבודים, משכנתאות, הערות אזהרה ומידע משפטי אחר הקשור לנכס."
                            : "A Tabu Extract is an official document issued by the Land Registry Office (Tabu) in Israel, providing detailed information about a registered real estate property. This document serves as legal evidence of property ownership and contains essential information about property rights, liens, mortgages, warning notes, and other legal information related to the property."}
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
                          {isRTL ? "חשיבות נסח הטאבו" : "Importance of Tabu Extracts"}
                        </h3>
                        <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2">
                          <li>
                            {isRTL
                              ? "אימות בעלות: מאפשר לוודא מי הבעלים הרשומים של הנכס."
                              : "Ownership verification: Allows verification of the registered owners of the property."}
                          </li>
                          <li>
                            {isRTL
                              ? 'עסקאות נדל"ן: הכרחי בכל עסקת מכירה, רכישה או השכרה של נכס.'
                              : "Real estate transactions: Essential in any sale, purchase, or rental transaction of a property."}
                          </li>
                          <li>
                            {isRTL
                              ? "משכנתאות: נדרש על ידי בנקים ומוסדות פיננסיים לצורך אישור הלוואות ומשכנתאות."
                              : "Mortgages: Required by banks and financial institutions for approving loans and mortgages."}
                          </li>
                          <li>
                            {isRTL
                              ? "תכנון ובנייה: משמש לבדיקת זכויות בנייה ומגבלות תכנון."
                              : "Planning and construction: Used to check building rights and planning restrictions."}
                          </li>
                          <li>
                            {isRTL
                              ? "הליכים משפטיים: משמש כראיה בהליכים משפטיים הקשורים לנכס."
                              : "Legal proceedings: Serves as evidence in legal proceedings related to the property."}
                          </li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
                          {isRTL ? "מתי צריך נסח טאבו?" : "When Do You Need a Tabu Extract?"}
                        </h3>
                        <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2">
                          <li>{isRTL ? "בעת רכישת או מכירת נכס" : "When buying or selling a property"}</li>
                          <li>
                            {isRTL
                              ? "לצורך קבלת משכנתא או הלוואה בערבות הנכס"
                              : "For obtaining a mortgage or loan secured by the property"}
                          </li>
                          <li>{isRTL ? "בהליכי תכנון ובנייה" : "In planning and construction proceedings"}</li>
                          <li>
                            {isRTL ? "בהליכי ירושה וחלוקת רכוש" : "In inheritance and property division proceedings"}
                          </li>
                          <li>
                            {isRTL
                              ? "בסכסוכי שכנים ומחלוקות על גבולות"
                              : "In neighbor disputes and boundary disagreements"}
                          </li>
                          <li>{isRTL ? "לצורך בדיקת שעבודים והערות אזהרה" : "For checking liens and warning notes"}</li>
                        </ul>

                        <div className="bg-gray-800/50 p-4 rounded-lg mt-6 border border-gray-700">
                          <h4 className="text-lg font-semibold text-primary-400 mb-2 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                            {isRTL ? "חשוב לדעת" : "Important to Know"}
                          </h4>
                          <p className="text-gray-300">
                            {isRTL
                              ? "נסח טאבו תקף למועד הנפקתו בלבד. לרוב המטרות המשפטיות והפיננסיות, נדרש נסח שהונפק בתוך 30 הימים האחרונים."
                              : "A Tabu Extract is valid only as of its issuance date. For most legal and financial purposes, an extract issued within the last 30 days is required."}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center mt-8">
                        <Button asChild className="bg-primary-500 hover:bg-primary-600">
                          <Link href="/order">{isRTL ? "הזמן נסח טאבו עכשיו" : "Order Tabu Extract Now"}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Extract Types Tab */}
                <TabsContent value="types" className="mt-6">
                  <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white">
                        {isRTL ? "סוגי נסחי טאבו" : "Types of Tabu Extracts"}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {isRTL
                          ? "הכירו את הסוגים השונים של נסחי טאבו ומתי להשתמש בכל אחד מהם"
                          : "Learn about the different types of Tabu extracts and when to use each one"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50 hover:border-primary-500/30 transition-all">
                          <div className="flex items-start mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 mr-4 rtl:ml-4 rtl:mr-0">
                              <FileText className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {isRTL ? "נסח טאבו רגיל" : "Regular Tabu Extract"}
                              </h3>
                              <p className="text-primary-400 font-medium">₪39</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            {isRTL
                              ? "מסמך המרכז את כל המידע על בעלי הזכויות הרשומים בפנקסי המקרקעין, הכולל את תיאור המקרקעין, בעלי הזכויות ומהות זכויותיהם, וכן שעבודים ופעולות הרשומים במקרקעין, במידה וישנם."
                              : "A document that contains all information about the registered property owners in the Land Registry, including property description, owners and their rights, as well as liens and actions registered on the property, if any."}
                          </p>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {isRTL ? "מתי להשתמש בו:" : "When to use it:"}
                          </h4>
                          <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 text-gray-300 space-y-1">
                            <li>{isRTL ? "לבדיקת בעלות נוכחית על נכס" : "To check current ownership of a property"}</li>
                            <li>{isRTL ? 'לצורך עסקאות נדל"ן שוטפות' : "For routine real estate transactions"}</li>
                            <li>
                              {isRTL
                                ? "לבדיקת שעבודים והערות אזהרה עדכניים"
                                : "To check current liens and warning notes"}
                            </li>
                          </ul>
                        </div>

                        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50 hover:border-primary-500/30 transition-all">
                          <div className="flex items-start mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 mr-4 rtl:ml-4 rtl:mr-0">
                              <History className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {isRTL ? "נסח טאבו היסטורי" : "Historical Tabu Extract"}
                              </h3>
                              <p className="text-primary-400 font-medium">₪69</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            {isRTL
                              ? "נסח טאבו היסטורי כולל מידע עכשווי ורשומות היסטוריות ממוחשבות. כל המידע אשר נרשם מאז תקופת המחשב, כל המידע אשר קיים בתיק לפני תקופת המחשב נמצא במיקרופילים."
                              : "A historical extract includes current information and computerized historical records. All information recorded since the computer era is included. Information from before the computer era is found in microfilms."}
                          </p>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {isRTL ? "מתי להשתמש בו:" : "When to use it:"}
                          </h4>
                          <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 text-gray-300 space-y-1">
                            <li>
                              {isRTL
                                ? "לבדיקת היסטוריית בעלות על הנכס"
                                : "To check the ownership history of the property"}
                            </li>
                            <li>{isRTL ? "לצורך חקירת עסקאות קודמות" : "For investigating previous transactions"}</li>
                            <li>
                              {isRTL
                                ? "במקרים של סכסוכים משפטיים הדורשים מידע היסטורי"
                                : "In cases of legal disputes requiring historical information"}
                            </li>
                          </ul>
                        </div>

                        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50 hover:border-primary-500/30 transition-all">
                          <div className="flex items-start mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 mr-4 rtl:ml-4 rtl:mr-0">
                              <FileSearch className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {isRTL ? "נסח טאבו מרוכז" : "Concentrated Tabu Extract"}
                              </h3>
                              <p className="text-primary-400 font-medium">₪59</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            {isRTL
                              ? "נסח מרוכז מעיד כי הנכס רשום בפנקס הבתים המשותפים. המושג בית משותף קיים במקרים בהם יש על אותה חלקה שתי דירות או יותר, בעל מבנה אחד או יותר. הבית המשותף רשום בפנקס הבתים המשותפים בלשכות רישום המקרקעין (טאבו)."
                              : "A concentrated extract indicates that the property is registered in the Condominium Register. This applies when there are two or more apartments on the same plot, with one or more buildings."}
                          </p>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {isRTL ? "מתי להשתמש בו:" : "When to use it:"}
                          </h4>
                          <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 text-gray-300 space-y-1">
                            <li>{isRTL ? "לבדיקת מידע על בית משותף" : "To check information about a condominium"}</li>
                            <li>
                              {isRTL
                                ? "לצורך בדיקת הרכוש המשותף והחלקים היחסיים"
                                : "To check common property and relative parts"}
                            </li>
                            <li>{isRTL ? "לבדיקת תקנון הבית המשותף" : "To check the condominium regulations"}</li>
                          </ul>
                        </div>

                        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50 hover:border-primary-500/30 transition-all">
                          <div className="flex items-start mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 mr-4 rtl:ml-4 rtl:mr-0">
                              <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {isRTL ? "נסח טאבו לפי כתובת" : "Tabu Extract by Address"}
                              </h3>
                              <p className="text-primary-400 font-medium">₪79</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            {isRTL
                              ? 'נציגנו יאתרו עבורכם את פרטי החלקה ע"פ הכתובת שמסרתם ויעבירו לכם למייל נסח חתום דיגיטלית. לנסח המקוון מעמד של נסח רשמי כל עוד הוא נשאר בתצורתו הדיגיטלית.'
                              : "Our representatives will locate the plot details based on the address you provided and send you a digitally signed extract via email. The online extract has the status of an official extract as long as it remains in its digital form."}
                          </p>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {isRTL ? "מתי להשתמש בו:" : "When to use it:"}
                          </h4>
                          <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 text-gray-300 space-y-1">
                            <li>
                              {isRTL
                                ? "כאשר אין לך את מספרי הגוש והחלקה"
                                : "When you don't have the block and parcel numbers"}
                            </li>
                            <li>
                              {isRTL
                                ? "כאשר אתה מעוניין לבדוק נכס לפי כתובתו"
                                : "When you want to check a property by its address"}
                            </li>
                            <li>
                              {isRTL
                                ? "לחיסכון בזמן ומאמץ באיתור פרטי הנכס"
                                : "To save time and effort in locating property details"}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500" />
                          {isRTL ? "איזה סוג נסח טאבו מתאים לך?" : "Which Type of Tabu Extract is Right for You?"}
                        </h3>
                        <div className="prose prose-invert max-w-none">
                          <p>
                            {isRTL
                              ? "בחירת סוג הנסח המתאים תלויה במטרה שלשמה אתה זקוק לנסח ובמידע הספציפי שאתה מחפש:"
                              : "Choosing the right type of extract depends on the purpose for which you need the extract and the specific information you are looking for:"}
                          </p>
                          <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2 mt-4">
                            <li>
                              <strong className="text-white">
                                {isRTL ? 'לעסקאות נדל"ן רגילות:' : "For regular real estate transactions:"}
                              </strong>{" "}
                              {isRTL ? "נסח טאבו רגיל בדרך כלל מספק." : "A regular Tabu extract is usually sufficient."}
                            </li>
                            <li>
                              <strong className="text-white">
                                {isRTL ? "לבדיקת היסטוריית בעלות:" : "For checking ownership history:"}
                              </strong>{" "}
                              {isRTL
                                ? "נסח טאבו היסטורי הוא הבחירה הטובה ביותר."
                                : "A historical Tabu extract is the best choice."}
                            </li>
                            <li>
                              <strong className="text-white">
                                {isRTL ? "לדירות בבניינים משותפים:" : "For apartments in shared buildings:"}
                              </strong>{" "}
                              {isRTL
                                ? "נסח טאבו מרוכז יספק מידע על הבית המשותף."
                                : "A concentrated Tabu extract will provide information about the condominium."}
                            </li>
                            <li>
                              <strong className="text-white">
                                {isRTL
                                  ? "כשאין לך את מספרי הגוש והחלקה:"
                                  : "When you don't have block and parcel numbers:"}
                              </strong>{" "}
                              {isRTL
                                ? "נסח טאבו לפי כתובת הוא הפתרון המושלם."
                                : "A Tabu extract by address is the perfect solution."}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-center mt-8">
                        <Button asChild className="bg-primary-500 hover:bg-primary-600">
                          <Link href="/services">
                            {isRTL ? "לפרטים נוספים על השירותים שלנו" : "More Details About Our Services"}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Ordering Process Tab */}
                <TabsContent value="process" className="mt-6">
                  <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white">
                        {isRTL ? "תהליך הזמנת נסח טאבו" : "Tabu Extract Ordering Process"}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {isRTL
                          ? "מדריך מפורט שלב אחר שלב להזמנת נסח טאבו באתר שלנו"
                          : "A detailed step-by-step guide to ordering a Tabu extract on our website"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="relative">
                        <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-700 rtl:left-auto rtl:right-8"></div>

                        <div className="relative mb-8 pl-20 rtl:pl-0 rtl:pr-20">
                          <div className="absolute left-6 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white rtl:left-auto rtl:right-6">
                            1
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {isRTL ? "הזנת פרטי הנכס" : "Enter Property Details"}
                          </h3>
                          <div className="prose prose-invert max-w-none">
                            <p>
                              {isRTL
                                ? "הצעד הראשון בתהליך הזמנת נסח טאבו הוא הזנת פרטי הנכס. ישנן שתי דרכים עיקריות לעשות זאת:"
                                : "The first step in the process of ordering a Tabu extract is entering the property details. There are two main ways to do this:"}
                            </p>
                            <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2 mt-4">
                              <li>
                                <strong className="text-white">
                                  {isRTL ? "לפי גוש וחלקה:" : "By Block and Parcel:"}
                                </strong>{" "}
                                {isRTL
                                  ? "הזן את מספר הגוש, החלקה ותת-החלקה (אם יש). מספרים אלה ניתן למצוא בחשבון הארנונה, בחוזה הרכישה, או בנסחי טאבו קודמים."
                                  : "Enter the Block (Gush), Parcel (Helka), and Sub-parcel (Tat-Helka) numbers (if applicable). These numbers can be found on your property tax bill, purchase contract, or previous Tabu extracts."}
                              </li>
                              <li>
                                <strong className="text-white">{isRTL ? "לפי כתובת:" : "By Address:"}</strong>{" "}
                                {isRTL
                                  ? "אם אין לך את מספרי הגוש והחלקה, תוכל להזין את כתובת הנכס המלאה (עיר, רחוב ומספר בית)."
                                  : "If you don't have the Block and Parcel numbers, you can enter the full property address (city, street, and house number)."}
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative mb-8 pl-20 rtl:pl-0 rtl:pr-20">
                          <div className="absolute left-6 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white rtl:left-auto rtl:right-6">
                            2
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {isRTL ? "בחירת סוג הנסח" : "Select Extract Type"}
                          </h3>
                          <div className="prose prose-invert max-w-none">
                            <p>
                              {isRTL
                                ? "לאחר הזנת פרטי הנכס, תתבקש לבחור את סוג הנסח שברצונך להזמין:"
                                : "After entering the property details, you will be asked to choose the type of extract you want to order:"}
                            </p>
                            <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2 mt-4">
                              <li>
                                <strong className="text-white">{isRTL ? "נסח רגיל" : "Regular Extract"}</strong> (₪39)
                              </li>
                              <li>
                                <strong className="text-white">{isRTL ? "נסח היסטורי" : "Historical Extract"}</strong>{" "}
                                (₪69)
                              </li>
                              <li>
                                <strong className="text-white">{isRTL ? "נסח מרוכז" : "Concentrated Extract"}</strong>{" "}
                                (₪59)
                              </li>
                              <li>
                                <strong className="text-white">{isRTL ? "נסח לפי כתובת" : "Extract by Address"}</strong>{" "}
                                (₪79)
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative mb-8 pl-20 rtl:pl-0 rtl:pr-20">
                          <div className="absolute left-6 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white rtl:left-auto rtl:right-6">
                            3
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {isRTL ? "תשלום מאובטח" : "Secure Payment"}
                          </h3>
                          <div className="prose prose-invert max-w-none">
                            <p>
                              {isRTL
                                ? "לאחר בחירת סוג הנסח, תועבר לעמוד התשלום המאובטח:"
                                : "After selecting the extract type, you will be directed to the secure payment page:"}
                            </p>
                            <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2 mt-4">
                              <li>
                                {isRTL
                                  ? "הזן את פרטי כרטיס האשראי שלך בטופס המאובטח."
                                  : "Enter your credit card details in the secure form."}
                              </li>
                              <li>
                                {isRTL
                                  ? "המערכת שלנו משתמשת בהצפנת SSL 256-bit להבטחת אבטחת המידע שלך."
                                  : "Our system uses 256-bit SSL encryption to ensure the security of your information."}
                              </li>
                              <li>
                                {isRTL
                                  ? "אנו מקבלים את כל כרטיסי האשראי העיקריים, כולל ויזה, מאסטרקארד, אמריקן אקספרס וישראכרט."
                                  : "We accept all major credit cards, including Visa, Mastercard, American Express, and Isracard."}
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative mb-8 pl-20 rtl:pl-0 rtl:pr-20">
                          <div className="absolute left-6 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white rtl:left-auto rtl:right-6">
                            4
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {isRTL ? "קבלת הנסח" : "Receiving the Extract"}
                          </h3>
                          <div className="prose prose-invert max-w-none">
                            <p>
                              {isRTL
                                ? "מיד לאחר השלמת התשלום, תקבל את נסח הטאבו:"
                                : "Immediately after completing the payment, you will receive your Tabu extract:"}
                            </p>
                            <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2 mt-4">
                              <li>
                                {isRTL
                                  ? "עבור נסח רגיל, היסטורי או מרוכז: הנסח יישלח אליך מיידית באימייל וניתן יהיה להורידו ישירות מהאתר."
                                  : "For Regular, Historical, or Concentrated extracts: The extract will be sent to you immediately via email and can be downloaded directly from the website."}
                              </li>
                              <li>
                                {isRTL
                                  ? "עבור נסח לפי כתובת: הנסח יישלח אליך תוך 1-2 שעות עבודה, לאחר שצוות המומחים שלנו יאתר את פרטי הגוש והחלקה לפי הכתובת שסיפקת."
                                  : "For Extract by Address: The extract will be sent to you within 1-2 business hours, after our team of experts locates the Block and Parcel details according to the address you provided."}
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative pl-20 rtl:pl-0 rtl:pr-20">
                          <div className="absolute left-6 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white rtl:left-auto rtl:right-6">
                            5
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {isRTL ? "חשבונית מס" : "Tax Invoice"}
                          </h3>
                          <div className="prose prose-invert max-w-none">
                            <p>
                              {isRTL
                                ? "יחד עם הנסח, תקבל גם חשבונית מס דיגיטלית:"
                                : "Along with the extract, you will also receive a digital tax invoice:"}
                            </p>
                            <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2 mt-4">
                              <li>
                                {isRTL
                                  ? "החשבונית תישלח לכתובת האימייל שסיפקת."
                                  : "The invoice will be sent to the email address you provided."}
                              </li>
                              <li>
                                {isRTL
                                  ? 'החשבונית כוללת את כל הפרטים הנדרשים לפי חוק, כולל מע"מ.'
                                  : "The invoice includes all the details required by law, including VAT."}
                              </li>
                              <li>
                                {isRTL
                                  ? "ניתן לצפות ולהוריד את כל החשבוניות שלך בכל עת מאזור 'ההזמנות שלי' באתר (למשתמשים רשומים)."
                                  : "You can view and download all your invoices at any time from the 'My Orders' area on the website (for registered users)."}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 mt-8">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <Clock className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500" />
                          {isRTL ? "זמני עיבוד ומשלוח" : "Processing and Delivery Times"}
                        </h3>
                        <div className="prose prose-invert max-w-none">
                          <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2">
                            <li>
                              <strong className="text-white">{isRTL ? "נסח רגיל:" : "Regular Extract:"}</strong>{" "}
                              {isRTL
                                ? "מיידי (תוך דקות ספורות לאחר התשלום)"
                                : "Immediate (within minutes after payment)"}
                            </li>
                            <li>
                              <strong className="text-white">{isRTL ? "נסח היסטורי:" : "Historical Extract:"}</strong>{" "}
                              {isRTL
                                ? "מיידי (תוך דקות ספורות לאחר התשלום)"
                                : "Immediate (within minutes after payment)"}
                            </li>
                            <li>
                              <strong className="text-white">{isRTL ? "נסח מרוכז:" : "Concentrated Extract:"}</strong>{" "}
                              {isRTL
                                ? "מיידי (תוך דקות ספורות לאחר התשלום)"
                                : "Immediate (within minutes after payment)"}
                            </li>
                            <li>
                              <strong className="text-white">{isRTL ? "נסח לפי כתובת:" : "Extract by Address:"}</strong>{" "}
                              {isRTL ? "1-2 שעות עבודה" : "1-2 business hours"}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-center mt-8">
                        <Button asChild className="bg-primary-500 hover:bg-primary-600">
                          <Link href="/order">{isRTL ? "הזמן נסח טאבו עכשיו" : "Order Tabu Extract Now"}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Required Documents Tab */}
                <TabsContent value="documents" className="mt-6">
                  <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white">
                        {isRTL ? "מסמכים ומידע נדרשים" : "Required Documents and Information"}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {isRTL
                          ? "המידע והמסמכים הדרושים להזמנת נסח טאבו"
                          : "The information and documents needed to order a Tabu extract"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                          <h3 className="text-xl font-semibold text-white mb-4">
                            {isRTL ? "להזמנה לפי גוש וחלקה" : "For Ordering by Block and Parcel"}
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{isRTL ? "מספר גוש" : "Block (Gush) number"}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{isRTL ? "מספר חלקה" : "Parcel (Helka) number"}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL ? "מספר תת-חלקה (אם יש)" : "Sub-parcel (Tat-Helka) number (if applicable)"}
                              </span>
                            </li>
                          </ul>

                          <h4 className="text-lg font-semibold text-white mt-6 mb-3">
                            {isRTL ? "איפה למצוא מידע זה?" : "Where to Find This Information?"}
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <Search className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL ? "חשבון ארנונה" : "Property tax (Arnona) bill"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Search className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL ? "חוזה רכישה או שכירות" : "Purchase or rental contract"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Search className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL ? "נסחי טאבו קודמים" : "Previous Tabu extracts"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Search className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL ? "אתר המפות הממשלתי" : "Government mapping website"}
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                          <h3 className="text-xl font-semibold text-white mb-4">
                            {isRTL ? "להזמנה לפי כתובת" : "For Ordering by Address"}
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{isRTL ? "שם העיר/יישוב" : "City/Town name"}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{isRTL ? "שם הרחוב" : "Street name"}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{isRTL ? "מספר בית" : "House number"}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL ? "מספר דירה (אם רלוונטי)" : "Apartment number (if relevant)"}
                              </span>
                            </li>
                          </ul>

                          <h4 className="text-lg font-semibold text-white mt-6 mb-3">
                            {isRTL ? "דגשים חשובים:" : "Important Notes:"}
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL
                                  ? "יש לוודא שהכתובת מדויקת ומלאה"
                                  : "Ensure the address is accurate and complete"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL
                                  ? "במקרה של בניין חדש שטרם נרשם בטאבו, ייתכן שלא יהיה ניתן לקבל נסח"
                                  : "In case of a new building not yet registered in Tabu, it may not be possible to obtain an extract"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <AlertTriangle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL
                                  ? "זמן העיבוד ארוך יותר מאשר בהזמנה לפי גוש וחלקה (1-2 שעות עבודה)"
                                  : "Processing time is longer than when ordering by Block and Parcel (1-2 business hours)"}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                        <h3 className="text-xl font-semibold text-white mb-4">
                          {isRTL ? "מידע נוסף שעשוי להידרש" : "Additional Information That May Be Required"}
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <HelpCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL
                                  ? "פרטי התקשרות (אימייל וטלפון) לקבלת הנסח ולתקשורת במקרה הצורך"
                                  : "Contact details (email and phone) to receive the extract and for communication if needed"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <HelpCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL
                                  ? "פרטים לחשבונית (שם מלא, כתובת, מספר עוסק/ח.פ. אם רלוונטי)"
                                  : "Invoice details (full name, address, business/company number if relevant)"}
                              </span>
                            </li>
                          </ul>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <HelpCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL ? "פרטי תשלום (כרטיס אשראי)" : "Payment details (credit card)"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <HelpCircle className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">
                                {isRTL
                                  ? "יצירת חשבון באתר (אופציונלי, אך מומלץ לצורך מעקב אחר הזמנות ושמירת היסטוריה)"
                                  : "Creating an account on the website (optional, but recommended for tracking orders and saving history)"}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 mt-8">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <Download className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary-500" />
                          {isRTL ? "פורמט ותוקף המסמכים" : "Document Format and Validity"}
                        </h3>
                        <div className="prose prose-invert max-w-none">
                          <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2">
                            <li>
                              <strong className="text-white">{isRTL ? "פורמט:" : "Format:"}</strong>{" "}
                              {isRTL
                                ? "נסח הטאבו יסופק בפורמט PDF עם חתימה דיגיטלית רשמית."
                                : "The Tabu extract will be provided in PDF format with an official digital signature."}
                            </li>
                            <li>
                              <strong className="text-white">{isRTL ? "תוקף משפטי:" : "Legal Validity:"}</strong>{" "}
                              {isRTL
                                ? "הנסח הדיגיטלי בעל תוקף משפטי מלא כל עוד הוא נשמר בפורמט הדיגיטלי המקורי עם החתימה האלקטרונית."
                                : "The digital extract has full legal validity as long as it is kept in its original digital format with the electronic signature."}
                            </li>
                            <li>
                              <strong className="text-white">{isRTL ? "תקופת תוקף:" : "Validity Period:"}</strong>{" "}
                              {isRTL
                                ? "נסח הטאבו תקף למועד הנפקתו בלבד. לרוב המטרות המשפטיות והפיננסיות, נדרש נסח שהונפק בתוך 30 הימים האחרונים."
                                : "The Tabu extract is valid only as of its issuance date. For most legal and financial purposes, an extract issued within the last 30 days is required."}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-center mt-8">
                        <Button asChild className="bg-primary-500 hover:bg-primary-600">
                          <Link href="/order">{isRTL ? "הזמן נסח טאבו עכשיו" : "Order Tabu Extract Now"}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* FAQ Tab */}
                <TabsContent value="faq" className="mt-6">
                  <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white">
                        {isRTL ? "שאלות נפוצות" : "Frequently Asked Questions"}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {isRTL
                          ? "תשובות לשאלות הנפוצות ביותר על נסחי טאבו והזמנתם"
                          : "Answers to the most common questions about Tabu extracts and ordering them"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL ? "מהו נסח טאבו ולמה הוא חשוב?" : "What is a Tabu extract and why is it important?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "נסח טאבו הוא מסמך רשמי המונפק על ידי רשם המקרקעין (טאבו) בישראל, המספק מידע מפורט על נכס מקרקעין רשום. הוא חשוב כי הוא מהווה ראיה חוקית לבעלות על הנכס ומכיל מידע חיוני על זכויות הקניין, שעבודים, משכנתאות, הערות אזהרה ומידע משפטי אחר הקשור לנכס."
                              : "A Tabu extract is an official document issued by the Land Registry Office (Tabu) in Israel, providing detailed information about a registered real estate property. It is important because it serves as legal evidence of property ownership and contains essential information about property rights, liens, mortgages, warning notes, and other legal information related to the property."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL
                              ? "איך אני מוצא את מספרי הגוש והחלקה שלי?"
                              : "How do I find my Block and Parcel numbers?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "ניתן למצוא את מספרי הגוש והחלקה בחשבון הארנונה שלך, בחוזה הרכישה או השכירות, בנסחי טאבו קודמים, או באתר המפות הממשלתי. אם אין לך גישה למידע זה, תוכל להזמין נסח טאבו לפי כתובת באתר שלנו."
                              : "You can find your Block and Parcel numbers on your property tax (Arnona) bill, purchase or rental contract, previous Tabu extracts, or on the government mapping website. If you don't have access to this information, you can order a Tabu extract by address on our website."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL
                              ? "מה ההבדל בין סוגי הנסחים השונים?"
                              : "What's the difference between the different types of extracts?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "נסח רגיל מציג את המידע העדכני על הנכס. נסח היסטורי כולל גם היסטוריית בעלות ועסקאות קודמות. נסח מרוכז מיועד לבתים משותפים ומכיל מידע על הרכוש המשותף. נסח לפי כתובת מאפשר לך לקבל נסח כאשר אין לך את מספרי הגוש והחלקה."
                              : "A Regular extract shows current property information. A Historical extract also includes ownership history and previous transactions. A Concentrated extract is for condominiums and contains information about common property. An extract by address allows you to get an extract when you don't have the Block and Parcel numbers."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL ? "כמה זמן לוקח לקבל את הנסח?" : "How long does it take to receive the extract?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "עבור נסח רגיל, היסטורי או מרוכז, תקבל את הנסח מיידית לאחר התשלום (תוך דקות ספורות). עבור נסח לפי כתובת, זמן העיבוד הוא 1-2 שעות עבודה, מכיוון שצוות המומחים שלנו צריך לאתר את פרטי הגוש והחלקה לפי הכתובת שסיפקת."
                              : "For Regular, Historical, or Concentrated extracts, you will receive the extract immediately after payment (within minutes). For an extract by address, the processing time is 1-2 business hours, as our team of experts needs to locate the Block and Parcel details according to the address you provided."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL ? "האם הנסח הדיגיטלי תקף מבחינה משפטית?" : "Is the digital extract legally valid?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "כן, הנסח הדיגיטלי כולל חתימה אלקטרונית רשמית והוא בעל תוקף משפטי מלא כל עוד הוא נשמר בפורמט הדיגיטלי המקורי. הוא מתקבל על ידי בנקים, עורכי דין, ומשרדי ממשלה."
                              : "Yes, the digital extract includes an official electronic signature and has full legal validity as long as it is kept in its original digital format. It is accepted by banks, lawyers, and government offices."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL ? "לכמה זמן נסח הטאבו תקף?" : "How long is a Tabu extract valid for?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "נסח הטאבו תקף למועד הנפקתו בלבד. לרוב המטרות המשפטיות והפיננסיות, נדרש נסח שהונפק בתוך 30 הימים האחרונים. עם זאת, הדרישות עשויות להשתנות בהתאם למטרה הספציפית."
                              : "A Tabu extract is valid only as of its issuance date. For most legal and financial purposes, an extract issued within the last 30 days is required. However, requirements may vary depending on the specific purpose."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-7" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL ? "האם פרטי התשלום שלי מאובטחים?" : "Is my payment information secure?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "כן, אנו משתמשים בהצפנת SSL 256-bit להבטחת אבטחת המידע שלך. אנו לא שומרים את פרטי כרטיס האשראי שלך. כל התשלומים מעובדים דרך שערי תשלום מאובטחים העומדים בתקני PCI DSS."
                              : "Yes, we use 256-bit SSL encryption to ensure the security of your information. We do not store your credit card details. All payments are processed through secure payment gateways that comply with PCI DSS standards."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-8" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL
                              ? "האם אני יכול להזמין נסח טאבו עבור כל נכס?"
                              : "Can I order a Tabu extract for any property?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "ניתן להזמין נסח טאבו עבור כל נכס הרשום בפנקסי המקרקעין בישראל. עם זאת, עבור נכסים חדשים שטרם נרשמו בטאבו, או נכסים באזורים מסוימים שבהם הרישום אינו מלא, ייתכן שלא יהיה ניתן לקבל נסח."
                              : "You can order a Tabu extract for any property registered in the Land Registry in Israel. However, for new properties not yet registered in Tabu, or properties in certain areas where registration is not complete, it may not be possible to obtain an extract."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-9" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL ? "האם אני מקבל חשבונית מס?" : "Do I receive a tax invoice?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? 'כן, יחד עם הנסח, תקבל גם חשבונית מס דיגיטלית לכתובת האימייל שסיפקת. החשבונית כוללת את כל הפרטים הנדרשים לפי חוק, כולל מע"מ.'
                              : "Yes, along with the extract, you will also receive a digital tax invoice to the email address you provided. The invoice includes all the details required by law, including VAT."}
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-10" className="border-b border-gray-700 py-4">
                          <AccordionTrigger className="text-white hover:text-primary-400">
                            {isRTL
                              ? "מה קורה אם לא ניתן למצוא את הנכס לפי הכתובת שסיפקתי?"
                              : "What happens if the property cannot be found by the address I provided?"}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {isRTL
                              ? "אם צוות המומחים שלנו לא מצליח לאתר את הנכס לפי הכתובת שסיפקת, ניצור איתך קשר לקבלת מידע נוסף או להציע פתרונות חלופיים. אם בסופו של דבר לא ניתן לאתר את הנכס, תקבל החזר מלא."
                              : "If our team of experts cannot locate the property according to the address you provided, we will contact you for additional information or to offer alternative solutions. If the property ultimately cannot be located, you will receive a full refund."}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="mt-8 text-center">
                        <p className="text-gray-400 mb-4">
                          {isRTL
                            ? "לא מצאת את התשובה לשאלה שלך? צור איתנו קשר ונשמח לעזור"
                            : "Didn't find the answer to your question? Contact us and we'll be happy to help"}
                        </p>
                        <Button asChild className="bg-primary-500 hover:bg-primary-600">
                          <Link href="/contact">{isRTL ? "צור קשר" : "Contact Us"}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-16 rounded-xl border border-primary-500/20 bg-gradient-to-b from-gray-900 to-gray-900/95 p-8 shadow-xl shadow-primary-500/5 backdrop-blur-sm">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold text-white">
                  {isRTL ? "מוכן להזמין נסח טאבו?" : "Ready to Order Your Tabu Extract?"}
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                  {isRTL
                    ? "הזמן עכשיו וקבל את הנסח תוך דקות ספורות"
                    : "Order now and receive your extract within minutes"}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20 w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/order">{isRTL ? "הזמן נסח טאבו" : "Order Tabu Extract"}</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary-500/50 text-primary-400 hover:bg-primary-500/10 w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/services">{isRTL ? "השירותים שלנו" : "Our Services"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
