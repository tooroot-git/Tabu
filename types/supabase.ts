export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          block: string | null
          parcel: string | null
          subparcel: string | null
          service_type: string
          status: string
          price: number
          created_at: string
          updated_at: string | null
          document_url: string | null
          payment_method: string | null
          payment_details: Json | null
          street: string | null
          house_number: string | null
          city: string | null
          id_number: string | null
        }
        Insert: {
          id?: string
          user_id: string
          block?: string | null
          parcel?: string | null
          subparcel?: string | null
          service_type: string
          status: string
          price: number
          created_at?: string
          updated_at?: string | null
          document_url?: string | null
          payment_method?: string | null
          payment_details?: Json | null
          street?: string | null
          house_number?: string | null
          city?: string | null
          id_number?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          block?: string | null
          parcel?: string | null
          subparcel?: string | null
          service_type?: string
          status?: string
          price?: number
          created_at?: string
          updated_at?: string | null
          document_url?: string | null
          payment_method?: string | null
          payment_details?: Json | null
          street?: string | null
          house_number?: string | null
          city?: string | null
          id_number?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface Order {
  id: string
  user_id: string
  block: string
  parcel: string
  subparcel?: string
  service_type: string
  status: string
  price: number
  payment_id?: string
  document_url?: string
  email: string
  created_at: string
  updated_at?: string
}

export interface Profile {
  id: string
  user_id: string
  name?: string
  role?: string
  created_at: string
  updated_at?: string
}
