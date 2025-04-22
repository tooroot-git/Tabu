import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// In production, you would use the real Auth0 middleware:
// import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge"
// export default withMiddlewareAuthRequired()

export default function middleware(request: NextRequest) {
  // For preview, we'll just pass through all requests
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-orders/:path*"],
}
