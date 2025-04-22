import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function middleware(request: NextRequest) {
  // For preview, we'll just pass through all requests
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*"],
}
