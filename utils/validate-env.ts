/**
 * Utility to validate Supabase environment variables
 * This helps identify missing or invalid environment variables early
 */

export function validateSupabaseEnv(): { valid: boolean; missing: string[] } {
  const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]

  const missing = requiredVars.filter((varName) => {
    const value = process.env[varName]
    return !value || value.trim() === ""
  })

  return {
    valid: missing.length === 0,
    missing,
  }
}

// This function can be called during initialization to log warnings
export function logEnvWarnings() {
  if (process.env.NODE_ENV === "development") {
    const { valid, missing } = validateSupabaseEnv()

    if (!valid) {
      console.warn(
        `⚠️ Missing Supabase environment variables: ${missing.join(", ")}. ` +
          `This may cause the "Add Supabase integration" message to appear.`,
      )
    }
  }
}
