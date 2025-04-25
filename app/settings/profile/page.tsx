"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Upload, Check, AlertCircle } from "lucide-react"

interface Profile {
  id: string
  first_name?: string
  last_name?: string
  phone?: string
  address?: string
  company?: string
  bio?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export default function ProfileSettings() {
  const { isRTL } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [company, setCompany] = useState("")
  const [bio, setBio] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          return
        }

        setUser(session.user)

        // Check if profiles table exists, if not, we'll just use user data
        const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile:", error)
        }

        if (data) {
          setProfile(data)
          setFirstName(data.first_name || "")
          setLastName(data.last_name || "")
          setPhone(data.phone || "")
          setAddress(data.address || "")
          setCompany(data.company || "")
          setBio(data.bio || "")
        } else {
          // Use user metadata if available
          const metadata = session.user.user_metadata || {}
          setFirstName(metadata.first_name || "")
          setLastName(metadata.last_name || "")
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      })

      if (metadataError) throw metadataError

      // Try to update or insert profile
      const profileData = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        company,
        bio,
        updated_at: new Date().toISOString(),
      }

      const { error: profileError } = await supabase.from("profiles").upsert(profileData)

      if (profileError) throw profileError

      setSuccessMessage(isRTL ? "הפרופיל עודכן בהצלחה" : "Profile updated successfully")
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setErrorMessage(
        error.message || (isRTL ? "אירעה שגיאה בעדכון הפרופיל" : "An error occurred while updating profile"),
      )
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{isRTL ? "פרופיל" : "Profile"}</h1>
        <p className="text-gray-400 mt-1">{isRTL ? "עדכן את פרטי הפרופיל שלך" : "Update your profile information"}</p>
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
        {/* Avatar Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{isRTL ? "תמונת פרופיל" : "Profile Picture"}</CardTitle>
            <CardDescription>
              {isRTL ? "העלה תמונת פרופיל שתוצג בחשבון שלך" : "Upload a profile picture to display on your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                {profile?.avatar_url ? (
                  <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-primary-500/20 text-primary-500">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-sm font-medium text-white">{isRTL ? "העלה תמונה" : "Upload Image"}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL ? "PNG, JPG או GIF עד 2MB" : "PNG, JPG or GIF up to 2MB"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="relative">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    <Upload className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {isRTL ? "בחר קובץ" : "Choose File"}
                  </Button>

                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                    {isRTL ? "הסר" : "Remove"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Card */}
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{isRTL ? "פרטים אישיים" : "Personal Information"}</CardTitle>
            <CardDescription>{isRTL ? "עדכן את הפרטים האישיים שלך" : "Update your personal details"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
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
                <Input id="email" type="email" value={user?.email || ""} disabled dir="ltr" />
                <p className="text-xs text-gray-500">
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
                <Label htmlFor="company">{isRTL ? "חברה" : "Company"}</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={isRTL ? "הזן שם חברה" : "Enter company name"}
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

              <div className="space-y-2">
                <Label htmlFor="bio">{isRTL ? "אודות" : "Bio"}</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={isRTL ? "ספר לנו קצת על עצמך" : "Tell us a bit about yourself"}
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      {isRTL ? "שומר..." : "Saving..."}
                    </>
                  ) : isRTL ? (
                    "שמור שינויים"
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
