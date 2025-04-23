// This file is for production use with Auth0
import { useUser as useAuth0User } from "@auth0/nextjs-auth0/client"

// Re-export useUser from Auth0
export const useUser = useAuth0User

// Export useAuth for compatibility
export const useAuth = useAuth0User

// Helper function to get the API URL
export const getApiUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL || ""}${path}`
}

// Helper function to handle API errors
export const handleApiError = (error: any) => {
  console.error("API Error:", error)
  return {
    error: error.message || "An unknown error occurred",
  }
}
