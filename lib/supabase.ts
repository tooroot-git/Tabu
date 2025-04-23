import { createClient } from "@supabase/supabase-js"

// Types for our database
export type Order = {
  id?: string
  user_id: string
  block: string
  parcel: string
  subparcel?: string
  service_type: string
  price: number
  status: "pending" | "paid" | "completed" | "cancelled"
  email: string
  created_at?: string
}

// Initialize the Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

// Helper function to get orders for a user
export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error)
    throw error
  }

  return data || []
}

// Helper function to create a new order
export async function createOrder(order: Order) {
  const { data, error } = await supabase.from("orders").insert(order).select()

  if (error) {
    console.error("Error creating order:", error)
    throw error
  }

  return data?.[0]
}

// Helper function to update an order
export async function updateOrder(id: string, updates: Partial<Order>) {
  const { data, error } = await supabase.from("orders").update(updates).eq("id", id).select()

  if (error) {
    console.error("Error updating order:", error)
    throw error
  }

  return data?.[0]
}
