export type Order = {
  id: string
  block: string
  parcel: string
  subparcel?: string
  service_type: string
  status: string
  created_at: string
  price: number
  user_id: string
  payment_intent_id?: string
  email?: string
  document_url?: string
}

export type User = {
  name?: string
  email?: string
  sub?: string
  picture?: string
}
