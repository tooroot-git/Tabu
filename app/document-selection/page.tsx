"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { DocumentCard } from "@/components/ui/document-card"
import { useLanguage } from "@/context/language-context"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function DocumentSelectionPage() {
  const { language, isRTL } = useLanguage()
  const searchParams = useSearchParams()

  const block = searchParams.get("block") || ""
  const parcel = searchParams.get("parcel") || ""
  const subparcel = searchParams.get("subparcel") || ""
  const serviceParam = searchParams.get("service")

  const [selectedDocument, setSelectedDocument] = useState<string>(serviceParam || "regular")

  const steps = [
    {
      title: isRTL ? "פרטי נכס" : "Property Details",
      description: isRTL ? "הזן את פרטי הנכס" : "Enter property information",
      status: "completed" as const,
    },
    {
      title: isRTL ? "בחירת מסמך" : "Document Selection",
      description: isRTL ? "בחר את סוג המסמך" : "Choose document type",
      status: "current" as const,
    },
    {
      title: isRTL ? "תשלום" : "Payment",
      description: isRTL ? "השלם את התשלום" : "Complete payment",
      status: "upcoming" as const,
    },
  ]

  const documentTypes = [
    {
      type: "regular",
      titleEn: "Regular Extract",
      titleHe: "נסח רגיל",
      descriptionEn: "Current ownership and rights information",
      descriptionHe: "מידע על בעלות וזכויות נוכחיות",
      priceEn: "₪39",
      priceHe: "₪39",
    },
    {
      type: "concentrated",
      titleEn: "Concentrated Extract",
      titleHe: "נסח מרוכז",
      descriptionEn: "Information about condominiums",
      descriptionHe: "מידע על בתים משותפים",
      priceEn: "₪59",
      priceHe: "₪59",
    },
    {
      type: "historical",
      titleEn: "Historical Extract",
      titleHe: "נסח היסטורי",
      descriptionEn: "Includes past ownership changes",
      descriptionHe: "כולל שינויי בעלות בעבר",
      priceEn: "₪69",
      priceHe: "₪69",
    },
    {
      type: "by-address",
      titleEn: "Extract by Address",
      titleHe: "נסח לפי כתובת",
      descriptionEn: "Get extract using only the address",
      descriptionHe: "קבל נסח באמצעות הכתובת בלבד",
      priceEn: "₪79",
      priceHe: "₪79",
    },
  ]

  const handleContinue = () => {
    window.location.href = `/payment?block=${block}&parcel=${parcel}&subparcel=${subparcel}&service=${selectedDocument}`
  }

  const handleBack = () => {
    window.location.href = `/order?block=${block}&parcel=${parcel}&subparcel=${subparcel}`
  }

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Stepper steps={steps} currentStep={1} className="mb-8" />

          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? "בחר סוג מסמך" : "Select Document Type"}</CardTitle>
              <CardDescription>
                {isRTL ? "בחר את סוג הנסח שברצונך להזמין" : "Choose the type of extract you want to order"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {documentTypes.map((doc) => (
                  <DocumentCard
                    key={doc.type}
                    type={doc.type as any}
                    title={isRTL ? doc.titleHe : doc.titleEn}
                    description={isRTL ? doc.descriptionHe : doc.descriptionEn}
                    price={isRTL ? doc.priceHe : doc.priceEn}
                    selected={doc.type === selectedDocument}
                    onClick={() => setSelectedDocument(doc.type)}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  {isRTL ? "חזור" : "Back"}
                </Button>
                <Button type="button" onClick={handleContinue}>
                  {isRTL ? "המשך לתשלום" : "Continue to Payment"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
