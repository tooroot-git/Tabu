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
  const street = searchParams.get("street") || ""
  const houseNumber = searchParams.get("houseNumber") || ""
  const city = searchParams.get("city") || ""
  const inputType = searchParams.get("inputType") || "blockParcel"
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
    if (inputType === "address") {
      window.location.href = `/payment?street=${encodeURIComponent(street)}&houseNumber=${encodeURIComponent(houseNumber)}&city=${encodeURIComponent(city)}&inputType=address&service=${selectedDocument}`
    } else {
      window.location.href = `/payment?block=${block}&parcel=${parcel}&subparcel=${subparcel}&inputType=blockParcel&service=${selectedDocument}`
    }
  }

  const handleBack = () => {
    if (inputType === "address") {
      window.location.href = `/order?street=${encodeURIComponent(street)}&houseNumber=${encodeURIComponent(houseNumber)}&city=${encodeURIComponent(city)}&inputType=address`
    } else {
      window.location.href = `/order?block=${block}&parcel=${parcel}&subparcel=${subparcel}&inputType=blockParcel`
    }
  }

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
          <div className="mx-auto max-w-3xl">
            <Stepper steps={steps} currentStep={1} className="mb-8" />

            <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">{isRTL ? "בחר סוג מסמך" : "Select Document Type"}</CardTitle>
                <CardDescription className="text-gray-400">
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
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    {isRTL ? "חזור" : "Back"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleContinue}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                  >
                    {isRTL ? "המשך לתשלום" : "Continue to Payment"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
