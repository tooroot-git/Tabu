"use client"

import type React from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { AlertInfo } from "@/components/ui/alert"
import { HelpCircle, Info, User, UserPlus } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function OrderPage() {
  const { language, isRTL } = useLanguage()
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service")
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    block: "",
    parcel: "",
    subparcel: "",
  })

  // מוק לבדיקת משתמש בסביבת התצוגה המקדימה
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("mock_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setIsLoading(false)
    }
  }, [])

  const steps = [
    {
      title: isRTL ? "פרטי נכס" : "Property Details",
      description: isRTL ? "הזן את פרטי הנכס" : "Enter property information",
      status: "current" as const,
    },
    {
      title: isRTL ? "בחירת מסמך" : "Document Selection",
      description: isRTL ? "בחר את סוג המסמך" : "Choose document type",
      status: "upcoming" as const,
    },
    {
      title: isRTL ? "תשלום" : "Payment",
      description: isRTL ? "השלם את התשלום" : "Complete payment",
      status: "upcoming" as const,
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/document-selection?block=${formData.block}&parcel=${formData.parcel}&subparcel=${formData.subparcel}${serviceParam ? `&service=${serviceParam}` : ""}`
  }

  // פונקציה להתחברות בסביבת התצוגה המקדימה
  const handleLogin = () => {
    // בסביבת התצוגה המקדימה, נשמור משתמש מוק בלוקל סטורג'
    const mockUser = {
      name: "משתמש לדוגמה",
      email: "user@example.com",
      picture: "/vibrant-street-market.png",
      sub: "auth0|123456789",
      updated_at: new Date().toISOString(),
    }
    localStorage.setItem("mock_user", JSON.stringify(mockUser))
    setUser(mockUser)
    window.location.href = "/dashboard"
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
            <Stepper steps={steps} currentStep={0} className="mb-8" />

            {!user && !isLoading && (
              <Card className="mb-6 border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-between md:flex-row">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {isRTL ? "התחבר או המשך כאורח" : "Login or Continue as Guest"}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {isRTL
                          ? "התחבר כדי לעקוב אחר ההזמנות שלך ולשמור את פרטיך לרכישות עתידיות"
                          : "Login to track your orders and save your details for future purchases"}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2 md:mt-0">
                      <Button
                        variant="outline"
                        className="gap-2 border-gray-700 text-white hover:bg-gray-800"
                        onClick={handleLogin}
                      >
                        <User className="h-4 w-4" />
                        {isRTL ? "התחבר" : "Login"}
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 border-gray-700 text-white hover:bg-gray-800"
                        onClick={handleLogin}
                      >
                        <UserPlus className="h-4 w-4" />
                        {isRTL ? "הירשם" : "Sign Up"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">{isRTL ? "פרטי הנכס" : "Property Details"}</CardTitle>
                <CardDescription className="text-gray-400">
                  {isRTL
                    ? "הזן את מספרי הגוש, החלקה ותת-החלקה של הנכס"
                    : "Enter the Block (Gush), Parcel (Helka), and Sub-parcel (Tat-Helka) numbers"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertInfo
                  title={isRTL ? "טיפ" : "Tip"}
                  description={
                    isRTL
                      ? "ניתן למצוא את מספרי הגוש והחלקה בחשבון הארנונה שלך או בהסכם הרכישה"
                      : "You can find the Block and Parcel numbers on your property tax bill or purchase agreement"
                  }
                  className="mb-6"
                />

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="block" className="block text-sm font-medium text-gray-300">
                        {isRTL ? "גוש" : "Block (Gush)"}
                      </label>
                      <Input
                        id="block"
                        type="text"
                        placeholder={isRTL ? "הזן מספר גוש" : "Enter Block number"}
                        icon={<HelpCircle className="h-4 w-4 text-gray-400" />}
                        iconPosition="right"
                        helperText={isRTL ? "לדוגמה: 6941" : "Example: 6941"}
                        className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                        value={formData.block}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="parcel" className="block text-sm font-medium text-gray-300">
                        {isRTL ? "חלקה" : "Parcel (Helka)"}
                      </label>
                      <Input
                        id="parcel"
                        type="text"
                        placeholder={isRTL ? "הזן מספר חלקה" : "Enter Parcel number"}
                        icon={<HelpCircle className="h-4 w-4 text-gray-400" />}
                        iconPosition="right"
                        helperText={isRTL ? "לדוגמה: 198" : "Example: 198"}
                        className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                        value={formData.parcel}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subparcel" className="block text-sm font-medium text-gray-300">
                      {isRTL ? "תת-חלקה (אופציונלי)" : "Sub-parcel (Tat-Helka) (Optional)"}
                    </label>
                    <Input
                      id="subparcel"
                      type="text"
                      placeholder={isRTL ? "הזן מספר תת-חלקה" : "Enter Sub-parcel number"}
                      icon={<Info className="h-4 w-4 text-gray-400" />}
                      iconPosition="right"
                      helperText={
                        isRTL
                          ? "השאר ריק אם אין תת-חלקה או הזן מספר (לדוגמה: 42)"
                          : "Leave empty if there's no sub-parcel or enter a number (Example: 42)"
                      }
                      className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                      value={formData.subparcel}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                    >
                      {isRTL ? "המשך לבחירת מסמך" : "Continue to Document Selection"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
