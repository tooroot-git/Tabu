import { useUser as useAuth0User } from "@auth0/nextjs-auth0/client"

// This is a mock implementation for the preview environment
export function useMockUser() {
  // Check if we're in the browser and if the auth cookie exists
  const hasAuthCookie = typeof window !== "undefined" && document.cookie.includes("auth0_user=true")

  return {
    user: hasAuthCookie
      ? {
          name: "Preview User",
          email: "preview@tabuisrael.co.il",
          picture: "/vibrant-street-market.png",
          sub: "preview-user-id",
        }
      : null,
    error: null,
    isLoading: false,
  }
}

// Use the real Auth0 hook in production, or the mock in preview
export const useUser = process.env.NODE_ENV === "production" ? useAuth0User : useMockUser
