"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const { isRTL } = useLanguage()

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      titleEn: "Email",
      titleHe: "אימייל",
      contentEn: "support@tabu.net.il",
      contentHe: "support@tabu.net.il",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      titleEn: "Phone",
      titleHe: "טלפון",
      contentEn: "+972-3-123-4567",
      contentHe: "+972-3-123-4567",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      titleEn: "Address",
      titleHe: "כתובת",
      contentEn: "123 Rothschild Blvd, Tel Aviv, Israel",
      contentHe: "שדרות רוטשילד 123, תל אביב, ישראל",
    },
  ]

  return (
    <div className={isRTL ? "font-sans-hebrew" : "font-sans"}>
      <Header />

      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              {isRTL ? "צור קשר" : "Contact Us"}
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              {isRTL ? "יש לך שאלות? אנחנו כאן כדי לעזור" : "Have questions? We're here to help"}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {contactInfo.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{isRTL ? item.titleHe : item.titleEn}</h3>
                  <p className="mt-2 text-gray-600">{isRTL ? item.contentHe : item.contentEn}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "שלח לנו הודעה" : "Send Us a Message"}</CardTitle>
                <CardDescription>
                  {isRTL
                    ? "מלא את הטופס להלן ונחזור אליך בהקדם האפשרי"
                    : "Fill out the form below and we'll get back to you as soon as possible"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        {isRTL ? "שם מלא" : "Full Name"}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={isRTL ? "הזן את שמך המלא" : "Enter your full name"}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        {isRTL ? "אימייל" : "Email"}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={isRTL ? "הזן את כתובת האימייל שלך" : "Enter your email address"}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      {isRTL ? "נושא" : "Subject"}
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder={isRTL ? "הזן את נושא ההודעה" : "Enter message subject"}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      {isRTL ? "הודעה" : "Message"}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder={isRTL ? "הזן את הודעתך כאן" : "Enter your message here"}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="gap-2">
                      <Send className="h-4 w-4" />
                      {isRTL ? "שלח הודעה" : "Send Message"}
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
