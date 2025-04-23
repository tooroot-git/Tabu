import { createClient } from "@/utils/supabase/client"
import { v4 as uuidv4 } from "uuid"

export type OrderDetails = {
  block?: string
  parcel?: string
  subparcel?: string
  street?: string
  houseNumber?: string
  city?: string
  service: string
  inputType: string
  price: number
  email?: string
  userId?: string
}

export async function createOrder(orderDetails: OrderDetails) {
  const supabase = createClient()
  const orderId = uuidv4()

  const { data, error } = await supabase
    .from("orders")
    .insert({
      id: orderId,
      user_id: orderDetails.userId,
      block: orderDetails.block || "",
      parcel: orderDetails.parcel || "",
      subparcel: orderDetails.subparcel || "",
      street: orderDetails.street || "",
      house_number: orderDetails.houseNumber || "",
      city: orderDetails.city || "",
      service_type: orderDetails.service,
      input_type: orderDetails.inputType,
      price: orderDetails.price,
      status: "pending",
      email: orderDetails.email,
    })
    .select()

  if (error) {
    console.error("Error creating order:", error)
    throw error
  }

  return data[0]
}

export async function getOrderById(orderId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("orders").select("*").eq("id", orderId).single()

  if (error) {
    console.error("Error fetching order:", error)
    throw error
  }

  return data
}

export async function updateOrderStatus(orderId: string, status: string, paymentId?: string) {
  const supabase = createClient()

  const updates: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (paymentId) {
    updates.payment_id = paymentId
  }

  const { error } = await supabase.from("orders").update(updates).eq("id", orderId)

  if (error) {
    console.error("Error updating order:", error)
    throw error
  }

  return true
}

export function getServicePrice(type: string): number {
  switch (type) {
    case "regular":
      return 39
    case "historical":
      return 69
    case "concentrated":
      return 59
    case "by-address":
      return 79
    case "property-report":
      return 99
    default:
      return 39
  }
}

export function getServiceName(type: string, isRTL: boolean): string {
  if (isRTL) {
    switch (type) {
      case "regular":
        return "נסח רגיל"
      case "historical":
        return "נסח היסטורי"
      case "concentrated":
        return "נסח מרוכז"
      case "by-address":
        return "נסח לפי כתובת"
      case "property-report":
        return "דו״ח נכסים על פי ת.ז"
      default:
        return "נסח רגיל"
    }
  } else {
    switch (type) {
      case "regular":
        return "Regular Extract"
      case "historical":
        return "Historical Extract"
      case "concentrated":
        return "Concentrated Extract"
      case "by-address":
        return "Extract by Address"
      case "property-report":
        return "Property Report by ID"
      default:
        return "Regular Extract"
    }
  }
}
