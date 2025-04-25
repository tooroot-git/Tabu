"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, CreditCard, Download, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function BillingSettings() {
  const { isRTL } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setLoading(true)
        setError("")

        // Check if user is authenticated
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (!session) {
          router.push("/login")
          return
        }

        // Fetch payment methods
        const paymentMethodsResponse = await fetch("/api/billing/payment-methods")
        if (!paymentMethodsResponse.ok) {
          throw new Error("Failed to fetch payment methods")
        }
        const paymentMethodsData = await paymentMethodsResponse.json()
        setPaymentMethods(paymentMethodsData.paymentMethods || [])

        // Fetch invoices
        const invoicesResponse = await fetch("/api/billing/invoices")
        if (!invoicesResponse.ok) {
          throw new Error("Failed to fetch invoices")
        }
        const invoicesData = await invoicesResponse.json()
        setInvoices(invoicesData.invoices || [])
      } catch (err) {
        console.error("Error fetching billing data:", err)
        setError(err.message || "An error occurred while fetching billing data")
      } finally {
        setLoading(false)
      }
    }

    fetchBillingData()
  }, [router, supabase])

  const handleAddPaymentMethod = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/billing/create-setup-intent")
      if (!response.ok) {
        throw new Error("Failed to create setup intent")
      }
      const { clientSecret } = await response.json()
      router.push(`/payment-setup?setup_intent=${clientSecret}`)
    } catch (err) {
      console.error("Error creating setup intent:", err)
      setError(err.message || "An error occurred while setting up payment method")
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return new Intl.DateTimeFormat(isRTL ? "he-IL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat(isRTL ? "he-IL" : "en-US", {
      style: "currency",
      currency: currency || "ILS",
    }).format(amount / 100)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">{isRTL ? "הגדרות חיוב ותשלום" : "Billing & Payments"}</h1>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 flex items-start mb-6">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 rtl:ml-2 rtl:mr-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-500">{isRTL ? "שגיאה" : "Error"}</h3>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? "אמצעי תשלום" : "Payment Methods"}</CardTitle>
          <CardDescription>
            {isRTL ? "נהל את אמצעי התשלום שלך לחיובים עתידיים" : "Manage your payment methods for future charges"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : (
            <div className="space-y-4">
              {paymentMethods.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  {isRTL ? "לא נמצאו אמצעי תשלום" : "No payment methods found"}
                </div>
              ) : (
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-3 border border-gray-700 rounded-md bg-gray-800/50"
                    >
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0 text-gray-400" />
                        <div>
                          <p className="font-medium">
                            {method.card.brand.charAt(0).toUpperCase() + method.card.brand.slice(1)} ••••{" "}
                            {method.card.last4}
                          </p>
                          <p className="text-sm text-gray-400">
                            {isRTL ? "פג תוקף" : "Expires"} {method.card.exp_month}/{method.card.exp_year}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full">
                          {isRTL ? "ברירת מחדל" : "Default"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <Button onClick={handleAddPaymentMethod} className="mt-4 w-full sm:w-auto" disabled={loading}>
                <Plus className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isRTL ? "הוסף אמצעי תשלום" : "Add Payment Method"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? "היסטוריית חיובים" : "Billing History"}</CardTitle>
          <CardDescription>{isRTL ? "צפה והורד את החשבוניות שלך" : "View and download your invoices"}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : (
            <div>
              {invoices.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  {isRTL ? "לא נמצאו חשבוניות" : "No invoices found"}
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border border-gray-700 rounded-md bg-gray-800/50"
                    >
                      <div>
                        <p className="font-medium">{formatDate(invoice.created)}</p>
                        <p className="text-sm text-gray-400">{invoice.number || `Invoice #${invoice.id.slice(-8)}`}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-4 rtl:ml-4 rtl:mr-0 font-medium">
                          {formatCurrency(invoice.amount_paid, invoice.currency)}
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                            {isRTL ? "הורד" : "Download"}
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
