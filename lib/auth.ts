import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@/utils/supabase/server"

// Helper to get session in API routes
export async function getSessionFromRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Use Supabase for authentication
    const supabase = createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

// Helper for server components to get the current user
export async function getCurrentUser(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSessionFromRequest(req, res)
  return session?.user || null
}

export async function getAuthSession() {
  try {
    const supabase = createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting auth session:", error)
    return null
  }
}
