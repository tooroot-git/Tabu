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

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {contactInfo.map((item, index) => (
              <Card key={index} className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
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
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        {isRTL ? "שם מלא" : "Full Name"}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={isRTL ? "הזן את שמך המלא" : "Enter your full name"}
                        className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        {isRTL ? "אימייל" : "Email"}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={isRTL ? "הזן את כתובת האימייל שלך" : "Enter your email address"}
                        className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                      {isRTL ? "נושא" : "Subject"}
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder={isRTL ? "הזן את נושא ההודעה" : "Enter message subject"}
                      className="mt-1 border-gray-700 bg-gray-800/70 text-white placeholder:text-gray-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      {isRTL ? "הודעה" : "Message"}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder={isRTL ? "הזן את הודעתך כאן" : "Enter your message here"}
                      className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800/70 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/20"
                    >
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
