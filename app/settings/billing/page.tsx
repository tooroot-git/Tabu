"use client"
import { useEffect, useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Download, Plus, Clock, CheckCircle, Tag, Loader2 } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "@/components/ui/use-toast"

// Define types for Stripe invoices
interface Invoice {
  id: string
  created: number
  amount_paid: number
  status: string
  number: string
  hosted_invoice_url: string
  description?: string
}

export default function BillingSettings() {
  const { isRTL } = useLanguage()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(true)
  const supabase = createClientComponentClient()

  // Fetch invoices from Stripe
  useEffect(() => {
    async function fetchInvoices() {
      try {
        setLoading(true)
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData.user) {
          throw new Error("User not authenticated")
        }

        const response = await fetch("/api/billing/invoices")

        if (!response.ok) {
          throw new Error("Failed to fetch invoices")
        }

        const data = await response.json()
        setInvoices(data.invoices || [])
      } catch (error) {
        console.error("Error fetching invoices:", error)
        toast({
          title: isRTL ? "שגיאה בטעינת החשבוניות" : "Error loading invoices",
          description: isRTL ? "לא ניתן לטעון את החשבוניות שלך כרגע" : "Unable to load your invoices at this time",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    async function fetchPaymentMethods() {
      try {
        setLoadingPaymentMethods(true)
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData.user) {
          throw new Error("User not authenticated")
        }

        const response = await fetch("/api/billing/payment-methods")

        if (!response.ok) {
          throw new Error("Failed to fetch payment methods")
        }

        const data = await response.json()
        setPaymentMethods(data.paymentMethods || [])
      } catch (error) {
        console.error("Error fetching payment methods:", error)
        toast({
          title: isRTL ? "שגיאה בטעינת אמצעי תשלום" : "Error loading payment methods",
          description: isRTL
            ? "לא ניתן לטעון את אמצעי התשלום שלך כרגע"
            : "Unable to load your payment methods at this time",
          variant: "destructive",
        })
      } finally {
        setLoadingPaymentMethods(false)
      }
    }

    fetchInvoices()
    fetchPaymentMethods()
  }, [isRTL, supabase])

  // Format date based on language
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return isRTL
      ? date.toLocaleDateString("he-IL")
      : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? "he-IL" : "en-US", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
    }).format(amount / 100)
  }

  // Get status text and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "paid":
        return {
          text: isRTL ? "שולם" : "Paid",
          color: "text-green-500 bg-green-100/10",
        }
      case "open":
        return {
          text: isRTL ? "פתוח" : "Open",
          color: "text-blue-500 bg-blue-100/10",
        }
      case "uncollectible":
        return {
          text: isRTL ? "לא ניתן לגבייה" : "Uncollectible",
          color: "text-red-500 bg-red-100/10",
        }
      case "void":
        return {
          text: isRTL ? "מבוטל" : "Void",
          color: "text-gray-500 bg-gray-100/10",
        }
      default:
        return {
          text: status,
          color: "text-gray-500 bg-gray-100/10",
        }
    }
  }

  // Handle adding a new payment method
  const handleAddPaymentMethod = async () => {
    try {
      const response = await fetch("/api/billing/create-setup-intent", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to create setup intent")
      }

      const { clientSecret } = await response.json()

      // Redirect to the payment method setup page
      window.location.href = `/payment-setup?setup_intent=${clientSecret}`
    } catch (error) {
      console.error("Error creating setup intent:", error)
      toast({
        title: isRTL ? "שגיאה ביצירת אמצעי תשלום" : "Error creating payment method",
        description: isRTL
          ? "לא ניתן ליצור אמצעי תשלום חדש כרגע"
          : "Unable to create a new payment method at this time",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{isRTL ? "חיובים" : "Billing"}</h1>
        <p className="text-gray-400 mt-1">
          {isRTL ? "נהל את פרטי התשלום וההיסטוריה שלך" : "Manage your payment details and history"}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Payment Methods Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-primary-500/10 p-2">
              <CreditCard className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <CardTitle className="text-white">{isRTL ? "אמצעי תשלום" : "Payment Methods"}</CardTitle>
              <CardDescription>{isRTL ? "נהל את אמצעי התשלום שלך" : "Manage your payment methods"}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {loadingPaymentMethods ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {paymentMethods.length === 0 ? (
                  // No payment methods message
                  <div className="rounded-lg border border-dashed border-gray-700 p-6 text-center">
                    <CreditCard className="mx-auto h-8 w-8 text-gray-500 mb-2" />
                    <h3 className="text-sm font-medium text-white mb-1">
                      {isRTL ? "אין אמצעי תשלום" : "No Payment Methods"}
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                      {isRTL
                        ? "לא הוספת עדיין אמצעי תשלום. הוסף כרטיס אשראי או אמצעי תשלום אחר."
                        : "You haven't added any payment methods yet. Add a credit card or other payment method."}
                    </p>
                    <Button
                      className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                      onClick={handleAddPaymentMethod}
                    >
                      <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {isRTL ? "הוסף אמצעי תשלום" : "Add Payment Method"}
                    </Button>
                  </div>
                ) : (
                  // Display payment methods
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex justify-between items-center p-3 border border-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-gray-800 p-2">
                            <CreditCard className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {method.card.brand.charAt(0).toUpperCase() + method.card.brand.slice(1)} ••••{" "}
                              {method.card.last4}
                            </p>
                            <p className="text-xs text-gray-400">
                              {isRTL ? "פג תוקף" : "Expires"} {method.card.exp_month}/{method.card.exp_year}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {isRTL ? "הסר" : "Remove"}
                        </Button>
                      </div>
                    ))}
                    <Button className="w-full mt-4" variant="outline" onClick={handleAddPaymentMethod}>
                      <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      {isRTL ? "הוסף אמצעי תשלום נוסף" : "Add Another Payment Method"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Billing History Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-500/10 p-2">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-white">{isRTL ? "היסטוריית חיובים" : "Billing History"}</CardTitle>
                <CardDescription>
                  {isRTL ? "צפה בהיסטוריית החיובים והחשבוניות שלך" : "View your billing history and invoices"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {invoices.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    {isRTL ? "אין חשבוניות להצגה" : "No invoices to display"}
                  </div>
                ) : (
                  invoices.map((invoice) => {
                    const statusInfo = getStatusInfo(invoice.status)

                    return (
                      <div
                        key={invoice.id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium text-white">{invoice.number || invoice.id}</h3>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${statusInfo.color}`}>
                              {statusInfo.text}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(invoice.created)} • {formatCurrency(invoice.amount_paid)}
                          </p>
                          {invoice.description && <p className="text-xs text-gray-400 mt-1">{invoice.description}</p>}
                        </div>

                        {invoice.hosted_invoice_url && (
                          <a href={invoice.hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="self-end sm:self-auto">
                              <Download className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                              {isRTL ? "הורד חשבונית" : "View Invoice"}
                            </Button>
                          </a>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscription Plans Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-green-500/10 p-2">
              <Tag className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-white">{isRTL ? "תוכניות מנוי" : "Subscription Plans"}</CardTitle>
              <CardDescription>
                {isRTL ? "שדרג לתוכנית מנוי לחיסכון בעלויות" : "Upgrade to a subscription plan to save on costs"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Basic Plan */}
              <Card className="border-gray-700 bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{isRTL ? "בסיסי" : "Basic"}</CardTitle>
                  <CardDescription>{isRTL ? "למשתמשים מזדמנים" : "For occasional users"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">₪0</span>
                    <span className="text-gray-400 ml-1">{isRTL ? "/ חודש" : "/ month"}</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300">{isRTL ? "תשלום לפי הזמנה" : "Pay per order"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300">
                        {isRTL ? "גישה לכל סוגי הנסחים" : "Access to all extract types"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300">{isRTL ? "תמיכה בסיסית" : "Basic support"}</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    {isRTL ? "התוכנית הנוכחית" : "Current Plan"}
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="border-primary-500/50 bg-gray-800/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{isRTL ? "מקצועי" : "Pro"}</CardTitle>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary-500/20 text-primary-500">
                      {isRTL ? "פופולרי" : "Popular"}
                    </span>
                  </div>
                  <CardDescription>{isRTL ? "למשתמשים תכופים" : "For frequent users"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">₪199</span>
                    <span className="text-gray-400 ml-1">{isRTL ? "/ חודש" : "/ month"}</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300">
                        {isRTL ? "5 נסחים בחודש כלולים" : "5 extracts per month included"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300">
                        {isRTL ? "10% הנחה על נסחים נוספים" : "10% discount on additional extracts"}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300">{isRTL ? "תמיכה מועדפת" : "Priority support"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-300">{isRTL ? "גישה לארכיון הזמנות" : "Access to order archive"}</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                    {isRTL ? "שדרג עכשיו" : "Upgrade Now"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
