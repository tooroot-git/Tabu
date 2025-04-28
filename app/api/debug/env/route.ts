import { NextResponse } from "next/server"
import { validateEnvironmentVariables } from "@/utils/validate-env"

export async function GET() {
  // Only enable in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  const envStatus = validateEnvironmentVariables()

  // Don't return actual values, just status
  return NextResponse.json({
    status: envStatus.isValid ? "ok" : "missing_variables",
    missingVars: envStatus.missingVars,
    hasSupabase: envStatus.hasSupabase,
    hasStripe: envStatus.hasStripe,
    nodeEnv: process.env.NODE_ENV,
  })
}
