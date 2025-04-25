"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Check, Bell, Mail, MessageSquare } from "lucide-react"

export default function NotificationSettings() {
  const { isRTL } = useLanguage()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Email notification states
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [orderComplete, setOrderComplete] = useState(true)
  const [promotions, setPromotions] = useState(false)
  const [newsletter, setNewsletter] = useState(false)

  // Push notification states
  const [pushOrderUpdates, setPushOrderUpdates] = useState(true)
  const [pushOrderComplete, setPushOrderComplete] = useState(true)

  const handleSaveNotifications = () => {
    // Here you would typically save these preferences to your database
    setSuccessMessage(isRTL ? "העדפות ההתראות נשמרו בהצלחה" : "Notification preferences saved successfully")

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{isRTL ? "התראות" : "Notifications"}</h1>
        <p className="text-gray-400 mt-1">
          {isRTL ? "נהל את העדפות ההתראות שלך" : "Manage your notification preferences"}
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-500/10 p-4 text-green-500">
          <Check className="h-5 w-5" />
          <p>{successMessage}</p>
        </div>
      )}

      <div className="grid gap-6">
        {/* Email Notifications Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-blue-500/10 p-2">
              <Mail className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-white">{isRTL ? "התראות אימייל" : "Email Notifications"}</CardTitle>
              <CardDescription>
                {isRTL ? "נהל את התראות האימייל שאתה מקבל" : "Manage the email notifications you receive"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "עדכוני הזמנות" : "Order Updates"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל עדכונים על שינויים בסטטוס ההזמנות שלך"
                      : "Receive updates about changes to your order status"}
                  </p>
                </div>
                <Switch checked={orderUpdates} onCheckedChange={setOrderUpdates} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "הזמנה הושלמה" : "Order Complete"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל התראה כאשר ההזמנה שלך מוכנה להורדה"
                      : "Receive a notification when your order is ready for download"}
                  </p>
                </div>
                <Switch checked={orderComplete} onCheckedChange={setOrderComplete} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {isRTL ? "מבצעים והנחות" : "Promotions & Discounts"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל מידע על מבצעים והנחות מיוחדות"
                      : "Receive information about special promotions and discounts"}
                  </p>
                </div>
                <Switch checked={promotions} onCheckedChange={setPromotions} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "עדכונים ומידע" : "Newsletter & Updates"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל עדכונים על שירותים חדשים ומידע שימושי"
                      : "Receive updates about new services and useful information"}
                  </p>
                </div>
                <Switch checked={newsletter} onCheckedChange={setNewsletter} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-purple-500/10 p-2">
              <Bell className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-white">{isRTL ? "התראות דחיפה" : "Push Notifications"}</CardTitle>
              <CardDescription>
                {isRTL
                  ? "נהל את התראות הדחיפה שאתה מקבל בדפדפן"
                  : "Manage the push notifications you receive in your browser"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "עדכוני הזמנות" : "Order Updates"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל התראות דחיפה על שינויים בסטטוס ההזמנות שלך"
                      : "Receive push notifications about changes to your order status"}
                  </p>
                </div>
                <Switch checked={pushOrderUpdates} onCheckedChange={setPushOrderUpdates} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "הזמנה הושלמה" : "Order Complete"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל התראת דחיפה כאשר ההזמנה שלך מוכנה להורדה"
                      : "Receive a push notification when your order is ready for download"}
                  </p>
                </div>
                <Switch checked={pushOrderComplete} onCheckedChange={setPushOrderComplete} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Communication Preferences Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-green-500/10 p-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-white">{isRTL ? "העדפות תקשורת" : "Communication Preferences"}</CardTitle>
              <CardDescription>
                {isRTL ? "נהל את אופן התקשורת שלנו איתך" : "Manage how we communicate with you"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "תזכורות SMS" : "SMS Reminders"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל תזכורות SMS על הזמנות ועדכונים חשובים"
                      : "Receive SMS reminders about orders and important updates"}
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "סקרי משוב" : "Feedback Surveys"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL ? "קבל סקרי משוב כדי לעזור לנו להשתפר" : "Receive feedback surveys to help us improve"}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={handleSaveNotifications}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
          >
            {isRTL ? "שמור העדפות" : "Save Preferences"}
          </Button>
        </div>
      </div>
    </div>
  )
}
