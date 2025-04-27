import { getSession as getAuth0Session } from "@auth0/nextjs-auth0"
import type { NextRequest, NextResponse } from "next/server"

export async function getSession(req: NextRequest, res: NextResponse) {
  try {
    return await getAuth0Session(req, res)
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function getUserFromSession(req: NextRequest, res: NextResponse) {
  const session = await getSession(req, res)
  return session?.user || null
}
