"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// FAQ items
const faqItems = [
  {
    questionEn: "How do I download my Tabu extract?",
    questionHe: "איך אני מוריד את נסח הטאבו שלי?",
    answerEn:
      "Once your order is processed, you'll receive an email with a download link. You can also find all your documents in the 'My Orders' section of your dashboard.",
    answerHe:
      "לאחר עיבוד ההזמנה שלך, תקבל אימייל עם קישור להורדה. תוכל גם למצוא את כל המסמכים שלך בחלק 'ההזמנות שלי' בלוח הבקרה.",
  },
  {
    questionEn: "How long does it take to process an order?",
    questionHe: "כמה זמן לוקח לעבד הזמנה?",
    answerEn:
      "Most orders are processed within 1-2 business hours. Complex or historical extracts may take up to 24 hours.",
    answerHe: "רוב ההזמנות מעובדות תוך 1-2 שעות עבודה. נסחים מורכבים או היסטוריים עשויים להימשך עד 24 שעות.",
  },
  {
    questionEn: "What payment methods do you accept?",
    questionHe: "אילו אמצעי תשלום אתם מקבלים?",
    answerEn: "We accept all major credit cards, PayPal, and bank transfers for business accounts.",
    answerHe: "אנו מקבלים את כל כרטיסי האשראי העיקריים, PayPal והעברות בנקאיות לחשבונות עסקיים.",
  },
  {
    questionEn: "Are the documents legally valid?",
    questionHe: "האם המסמכים תקפים מבחינה משפטית?",
    answerEn:
      "Yes, all documents provided through our service are official extracts from the Israel Land Registry and are legally valid for all purposes.",
    answerHe:
      "כן, כל המסמכים המסופקים דרך השירות שלנו הם נסחים רשמיים מרשם המקרקעין בישראל ותקפים מבחינה משפטית לכל מטרה.",
  },
]

