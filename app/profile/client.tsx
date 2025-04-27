"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface UserProfile {
  id: string
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  created_at?: string
}

export default function ProfileClient() {
  const { isRTL } = useLanguage()
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      const supabase = createClientComponentClient()

      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (error) throw error

        if (data) {
          setProfile(data)
          setFirstName(data.first_name || "")
          setLastName(data.last_name || "")
          setPhone(data.phone || "")
          setAddress(data.address || "")
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    const supabase = createClientComponentClient()

    try {
      const updates = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("profiles").upsert(updates).eq("id", user.id)

      if (error) throw error

      setSuccessMessage(isRTL ? "הפרופיל עודכן בהצלחה" : "Profile updated successfully")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>{isRTL ? "אנא התחבר כדי לצפות בפרופיל שלך" : "Please log in to view your profile"}</p>
        <Button className="mt-4" onClick={() => (window.location.href = "/login")}>
          {isRTL ? "התחברות" : "Log In"}
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">{isRTL ? "שם פרטי" : "First Name"}</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={isRTL ? "הזן שם פרטי" : "Enter first name"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{isRTL ? "שם משפחה" : "Last Name"}</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={isRTL ? "הזן שם משפחה" : "Enter last name"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{isRTL ? "אימייל" : "Email"}</Label>
          <Input id="email" value={user?.email || ""} disabled dir="ltr" />
          <p className="text-sm text-gray-500">
            {isRTL ? "לא ניתן לשנות את כתובת האימייל" : "Email address cannot be changed"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{isRTL ? "טלפון" : "Phone"}</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={isRTL ? "הזן מספר טלפון" : "Enter phone number"}
            dir="ltr"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">{isRTL ? "כתובת" : "Address"}</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={isRTL ? "הזן כתובת" : "Enter address"}
          />
        </div>
      </div>

      <Button type="submit" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white" disabled={isSaving}>
        {isSaving ? (
          <span className="flex items-center">
            <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
            {isRTL ? "שומר..." : "Saving..."}
          </span>
        ) : isRTL ? (
          "שמור שינויים"
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  )
}
