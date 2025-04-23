"use client"

import { getLoginUrl, getLogoutUrl } from "@/lib/auth0"

// טיפוס למשתמש
export type User = {
  name?: string
  email?: string
  sub?: string
  picture?: string
}

// טיפוס לתוצאת useUser
export type UseUserResult = {
  user?: User | null
  error?: Error
  isLoading: boolean
  loginWithRedirect: () => void
  logout: () => void
}

// פונקציית useUser פשוטה שתעבוד בסביבת הייצור
export function useUser(): UseUserResult {
  // בסביבת ייצור, זה יוחלף ב-useUser האמיתי של Auth0
  return {
    user: null,
    isLoading: false,
    loginWithRedirect: () => {
      window.location.href = getLoginUrl()
    },
    logout: () => {
      window.location.href = getLogoutUrl()
    },
  }
}
