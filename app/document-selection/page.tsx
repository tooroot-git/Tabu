// בדיקה אם יש ייבוא של @/lib/auth0 ותיקון אם צריך
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { DocumentCard } from "@/components/ui/document-card"

export default function DocumentSelectionPage() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [selectedDocument, setSelectedDocument] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Get order details from session storage
    const details = sessionStorage.getItem("orderDetails")
    if (!details) {
      router.push("/order")
      return
    }

    setOrderDetails(JSON.parse(details))
  }, [router])

  const documentTypes = [
    {
      id: "regular",
      title: isRTL ? "נסח רגיל" : "Regular Extract",
      description: isRTL
        ? "נסח טאבו סטנדרטי המציג את פרטי הבעלות הנוכחיים של הנכס"
        : "Standard Tabu extract showing current ownership details of the property",
      price: 39,
    },
    {
      id: "historical",
      title: isRTL ? "נסח היסטורי" : "Historical Extract",
      description: isRTL
        ? "נסח טאבו מורחב הכולל היסטוריית בעלות ועסקאות קודמות"
        : "Extended Tabu extract including ownership history and previous transactions",
      price: 69,
    },
    {
      id: "concentrated",
      title: isRTL ? "נסח מרוכז" : "Concentrated Extract",
      description: isRTL
        ? "נסח טאבו מקוצר המציג את המידע החיוני ביותר בפורמט תמציתי"
        : "Condensed Tabu extract showing the most essential information in a concise format",
      price: 29,
    },
    {
      id: "full",
      title: isRTL ? "נסח מלא" : "Full Extract",
      description: isRTL
        ? "נסח טאבו מלא הכולל את כל המידע הזמין, כולל הערות, משכנתאות ושעבודים"
        : "Complete Tabu extract including all available information, including notes, mortgages, and liens",
      price: 89,
    },
  ]

  const handleContinue = async () => {
    if (!selectedDocument) {
      return
    }

    setIsLoading(true)

    try {
      // Check if user is logged in
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // Update order details in session storage
      const updatedDetails = {
        ...orderDetails,
        documentType: selectedDocument,
        price: documentTypes.find((doc) => doc.id === selectedDocument).price,
        userId: session?.user?.id || null,
      }

      sessionStorage.setItem("orderDetails", JSON.stringify(updatedDetails))

      // Navigate to payment page
      router.push("/payment")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!orderDetails) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-24">
          <div className="container mx-auto px-4">
            <div className="flex h-[50vh] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Stepper
              steps={[
                { label: isRTL ? "פרטי נכס" : "Property Details", completed: true },
                { label: isRTL ? "בחירת מסמך" : "Document Selection", active: true },
                { label: isRTL ? "תשלום" : "Payment" },
              ]}
              currentStep={1}
            />

            <Card className="mt-8 border-gray-800 bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">{isRTL ? "בחר סוג מסמך" : "Select Document Type"}</CardTitle>
                <CardDescription className="text-gray-400">
                  {isRTL ? "בחר את סוג נסח הטאבו שברצונך להזמין" : "Choose the type of Tabu extract you want to order"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {documentTypes.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      title={doc.title}
                      description={doc.description}
                      price={doc.price}
                      selected={selectedDocument === doc.id}
                      onClick={() => setSelectedDocument(doc.id)}
                    />
                  ))}
                </div>

                <div className="mt-8">
                  <Button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600"
                    disabled={!selectedDocument || isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 animate-spin rtl:ml-2 rtl:mr-0"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {isRTL ? "מעבד..." : "Processing..."}
                      </span>
                    ) : isRTL ? (
                      "המשך לתשלום"
                    ) : (
                      "Continue to Payment"
                    )}
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
