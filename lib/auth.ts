import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function getServerSession() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const session = await getServerSession()
  return session?.user || null
}
