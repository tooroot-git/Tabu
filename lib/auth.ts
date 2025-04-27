import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function getServerSession() {
  const supabase = createServerComponentClient({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function getUser() {
  try {
    const session = await getServerSession()
    return session?.user || null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}
