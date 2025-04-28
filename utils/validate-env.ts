/**
 * Validates that required environment variables are present
 * @returns Object with validation results
 */
export function validateEnvironmentVariables() {
  const missingVars = []

  // Supabase variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missingVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  // Stripe variables (if used)
  if (!process.env.STRIPE_SECRET_KEY) {
    missingVars.push("STRIPE_SECRET_KEY")
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    missingVars.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY")
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    hasSupabase: process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasStripe: process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  }
}

/**
 * Logs missing environment variables to the console
 */
export function logEnvWarnings() {
  const { isValid, missingVars } = validateEnvironmentVariables()

  if (!isValid) {
    console.warn("⚠️ Missing environment variables:", missingVars.join(", "))
    console.warn("Some functionality may be limited.")
  }
}
