"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Upload, Check, FileText } from "lucide-react"
import type { Order } from "@/lib/supabase"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [uploadingOrderId, setUploadingOrderId] = useState<string | null>(null)
  const { isRTL } = useLanguage()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function checkAdminAndFetchOrders() {
      setIsLoading(true)
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session?.user) {
          window.location.href = "/login"
          return
        }

        // Check if user is admin (you'll need to implement this check)
        const { data: user } = await supabase.from("users").select("role").eq("id", session.user.id).single()

        if (user?.role !== "admin") {
          setIsAdmin(false)
          window.location.href = "/dashboard"
          return
        }

        setIsAdmin(true)

        // Fetch all orders for admin
        const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching orders:", error)
        } else {
          setOrders(data || [])
          setFilteredOrders(data || [])
        }
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAndFetchOrders()
  }, [supabase])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOrders(orders)
    } else {
      const filtered = orders.filter(
        (order) =>
          order.block.includes(searchTerm) ||
          order.parcel.includes(searchTerm) ||
          (order.subparcel && order.subparcel.includes(searchTerm)) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.order_type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredOrders(filtered)
    }
  }, [searchTerm, orders])

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Function to handle file upload
  const handleFileUpload = async (orderId: string, file: File) => {
    try {
      setUploadingOrderId(orderId)

      // Upload file to Supabase Storage
      const fileName = `${orderId}_${file.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("order_documents")
        .upload(`${orderId}/${fileName}`, file)

      if (uploadError) {
        console.error("Error uploading file:", uploadError)
        alert("Error uploading file. Please try again.")
        return
      }

      // Get public URL for the uploaded file
      const { data: urlData } = await supabase.storage.from("order_documents").getPublicUrl(`${orderId}/${fileName}`)

      const fileUrl = urlData.publicUrl

      // Call the fulfill API to update order and send email
      const response = await fetch("/api/orders/fulfill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          fileUrl,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Update the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.id === orderId ? { ...order, status: "sent", file_url: fileUrl } : order)),
        )
        alert("Order fulfilled successfully!")
      } else {
        alert("Error fulfilling order: " + (result.error || "Unknown error"))
      }
    } catch (error) {
      console.error("Error in file upload process:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setUploadingOrderId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Redirect handled in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Order Management</h1>
        <p className="mt-2 text-gray-400">Manage customer orders and upload documents</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search by block, parcel, email or status..."
            className="pl-10 bg-gray-900/80 border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400">
              {searchTerm ? "No orders found matching your search" : "No orders in the system yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="border-gray-800 bg-gray-900/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-white">Order #{order.id.substring(0, 8)}</CardTitle>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      order.status === "pending"
                        ? "text-yellow-500 bg-yellow-100/10"
                        : order.status === "paid"
                          ? "text-blue-500 bg-blue-100/10"
                          : order.status === "sent"
                            ? "text-green-500 bg-green-100/10"
                            : "text-gray-500 bg-gray-100/10"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Customer</p>
                    <p className="text-white">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Property Details</p>
                    <p className="text-white">
                      Block: {order.block}, Parcel: {order.parcel}
                      {order.subparcel && `, Subparcel: ${order.subparcel}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Order Info</p>
                    <p className="text-white">
                      {order.order_type} | ₪{order.price} | {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  {order.file_url ? (
                    <>
                      <Button variant="outline" asChild>
                        <a href={order.file_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 mr-2" />
                          View Document
                        </a>
                      </Button>
                      <Button variant="outline" className="text-green-500 border-green-500">
                        <Check className="h-4 w-4 mr-2" />
                        Fulfilled
                      </Button>
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        id={`file-upload-${order.id}`}
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(order.id, file)
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        disabled={uploadingOrderId === order.id}
                        onClick={() => document.getElementById(`file-upload-${order.id}`)?.click()}
                      >
                        {uploadingOrderId === order.id ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
