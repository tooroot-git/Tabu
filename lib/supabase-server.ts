import { createClient } from "@supabase/supabase-js"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Database } from "@/types/supabase"

// Create a single supabase client for interacting with your database
export function createServerSupabaseClient(context: { req: NextApiRequest; res: NextApiResponse }) {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}
