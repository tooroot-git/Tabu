"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Autocomplete } from "@/components/ui/autocomplete"
import { useLocationSearch } from "@/hooks/use-location-search"
import { ArrowLeft, ArrowRight, Info, FileText, Check, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function OrderPage() {
  const router = useRouter()
  const { isRTL } = useLanguage()
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const [activeTab, setActiveTab] = useState<"property" | "address">("property")
  const [serviceType, setServiceType] = useState<"regular" | "historical" | "concentrated">("regular")
  const [isLoading, setIsLoading] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const { cities, streets, loadingCities, loadingStreets, searchCities, searchStreets, selectedCity, setSelectedCity } =
    useLocationSearch()

  const [formData, setFormData] = useState({
    block: "",
    parcel: "",
    subParcel: "",
    street: "",
    city: "",
    houseNumber: "",
    email: "",
    name: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update the selectedCity when formData.city changes
  useEffect(() => {
    if (formData.city) {
      setSelectedCity(formData.city)
    }
  }, [formData.city, setSelectedCity])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (activeTab === "property") {
      if (!formData.block) {
        newErrors.block = isRTL ? "נא להזין מספר גוש" : "Please enter block number"
      }
      if (!formData.parcel) {
        newErrors.parcel = isRTL ? "נא להזין מספר חלקה" : "Please enter parcel number"
      }
    } else if (activeTab === "address") {
      if (!formData.street) {
        newErrors.street = isRTL ? "נא להזין רחוב" : "Please enter street"
      }
      if (!formData.city) {
        newErrors.city = isRTL ? "נא להזין עיר" : "Please enter city"
      }
      if (!formData.houseNumber) {
        newErrors.houseNumber = isRTL ? "נא להזין מספר בית" : "Please enter house number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to payment page
      window.location.href = "/payment"
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  // FAQ data
  const faqItems = [
    {
      question: isRTL ? "מתי צריך להוציא נסח טאבו?" : "When do I need a Land Registry Extract?",
      answer: isRTL
        ? `חובה להוציא את נסח הטאבו בשלב בדיקת הנכס – כאשר אנו מעוניינים לקנות את הדירה לבדיקה הראשונית, לפני חתימה על חוזה רכישה וזאת על מנת לראות שמצבה המשפטי של הדירה לא השתנה.
      
      דוגמאות למקרים בהם חשוב לבדוק:
      • נכס שנמכר לשני גורמים
      • עיקולים שבוצעו על הנכס
      • ביצוע פעולה שתגרום לעיכוב ברישום הבטוחה
      
      לאחר רישום הערת אזהרה לטובת הרוכש יש להוציא נסח טאבו על מנת לוודא הרישום בוצע כהלכה, וכן בכדי לקבל את הזכות (במידה וצריך) לקבלת משכנתא.`
        : `It is essential to obtain a Land Registry Extract during the property inspection stage – when we are interested in buying the property for initial examination, before signing a purchase contract, to verify that the legal status of the property has not changed.
      
      Examples of important cases to check:
      • Property sold to multiple parties
      • Liens placed on the property
      • Actions that may delay security registration
      
      After registering a warning note in favor of the buyer, a Land Registry Extract should be obtained to ensure the registration was done properly, and to obtain the right (if needed) to receive a mortgage.`,
    },
    {
      question: isRTL ? "מהו פנקס הבתים המשותפים?" : "What is the Condominium Registry?",
      answer: isRTL
        ? `המושג בית משותף קיים במקרים בהם יש על אותה חלקה שתי דירות או יותר, בעל מבנה אחד או יותר. הבית המשותף רשום בפנקס הבתים המשותפים בלשכות רישום המקרקעין (טאבו).
      
      בצו הרישום של הבית המשותף מפורטים הנתונים הבאים:
      • מספר דירות בבית המשותף
      • שמות הבעלים שלהם יש זכויות קנייניות בדירות
      • שטח הרצפה של כל דירה (נטו) במ"ר
      • מספר חלקת-המשנה של הדירה
      • שטחים שהוצאו מהרכוש המשותף והוצמדו לדירות (אם קיימים כאלה)
      • מספר גוש וחלקה
      • חלקים מסוימים ברכוש המשותף הצמודים לכל דירה
      • תקנון מוסכם (בבתים שבהם נערך הסכם בין בעלי הדירות)`
        : `The term condominium exists in cases where there are two or more apartments on the same parcel, with one or more structures. The condominium is registered in the Condominium Registry at the Land Registry offices.
      
      The registration order of the condominium details the following information:
      • Number of apartments in the condominium
      • Names of owners who have property rights in the apartments
      • Floor area of each apartment (net) in square meters
      • Sub-parcel number of the apartment
      • Areas excluded from the common property and attached to apartments (if any)
      • Block and parcel number
      • Specific parts of the common property attached to each apartment
      • Agreed bylaws (in buildings where an agreement was made between apartment owners)`,
    },
    {
      question: isRTL ? "מה המושג 'הערת אזהרה'?" : "What is a 'Warning Note'?",
      answer: isRTL
        ? `הערת אזהרה נרשמת בלשכות רישום המקרקעין (טאבו) על הרישום של נכס מסוים.
      
      הערת אזהרה באה על מנת להזהיר את מי שרוכש את הדירה שיש רישום בנכס הנ"ל של אדם נוסף או של בנק. הדבר נועד גם על מנת שלא יווצר מצב שבו אדם מוכר את הנכס שלו למספר אנשים.
      
      הערת אזהרה נרשמת לרוב על שם רוכש הדירה עד לסיום התשלומים שבו נרשמות זכויות מלאות של הרוכש. הערת אזהרה נרשמת גם לבנקים למשכנתאות בכפוף לכתב התחייבות אשר מחייב את הרוכש (הלווה) לרשום משכנתא לאחר סיום תהליך העברת הזכויות בנכס.`
        : `A warning note is registered in the Land Registry offices on the registration of a specific property.
      
      The warning note serves to warn anyone purchasing the property that there is a registration on this property of another person or a bank. It is also intended to prevent a situation where a person sells their property to multiple people.
      
      A warning note is usually registered in the name of the apartment buyer until the completion of payments, at which point the full rights of the buyer are registered. A warning note is also registered for mortgage banks subject to a letter of commitment that obligates the buyer (borrower) to register a mortgage after completing the process of transferring rights in the property.`,
    },
    {
      question: isRTL ? "מה זה גוש וחלקה?" : "What is Block and Parcel?",
      answer: isRTL
        ? `מספר הגוש החלקה והתת חלקה אלה המספרים שבגינם ניתן לקבל זיהוי מדויק של נכס מסוים.
      
      • הגוש מראה את כל מתחם בנינים מסוים (מה שאומר שייתכן מאד כי מספר בנינים יהיו קשורים עם אותו מספר גוש).
      • החלקה מראה את אותו בנין ספציפי אותו אנו מחפשים (עפ"י המספר ברחוב עצמו).
      • והתת חלקה מראה את מספר הדירה (לא בהכרח).
      
      בעת ביצוע רישום נכס (מגרש) בפנקס הבתים המשותפים, בהגשת המסמכים בלשכת המפקחת לרישום כבית משותף ניתנים מספרי התת חלקות עפ"י תוכניות בנין. מה שאומר שבעת הרישום המספרים ניתנים עפ"י קומות או לחילופין על עפ"י צדדי הבנין. ועל כן לא בהכרח מי שגר בדירה מס' 4 יהיה רשום כתת חלקה 4.`
        : `The block, parcel, and sub-parcel numbers are the numbers by which an exact identification of a specific property can be obtained.
      
      • The block shows an entire building complex (which means that several buildings may be associated with the same block number).
      • The parcel shows the specific building we are looking for (according to the street number itself).
      • And the sub-parcel shows the apartment number (not necessarily).
      
      When registering a property (plot) in the Condominium Registry, when submitting documents to the inspector's office for registration as a condominium, sub-parcel numbers are given according to building plans. This means that during registration, the numbers are given according to floors or alternatively according to the sides of the building. Therefore, someone living in apartment No. 4 will not necessarily be registered as sub-parcel 4.`,
    },
    {
      question: isRTL
        ? 'אילו פרטים אוכל לקבל ע"י קבלת נסח טאבו?'
        : "What information can I get from a Land Registry Extract?",
      answer: isRTL
        ? `נסח טאבו מספק מידע רב על הנכס, כולל:
      
      • האם הנכס רשום בבעלותי או שעדיין מופיע כבעלות של מוכרי הנכס והזכויות שלי מופיעות עדיין כהערת אזהרה.
      • האם הנכס רשום בטאבו או ברשות אחרת.
      • האם הנכס עצמו מופיע כבית משותף (מה שאומר שהוא רשום בפנקס הבתים המשותפים) ועל כן קיימת תת חלקה בגינה שמי מופיע.
      • גודל הנכס כפי שהוא מופיע בטאבו (בדר"כ גודל נטו).
      • האם קיימים עיקולים/שיעבודים והערות נוספות על הנכס.
      • במידה וקיים תקנון מוסכם בין הדיירים, קיימת הערה בנסח בגין קיומו.
      • במידה וקיימות הצמדות לנכס הן יופיעו בנסח (חניה, רכוש משותף, גג וכו').
      • חכירה על הנכס כולל את תאריך סיומה.`
        : `A Land Registry Extract provides extensive information about the property, including:
      
      • Whether the property is registered in my name or still appears as owned by the property sellers and my rights still appear as a warning note.
      • Whether the property is registered in the Land Registry or another authority.
      • Whether the property itself appears as a condominium (meaning it is registered in the Condominium Registry) and therefore there is a sub-parcel in which my name appears.
      • The size of the property as it appears in the Land Registry (usually net size).
      • Whether there are liens/encumbrances and additional notes on the property.
      • If there is an agreed bylaw between the residents, there is a note in the extract regarding its existence.
      • If there are attachments to the property, they will appear in the extract (parking, common property, roof, etc.).
      • Leasehold on the property including its expiration date.`,
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {isRTL ? "הזמנת נסח טאבו" : "Order Land Registry Extract"}
              </h1>
              <p className="text-gray-600 text-lg">
                {isRTL
                  ? "הזמן נסח טאבו דיגיטלי באופן מקוון, מהיר ומאובטח. קבל את המסמך הרשמי ישירות למייל תוך דקות."
                  : "Order digital land registry extracts online, quickly and securely. Receive the official document directly to your email within minutes."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                <div className="text-primary-500 mb-2">
                  <Check className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <div className="text-gray-900 font-medium mb-1">{isRTL ? "מסמך רשמי" : "Official Document"}</div>
                  <div className="text-gray-500 text-sm">{isRTL ? "חתום דיגיטלית" : "Digitally signed"}</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                <div className="text-primary-500 mb-2">
                  <Check className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <div className="text-gray-900 font-medium mb-1">{isRTL ? "קבלה מיידית" : "Instant Delivery"}</div>
                  <div className="text-gray-500 text-sm">{isRTL ? "תוך דקות ספורות" : "Within minutes"}</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                <div className="text-primary-500 mb-2">
                  <Check className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <div className="text-gray-900 font-medium mb-1">{isRTL ? "תשלום מאובטח" : "Secure Payment"}</div>
                  <div className="text-gray-500 text-sm">{isRTL ? "הגנת SSL" : "SSL Protection"}</div>
                </div>
              </div>
            </div>

            <Card className="shadow-md mb-8">
              <CardHeader className="border-b border-gray-100 pb-4">
                <CardTitle className="text-xl">{isRTL ? "פרטי הזמנה" : "Order Details"}</CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-gray-900 mb-3 font-medium">
                    {isRTL ? "בחר את סוג הנסח המבוקש" : "Select extract type"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={serviceType === "regular" ? "default" : "outline"}
                      onClick={() => setServiceType("regular")}
                      className="flex-1 transition-all duration-200"
                    >
                      {isRTL ? "נסח רגיל" : "Regular"}
                    </Button>
                    <Button
                      size="sm"
                      variant={serviceType === "historical" ? "default" : "outline"}
                      onClick={() => setServiceType("historical")}
                      className="flex-1 transition-all duration-200"
                    >
                      {isRTL ? "היסטורי" : "Historical"}
                    </Button>
                    <Button
                      size="sm"
                      variant={serviceType === "concentrated" ? "default" : "outline"}
                      onClick={() => setServiceType("concentrated")}
                      className="flex-1 transition-all duration-200"
                    >
                      {isRTL ? "מרוכז" : "Concentrated"}
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="property" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="property" className="transition-all duration-200">
                      {isRTL ? "גוש וחלקה" : "Block & Parcel"}
                    </TabsTrigger>
                    <TabsTrigger value="address" className="transition-all duration-200">
                      {isRTL ? "לפי כתובת" : "By Address"}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="property" className="space-y-4 mt-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-gray-900 text-sm font-medium">
                        {isRTL ? "נסח טאבו - רגיל" : "Land Registry - Regular"}
                      </h3>
                      <div className="text-xs text-gray-500 flex items-center">
                        <button
                          onClick={() => setActiveTab("address")}
                          className="text-primary-500 hover:underline flex items-center transition-colors duration-200"
                        >
                          <span>{isRTL ? "אין לך את פרטי הגוש והחלקה?" : "Don't have block and parcel details?"}</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <Input
                        id="block"
                        name="block"
                        value={formData.block}
                        onChange={handleInputChange}
                        placeholder={isRTL ? "לדוגמה: 6941" : "e.g., 6941"}
                        label={isRTL ? "גוש" : "Block"}
                        error={errors.block}
                        className={isRTL ? "text-right" : "text-left"}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                    <div>
                      <Input
                        id="parcel"
                        name="parcel"
                        value={formData.parcel}
                        onChange={handleInputChange}
                        placeholder={isRTL ? "לדוגמה: 128" : "e.g., 128"}
                        label={isRTL ? "חלקה" : "Parcel"}
                        error={errors.parcel}
                        className={isRTL ? "text-right" : "text-left"}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                    <div>
                      <Input
                        id="subParcel"
                        name="subParcel"
                        value={formData.subParcel}
                        onChange={handleInputChange}
                        placeholder={isRTL ? "לדוגמה: 2" : "e.g., 2"}
                        label={isRTL ? "תת-חלקה" : "Sub-Parcel"}
                        helperText={isRTL ? "(אופציונלי)" : "(optional)"}
                        className={isRTL ? "text-right" : "text-left"}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="address" className="space-y-4 mt-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-gray-900 text-sm font-medium">
                        {isRTL ? "חיפוש לפי כתובת" : "Search by Address"}
                      </h3>
                    </div>
                    <div>
                      <Autocomplete
                        options={cities}
                        value={formData.city}
                        onChange={(value) => {
                          setFormData((prev) => ({ ...prev, city: value }))
                          if (errors.city) {
                            setErrors((prev) => {
                              const newErrors = { ...prev }
                              delete newErrors.city
                              return newErrors
                            })
                          }
                        }}
                        onSearch={searchCities}
                        placeholder={isRTL ? "בחר עיר" : "Select city"}
                        emptyMessage={isRTL ? "לא נמצאו תוצאות" : "No results found"}
                        label={isRTL ? "עיר" : "City"}
                        error={errors.city}
                        isLoading={loadingCities}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                    <div>
                      <Autocomplete
                        options={streets}
                        value={formData.street}
                        onChange={(value) => {
                          setFormData((prev) => ({ ...prev, street: value }))
                          if (errors.street) {
                            setErrors((prev) => {
                              const newErrors = { ...prev }
                              delete newErrors.street
                              return newErrors
                            })
                          }
                        }}
                        onSearch={searchStreets}
                        placeholder={isRTL ? "בחר רחוב" : "Select street"}
                        emptyMessage={
                          !formData.city
                            ? isRTL
                              ? "יש לבחור עיר תחילה"
                              : "Please select a city first"
                            : isRTL
                              ? "לא נמצאו תוצאות"
                              : "No results found"
                        }
                        label={isRTL ? "רחוב" : "Street"}
                        error={errors.street}
                        isLoading={loadingStreets}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                    <div>
                      <Input
                        id="houseNumber"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                        placeholder={isRTL ? "לדוגמה: 123" : "e.g., 123"}
                        label={isRTL ? "מספר בית" : "House #"}
                        error={errors.houseNumber}
                        className={isRTL ? "text-right" : "text-left"}
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">{isRTL ? "סוג נסח:" : "Extract type:"}</span>
                    <span className="text-gray-900 font-medium">
                      {serviceType === "regular"
                        ? isRTL
                          ? "נסח רגיל"
                          : "Regular Extract"
                        : serviceType === "historical"
                          ? isRTL
                            ? "נסח היסטורי"
                            : "Historical Extract"
                          : isRTL
                            ? "נסח מרוכז"
                            : "Concentrated Extract"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{isRTL ? "מחיר:" : "Price:"}</span>
                    <span className="text-primary-500 font-bold text-xl">
                      ₪{serviceType === "regular" ? "69" : serviceType === "historical" ? "89" : "79"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-md bg-blue-50 p-3 border border-blue-100">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <p className="text-xs text-blue-700">
                      {isRTL
                        ? 'הנסח יישלח לדוא"ל שלך מיד לאחר התשלום. המסמך חתום דיגיטלית ומאושר רשמית.'
                        : "The extract will be sent to your email immediately after payment. The document is digitally signed and officially approved."}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-gray-100 p-4">
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-200 py-6 text-lg"
                  rightIcon={<ArrowIcon className="h-5 w-5" />}
                  isLoading={isLoading}
                  loadingText={isRTL ? "מעבד..." : "Processing..."}
                >
                  {isRTL ? "המשך לתשלום" : "Continue to Payment"}
                </Button>
              </CardFooter>
            </Card>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="h-8 w-1 bg-primary-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isRTL ? "מהו נסח טאבו?" : "What is a Land Registry Extract?"}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-gray-600 mb-4">
                  {isRTL
                    ? "נסח טאבו הינו מסמך רשמי המונפק על ידי רשם המקרקעין (טאבו) של משרד המשפטים. המסמך מכיל מידע מקיף על הנכס, כולל פרטי הבעלות, שעבודים, משכנתאות, הערות אזהרה ועוד."
                    : "A Land Registry Extract is an official document issued by the Land Registry Office of the Ministry of Justice. The document contains comprehensive information about the property, including ownership details, liens, mortgages, warning notes, and more."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="text-primary-500 mr-2 mt-1 flex-shrink-0">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "פרטי הבעלות המלאים של הנכס, כולל שמות הבעלים ומספרי זהות"
                        : "Complete ownership details of the property, including owners' names and ID numbers"}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary-500 mr-2 mt-1 flex-shrink-0">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "מידע על הערות אזהרה שנרשמו על הנכס"
                        : "Information about warning notes registered on the property"}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary-500 mr-2 mt-1 flex-shrink-0">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      {isRTL ? "פרטים על משכנתאות ושעבודים" : "Details about mortgages and liens"}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary-500 mr-2 mt-1 flex-shrink-0">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "מידע על גודל הנכס והצמדות (חניה, מחסן, גג וכו')"
                        : "Information about property size and attachments (parking, storage, roof, etc.)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="h-8 w-1 bg-primary-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isRTL ? "דוגמת נסח טאבו" : "Sample Land Registry Extract"}
                </h2>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className="relative w-full max-w-md">
                    <Image
                      src="/tabu-sample.png"
                      alt={isRTL ? "דוגמת נסח טאבו" : "Sample Land Registry Extract"}
                      width={600}
                      height={800}
                      className="rounded-lg border border-gray-300 shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent rounded-lg flex items-end justify-center">
                      <Button
                        variant="outline"
                        className="mb-4 bg-white/80 border-gray-300 transition-all duration-200"
                      >
                        {isRTL ? "הגדל להצגה" : "Enlarge to view"}
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-center text-sm">
                  {isRTL
                    ? "* זוהי דוגמה בלבד. הנסח שתקבל יהיה מעודכן לתאריך ושעת ההפקה."
                    : "* This is just an example. The extract you receive will be updated to the date and time of production."}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="h-8 w-1 bg-primary-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isRTL ? "שאלות נפוצות" : "Frequently Asked Questions"}
                </h2>
              </div>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <button
                      className="w-full p-4 text-left flex justify-between items-center transition-colors duration-200 hover:bg-gray-50"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <h3 className="text-gray-900 font-medium">{item.question}</h3>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedFaq === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 pt-0 border-t border-gray-200">
                        <p className="text-gray-600 whitespace-pre-line text-sm">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-1 bg-primary-500 rounded-full mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900">{isRTL ? "שירותים נוספים" : "Additional Services"}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/property-search">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-primary-500 transition-colors duration-200">
                    <div className="flex items-center mb-3">
                      <div className="bg-primary-500/10 p-2 rounded-lg mr-3">
                        <FileText className="h-6 w-6 text-primary-500" />
                      </div>
                      <h3 className="text-gray-900 font-medium">
                        {isRTL ? "איתור נכסים לפי ת.ז" : "Property Search by ID"}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "שירות המאפשר לאתר את כל הנכסים הרשומים על שמך במרשם המקרקעין"
                        : "A service that allows you to locate all properties registered under your name in the Land Registry"}
                    </p>
                  </div>
                </Link>
                <Link href="/services">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-primary-500 transition-colors duration-200">
                    <div className="flex items-center mb-3">
                      <div className="bg-primary-500/10 p-2 rounded-lg mr-3">
                        <FileText className="h-6 w-6 text-primary-500" />
                      </div>
                      <h3 className="text-gray-900 font-medium">{isRTL ? "כל השירותים שלנו" : "All Our Services"}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "גלה את מגוון השירותים המקצועיים שאנו מציעים בתחום המקרקעין"
                        : "Discover the range of professional services we offer in the real estate field"}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
