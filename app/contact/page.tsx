"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send, AlertCircle, CheckCircle, Info } from "lucide-react"
import { MetaTags } from "@/components/seo/meta-tags"
import { StructuredData } from "@/components/seo/structured-data"

export default function ContactPage() {
  const { isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isTestMode, setIsTestMode] = useState(false)

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      titleEn: "Email",
      titleHe: "אימייל",
      contentEn: "support@tabuisrael.co.il",
      contentHe: "support@tabuisrael.co.il",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setIsTestMode(false)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "support@tabuisrael.co.il",
          subject: `Contact Form: ${formData.subject}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        // בדוק אם השגיאה קשורה למצב בדיקות
        if (result.error && result.error.includes("testing emails")) {
          setIsTestMode(true)
          setSubmitSuccess(true)
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          })
        } else {
          throw new Error(result.error || "Failed to send email")
        }
      } else {
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }
    } catch (error: any) {
      console.error("Error sending email:", error)
      setSubmitError(
        isRTL
          ? "אירעה שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר או שלח אימייל ישירות ל-support@tabuisrael.co.il"
          : "An error occurred while sending your message. Please try again later or email us directly at support@tabuisrael.co.il",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const title = isRTL ? "צור קשר | טאבוי ישראל - שירות נסחי טאבו" : "Contact Us | TabuIsrael - Land Registry Service"

  const description = isRTL
    ? "צור קשר עם צוות התמיכה שלנו בכל שאלה לגבי נסחי טאבו, הזמנות, או מידע נוסף על שירותי רישום המקרקעין."
    : "Contact our support team with any questions about land registry extracts, orders, or additional information about our property registration services."

  return (
    <>
      <MetaTags title={title} description={description} />
      <StructuredData type="Organization" />

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
                {isRTL ? "צור קשר" : "Contact Us"}
              </h1>
              <p className="mt-6 text-xl text-gray-400">
                {isRTL ? "יש לך שאלות? אנחנו כאן כדי לעזור" : "Have questions? We're here to help"}
              </p>
            </div>

            <div className="mt-16 flex justify-center">
              {contactInfo.map((item, index) => (
                <Card key={index} className="border-gray-800 bg-gray-900/80 backdrop-blur-sm max-w-md w-full">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10 text-primary-500">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white">{isRTL ? item.titleHe : item.titleEn}</h3>
                    <p className="mt-2 text-gray-400">{isRTL ? item.contentHe : item.contentEn}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16">
              <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">{isRTL ? "שלח לנו הודעה" : "Send Us a Message"}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {isRTL
                      ? "מלא את הטופס להלן ונחזור אליך בהקדם האפשרי"
                      : "Fill out the form below and we'll get back to you as soon as possible"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitSuccess ? (
                    <div
                      className={`rounded relative border px-4 py-3 ${
                        isTestMode
                          ? "border-blue-500 bg-blue-500/10 text-blue-400"
                          : "border-green-500 bg-green-500/10 text-green-400"
                      }`}
                      role="alert"
                    >
                      <div className="flex items-center">
                        {isTestMode ? <Info className="mr-2 h-5 w-5" /> : <CheckCircle className="mr-2 h-5 w-5" />}
                        <strong className="font-bold">{isRTL ? "תודה!" : "Thank you!"}</strong>
                      </div>
                      <span className="block mt-1">
                        {isTestMode
                          ? isRTL
                            ? "הודעתך התקבלה במצב בדיקות. במצב זה, ההודעה נשלחת לכתובת בדיקות ולא לצוות התמיכה. האתר נמצא כרגע בשלב פיתוח."
                            : "Your message was received in test mode. In this mode, the message is sent to a test address, not to the support team. The site is currently in development."
                          : isRTL
                            ? "הודעתך נשלחה בהצלחה. נחזור אליך בהקדם."
                            : "Your message has been sent successfully. We'll get back to you soon."}
                      </span>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {submitError && (
                        <div
                          className="rounded relative border border-red-500 bg-red-500/10 px-4 py-3 text-red-400"
                          role="alert"
                        >
                          <div className="flex items-center">
                            <AlertCircle className="mr-2 h-5 w-5" />
                            <span className="font-bold">{isRTL ? "שגיאה" : "Error"}</span>
                          </div>
                          <span className="block mt-1">{submitError}</span>
                        </div>
                      )}
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "שם מלא" : "Full Name"}
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={isRTL ? "הזן את שמך המלא" : "Enter your full name"}
                            className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            {isRTL ? "אימייל" : "Email"}
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={isRTL ? "הזן את כתובת האימייל שלך" : "Enter your email address"}
                            className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                          {isRTL ? "נושא" : "Subject"}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={isRTL ? "הזן את נושא ההודעה" : "Enter message subject"}
                          className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                          {isRTL ? "הודעה" : "Message"}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          placeholder={isRTL ? "הזן את הודעתך כאן" : "Enter your message here"}
                          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800/70 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          required
                        ></textarea>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                          disabled={isSubmitting}
                        >
                          {isSubmitting && (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          )}
                          <Send className="h-4 w-4" />
                          {isRTL ? "שלח הודעה" : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
