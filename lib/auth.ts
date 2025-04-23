import { getSession, withPageAuthRequired as withPageAuthRequiredOriginal } from "@auth0/nextjs-auth0"
import type { NextApiRequest, NextApiResponse } from "next"

// Helper to get session in API routes
export async function getSessionFromRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req, res)
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

// Re-export withPageAuthRequired for convenience
export const withPageAuthRequired = withPageAuthRequiredOriginal

export async function getAuthSession() {
  const session = await getSession()
  return session
}
