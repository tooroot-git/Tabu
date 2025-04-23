"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DocumentCard } from "@/components/ui/document-card"
import { Stepper } from "@/components/ui/stepper"
import { useLanguage } from "@/context/language-context"
import { getPaymentLinkWithOrderDetails } from "@/lib/stripe-links"

const documentTypes = [
  {
    id: "regular",
    title: "נסח טאבו רגיל",
    titleEn: "Regular Land Registry Extract",
    description:
      "מסמך המרכז את כל המידע על בעלי הזכויות הרשומים בפנקסי המקרקעין, הכולל את תיאור המקרקעין, בעלי הזכויות ומהות זכויותיהם, וכן שעבודים ופעולות הרשומים במקרקעין, במידה וישנם.",
    descriptionEn:
      "A document that centralizes all information about the registered property owners, including property description, owners and their rights, as well as liens and actions registered on the property, if any.",
    icon: "📄",
    price: 69,
  },
  {
    id: "consolidated",
    title: "נסח טאבו מרוכז",
    titleEn: "Consolidated Land Registry Extract",
    description:
      "נסח מרוכז מעיד כי הנכס רשום בפנקס הבתים המשותפים. המושג בית משותף קיים במקרים בהם יש על אותה חלקה שתי דירות או יותר, בעל מבנה אחד או יותר.",
    descriptionEn:
      "A consolidated extract indicates that the property is registered in the Condominium Registry. The term condominium exists in cases where there are two or more apartments on the same plot, with one or more structures.",
    icon: "📑",
    price: 89,
  },
  {
    id: "historical",
    title: "נסח טאבו הסטורי",
    titleEn: "Historical Land Registry Extract",
    description:
      "נסח טאבו היסטורי כלול במידע מלא עכשוי וכולל רשומות היסטוריות ממוחשבות. כל המידע אשר נרשם מאז תקופת המחשב, כל המידע אשר קיים בתיק לפני תקופת המחשב נמצא במיקרופילים.",
    descriptionEn:
      "A historical land registry extract includes current full information and computerized historical records. All information recorded since the computer era, all information that existed in the file before the computer era is found in microfilms.",
    icon: "🕰️",
    price: 129,
  },
  {
    id: "address",
    title: "נסח טאבו לפי כתובת",
    titleEn: "Land Registry Extract by Address",
    description:
      'נציגנו יאתרו עבורכם את פרטי החלקה ע"פ הכתובת שמסרתם ויעבירו לכם למייל נסח חתום דיגיטלית. לנסח המקוון מעמד של נסח רשמי כל עוד הוא נשאר בתצורתו הדיגיטלית.',
    descriptionEn:
      "Our representatives will locate the plot details according to the address you provided and send you a digitally signed extract by email. The online extract has the status of an official extract as long as it remains in its digital form.",
    icon: "🏠",
    price: 149,
  },
  {
    id: "id-report",
    title: 'דו"ח נכסים על פי ת.ז',
    titleEn: "Property Report by ID",
    description:
      "דוח נכסים לפי תעודת זהות הינו דוח המפרט את רשימת כל הנכסים המשועבדים בהווה ו/או בעבר של אדם, אזרח בישראל.",
    descriptionEn:
      "A property report by ID is a report that details the list of all properties mortgaged in the present and/or in the past of a person, a citizen in Israel.",
    icon: "📋",
    price: 199,
  },
]

export default function DocumentSelectionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isRTL, t } = useLanguage()
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  // Get order details from URL parameters
  const block = searchParams.get("block") || ""
  const parcel = searchParams.get("parcel") || ""
  const subParcel = searchParams.get("subParcel") || ""
  const address = searchParams.get("address") || ""
  const idNumber = searchParams.get("idNumber") || ""
  const email = searchParams.get("email") || ""
  const name = searchParams.get("name") || ""

  const handleContinue = () => {
    if (!selectedDocument) return

    try {
      // Get the payment link with order details
      const paymentLink = getPaymentLinkWithOrderDetails(selectedDocument, {
        block,
        parcel,
        subParcel,
        address,
        idNumber,
        email,
        name,
      })

      // Redirect to the Stripe payment link
      window.location.href = paymentLink
    } catch (error) {
      console.error("Error generating payment link:", error)
      // Handle error - perhaps show an error message to the user
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Stepper
        steps={[
          { label: isRTL ? "פרטי נכס" : "Property Details", completed: true },
          { label: isRTL ? "בחירת מסמך" : "Document Selection", completed: false },
          { label: isRTL ? "תשלום" : "Payment", completed: false },
        ]}
        currentStep={1}
      />

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? "בחר את סוג המסמך הרצוי" : "Select Document Type"}</CardTitle>
            <CardDescription>
              {isRTL
                ? "בחר את סוג המסמך שברצונך להזמין. המחיר משתנה בהתאם לסוג המסמך."
                : "Choose the type of document you wish to order. Price varies according to document type."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentTypes.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  title={isRTL ? doc.title : doc.titleEn}
                  description={isRTL ? doc.description : doc.descriptionEn}
                  icon={doc.icon}
                  price={doc.price}
                  selected={selectedDocument === doc.id}
                  onClick={() => setSelectedDocument(doc.id)}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              {isRTL ? "חזרה" : "Back"}
            </Button>
            <Button onClick={handleContinue} disabled={!selectedDocument}>
              {isRTL ? "המשך לתשלום" : "Continue to Payment"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
