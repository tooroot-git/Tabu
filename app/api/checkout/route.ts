import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { createCheckoutSession } from "@/lib/stripe"
import { getServiceName, getServicePrice } from "@/lib/orders"
import { createOrder } from "@/lib/orders"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { block, parcel, subparcel, service, email } = body

    if (!block || !parcel || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get the price for the service
    const price = getServicePrice(service)
    const serviceName = getServiceName(service, false) // English name for Stripe

    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies })

    // Get the current user session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const userId = session?.user?.id

    // Create the order in the database
    const order = await createOrder({
      block,
      parcel,
      subparcel,
      service,
      inputType: "block_parcel",
      price,
      email: email || session?.user?.email,
      userId: userId,
    })

    if (!order || !order.id) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Create a Stripe checkout session
    const { sessionId, url } = await createCheckoutSession({
      orderId: order.id,
      userId: userId,
      email: email || session?.user?.email || "",
      amount: price,
      description: `${serviceName} - Block: ${block}, Parcel: ${parcel}${subparcel ? `, Subparcel: ${subparcel}` : ""}`,
      metadata: {
        block,
        parcel,
        subparcel: subparcel || "",
        service_type: service,
      },
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      checkoutUrl: url,
      sessionId,
    })
  } catch (error: any) {
    console.error("Checkout API error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
