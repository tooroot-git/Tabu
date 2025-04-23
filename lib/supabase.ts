import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// יצירת לקוח Supabase לשימוש בצד הלקוח
export const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export type Order = {
  id: string
  block: string
  parcel: string
  subparcel?: string
  service_type: string
  status: string
  created_at: string
  price: number
  user_id: string
  document_url?: string
}

// יצירת לקוח Supabase לשימוש בקומפוננטות שרת
export const createClient = () => {
  return createServerComponentClient({ cookies })
}

export async function getCurrentUser() {
  const supabase = createClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return session?.user || null
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}
