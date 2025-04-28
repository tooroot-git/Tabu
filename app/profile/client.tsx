"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/context/language-context"

export default function ProfileClient() {
  const { user, isLoading } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState("")
  const { isRTL } = useLanguage()
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (user) {
      setEmail(user.email || "")
      setName(user.user_metadata?.full_name || "")
    }
  }, [user])

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsUpdating(true)
    setMessage("")

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name },
      })

      if (error) throw error

      setMessage(isRTL ? "הפרופיל עודכן בהצלחה" : "Profile updated successfully")
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setMessage(error.message || (isRTL ? "אירעה שגיאה בעדכון הפרופיל" : "Error updating profile"))
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>{isRTL ? "אנא התחבר כדי לצפות בפרופיל שלך" : "Please log in to view your profile"}</p>
      </div>
    )
  }

  return (
    <form onSubmit={updateProfile} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">{isRTL ? "אימייל" : "Email"}</Label>
        <Input id="email" type="email" value={email} disabled />
        <p className="text-sm text-gray-500">
          {isRTL ? "לא ניתן לשנות את כתובת האימייל" : "Email address cannot be changed"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">{isRTL ? "שם מלא" : "Full Name"}</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isRTL ? "הזן את שמך המלא" : "Enter your full name"}
        />
      </div>

      {message && (
        <div
          className={`p-3 rounded-md ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message}
        </div>
      )}

      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? (isRTL ? "מעדכן..." : "Updating...") : isRTL ? "עדכן פרופיל" : "Update Profile"}
      </Button>
    </form>
  )
}
