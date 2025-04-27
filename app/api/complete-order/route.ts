import { NextResponse } from "next/server"
import { runOrderAutomation } from "@/lib/playwright-automation"
import { createClient } from "@supabase/supabase-js"
import { sendConfirmationEmail } from "@/lib/send-email"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  try {
    const { payment_id } = await req.json()

    if (!payment_id) {
      return NextResponse.json({ error: "Missing payment_id" }, { status: 400 })
    }

    // חיפוש ההזמנה לפי מזהה תשלום
    const { data: order, error } = await supabase.from("orders").select("*").eq("payment_id", payment_id).single()

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // הרצת סקריפט Playwright
    const documentBuffer = await runOrderAutomation(order)

    // שמירת הקובץ ב-Supabase Storage
    const { data: uploadedFile, error: uploadError } = await supabase.storage
      .from("fulfilled-orders")
      .upload(`orders/${order.id}.pdf`, documentBuffer, { contentType: "application/pdf", upsert: true })

    if (uploadError) {
      throw new Error("Failed to upload document")
    }

    const document_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/fulfilled-orders/orders/${order.id}.pdf`

    // עדכון ההזמנה ב-DB
    await supabase
      .from("orders")
      .update({
        status: "completed",
        document_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id)

    // שליחת מייל ללקוח
    await sendConfirmationEmail(order.email, document_url)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