export default function HelpSupportPage() {
  const { isRTL } = useLanguage()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset messages
    setSuccessMessage(null)
    setErrorMessage(null)

    // Validate form
    if (!name || !email || !message) {
      setErrorMessage(isRTL ? "אנא מלא את כל השדות הנדרשים" : "Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Here you would typically send the support request to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage(
        isRTL
          ? "פנייתך נשלחה בהצלחה. צוות התמיכה שלנו יחזור אליך בהקדם."
          : "Your request has been sent successfully. Our support team will get back to you shortly.",
      )

      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (error) {
      setErrorMessage(
        isRTL
          ? "אירעה שגיאה בשליחת הפנייה. אנא נסה שוב מאוחר יותר."
          : "An error occurred while sending your request. Please try again later.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{isRTL ? "עזרה ותמיכה" : "Help & Support"}</h1>
        <p className="text-gray-400 mt-1">
          {isRTL ? "קבל עזרה ותמיכה בנושאים שונים" : "Get help and support on various topics"}
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-500/10 p-4 text-green-500">
          <Check className="h-5 w-5" />
          <p>{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-500/10 p-4 text-red-500">
          <AlertCircle className="h-5 w-5" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - FAQ and Resources */}
        <div className="space-y-6">
          {/* FAQ Card */}
          <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-primary-500/10 p-2">
                <HelpCircle className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <CardTitle className="text-white">{isRTL ? "שאלות נפוצות" : "Frequently Asked Questions"}</CardTitle>
                <CardDescription>
                  {isRTL ? "תשובות לשאלות הנפוצות ביותר" : "Answers to the most common questions"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                    <button
                      className="flex w-full items-center justify-between text-left"
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="font-medium text-white">{isRTL ? item.questionHe : item.questionEn}</h3>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    {expandedFaq === index && (
                      <p className="mt-2 text-sm text-gray-400">{isRTL ? item.answerHe : item.answerEn}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="link" asChild>
                  <Link href="/faq" className="text-primary-400 hover:text-primary-300">
                    {isRTL ? "צפה בכל השאלות הנפוצות" : "View all FAQs"}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resources Card */}
          <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-blue-500/10 p-2">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-white">{isRTL ? "משאבים" : "Resources"}</CardTitle>
                <CardDescription>{isRTL ? "מדריכים ומסמכים שימושיים" : "Helpful guides and documents"}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link
                  href="/guides/how-to-read-tabu"
                  className="flex items-center gap-3 rounded-lg border border-gray-800 p-3 hover:bg-gray-800/50 transition-colors"
                >
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-white">
                      {isRTL ? "איך לקרוא נסח טאבו" : "How to Read a Tabu Extract"}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {isRTL ? "מדריך מפורט להבנת נסח טאבו" : "A detailed guide to understanding a Tabu extract"}
                    </p>
                  </div>
                </Link>

                <Link
                  href="/guides/property-ownership"
                  className="flex items-center gap-3 rounded-lg border border-gray-800 p-3 hover:bg-gray-800/50 transition-colors"
                >
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-white">
                      {isRTL ? "בעלות על נכסים בישראל" : "Property Ownership in Israel"}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {isRTL ? "מידע על בעלות על נכסים בישראל" : "Information about property ownership in Israel"}
                    </p>
                  </div>
                </Link>

                <Link
                  href="/guides/document-types"
                  className="flex items-center gap-3 rounded-lg border border-gray-800 p-3 hover:bg-gray-800/50 transition-colors"
                >
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-white">{isRTL ? "סוגי מסמכים" : "Document Types"}</h3>
                    <p className="text-xs text-gray-400">
                      {isRTL ? "הסבר על סוגי המסמכים השונים" : "Explanation of different document types"}
                    </p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Contact Form and Info */}
        <div className="space-y-6">
          {/* Contact Form Card */}
          <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-green-500/10 p-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-white">{isRTL ? "צור קשר" : "Contact Us"}</CardTitle>
                <CardDescription>
                  {isRTL ? "שלח לנו הודעה ונחזור אליך בהקדם" : "Send us a message and we'll get back to you shortly"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white">
                      {isRTL ? "שם" : "Name"}
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isRTL ? "הזן את שמך" : "Enter your name"}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white">
                      {isRTL ? "אימייל" : "Email"}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isRTL ? "הזן את האימייל שלך" : "Enter your email"}
                      required
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-white">
                    {isRTL ? "נושא" : "Subject"}
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={isRTL ? "הזן את נושא הפנייה" : "Enter subject"}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white">
                    {isRTL ? "הודעה" : "Message"}
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isRTL ? "הזן את הודעתך" : "Enter your message"}
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      {isRTL ? "שולח..." : "Sending..."}
                    </>
                  ) : isRTL ? (
                    "שלח הודעה"
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info Card */}
          <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-purple-500/10 p-2">
                <Phone className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <CardTitle className="text-white">{isRTL ? "פרטי התקשרות" : "Contact Information"}</CardTitle>
                <CardDescription>
                  {isRTL ? "דרכים נוספות ליצירת קשר" : "Additional ways to get in touch"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">{isRTL ? "אימייל" : "Email"}</h3>
                    <a
                      href="mailto:support@tabuisrael.co.il"
                      className="text-sm text-primary-400 hover:text-primary-300"
                    >
                      support@tabuisrael.co.il
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">{isRTL ? "טלפון" : "Phone"}</h3>
                    <a href="tel:+972-3-1234567" className="text-sm text-primary-400 hover:text-primary-300" dir="ltr">
                      +972-3-123-4567
                    </a>
                    <p className="text-xs text-gray-400 mt-1">
                      {isRTL ? "ימים א'-ה', 9:00-17:00" : "Sunday-Thursday, 9:00 AM-5:00 PM"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white">{isRTL ? "צ'אט חי" : "Live Chat"}</h3>
                    <p className="text-sm text-gray-400">
                      {isRTL ? "זמין בימים א'-ה', 9:00-17:00" : "Available Sunday-Thursday, 9:00 AM-5:00 PM"}
                    </p>
                    <Button
                      variant="link"
                      className="px-0 text-primary-400 hover:text-primary-300"
                      onClick={() => alert(isRTL ? "צ'אט חי יהיה זמין בקרוב" : "Live chat will be available soon")}
                    >
                      {isRTL ? "התחל צ'אט" : "Start Chat"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
