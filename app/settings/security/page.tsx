"use client"

import type React from "react"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Check, AlertCircle, Key, Shield, Lock } from "lucide-react"

export default function SecuritySettings() {
  const { isRTL } = useLanguage()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset messages
    setSuccessMessage(null)
    setErrorMessage(null)

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setErrorMessage(isRTL ? "הסיסמאות אינן תואמות" : "Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setErrorMessage(isRTL ? "הסיסמה חייבת להכיל לפחות 8 תווים" : "Password must be at least 8 characters")
      return
    }

    setIsChangingPassword(true)

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) throw error

      setSuccessMessage(isRTL ? "הסיסמה עודכנה בהצלחה" : "Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      console.error("Error updating password:", error)
      setErrorMessage(
        error.message || (isRTL ? "אירעה שגיאה בעדכון הסיסמה" : "An error occurred while updating password"),
      )
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleTwoFactorToggle = () => {
    // This would typically integrate with your auth provider's 2FA setup
    setTwoFactorEnabled(!twoFactorEnabled)

    if (!twoFactorEnabled) {
      // Show setup instructions or redirect to setup page
      setSuccessMessage(isRTL ? "אימות דו-שלבי הופעל" : "Two-factor authentication enabled")
    } else {
      setSuccessMessage(isRTL ? "אימות דו-שלבי הושבת" : "Two-factor authentication disabled")
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{isRTL ? "אבטחה" : "Security"}</h1>
        <p className="text-gray-400 mt-1">
          {isRTL ? "נהל את הגדרות האבטחה והפרטיות שלך" : "Manage your security and privacy settings"}
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

      <div className="grid gap-6">
        {/* Password Change Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-primary-500/10 p-2">
              <Key className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <CardTitle className="text-white">{isRTL ? "שינוי סיסמה" : "Change Password"}</CardTitle>
              <CardDescription>
                {isRTL
                  ? "עדכן את הסיסמה שלך לשמירה על אבטחת החשבון"
                  : "Update your password to keep your account secure"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{isRTL ? "סיסמה נוכחית" : "Current Password"}</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={isRTL ? "הזן את הסיסמה הנוכחית" : "Enter your current password"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">{isRTL ? "סיסמה חדשה" : "New Password"}</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={isRTL ? "הזן סיסמה חדשה" : "Enter new password"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{isRTL ? "אימות סיסמה" : "Confirm Password"}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={isRTL ? "הזן שוב את הסיסמה החדשה" : "Confirm new password"}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      {isRTL ? "מעדכן..." : "Updating..."}
                    </>
                  ) : isRTL ? (
                    "עדכן סיסמה"
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-blue-500/10 p-2">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-white">{isRTL ? "אימות דו-שלבי" : "Two-Factor Authentication"}</CardTitle>
              <CardDescription>
                {isRTL ? "הוסף שכבת אבטחה נוספת לחשבון שלך" : "Add an extra layer of security to your account"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">
                  {isRTL ? "אימות דו-שלבי" : "Two-Factor Authentication"}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {isRTL
                    ? "הפעל אימות דו-שלבי כדי להגביר את אבטחת החשבון שלך"
                    : "Enable two-factor authentication to enhance your account security"}
                </p>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
            </div>
          </CardContent>
        </Card>

        {/* Security Notifications Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="rounded-full bg-purple-500/10 p-2">
              <Lock className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-white">{isRTL ? "התראות אבטחה" : "Security Notifications"}</CardTitle>
              <CardDescription>
                {isRTL ? "נהל את התראות האבטחה שלך" : "Manage your security notifications"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "התראות אימייל" : "Email Notifications"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל התראות אימייל על פעילות חשודה"
                      : "Receive email notifications about suspicious activity"}
                  </p>
                </div>
                <Switch checked={emailNotificationsEnabled} onCheckedChange={setEmailNotificationsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "התראות כניסה" : "Login Alerts"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL
                      ? "קבל התראות על כניסות חדשות לחשבון שלך"
                      : "Receive alerts about new logins to your account"}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
