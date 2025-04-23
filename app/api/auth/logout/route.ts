import { mockLogout } from "@/lib/auth-mock"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const returnTo = url.searchParams.get("returnTo") || "/"

  await mockLogout()

  return NextResponse.redirect(new URL(returnTo, request.url))
}
