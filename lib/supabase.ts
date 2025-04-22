import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zqlramegnhtthdzeqpis.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHJhbWVnbmh0dGhkemVxcGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyODkyNjQsImV4cCI6MjA2MDg2NTI2NH0.vKM2m7toh0jQITTAZFC-iN0bbI0GbmHUq29OTdE8ulc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock functions for preview environment
export const mockSupabase = {
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          data: [],
          error: null,
        }),
        single: () => ({
          data: null,
          error: null,
        }),
      }),
    }),
    insert: () => ({
      select: () => ({
        data: [{ id: Math.random().toString(36).substring(7) }],
        error: null,
      }),
    }),
  }),
}

// Use this in preview environment
export const getSupabase = () => {
  // In production, return the real Supabase client
  // For preview, return the mock
  try {
    return supabase
  } catch (error) {
    console.warn("Using mock Supabase client for preview")
    return mockSupabase as any
  }
}
