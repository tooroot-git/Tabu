"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface RetryBotButtonProps {
  orderId: string
  onSuccess?: () => void
  className?: string
}

export function RetryBotButton({ orderId, onSuccess, className = "" }: RetryBotButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleRetry = async () => {
    setIsLoading(true)
    setStatus("idle")
    setMessage("")

    try {
      const response = await fetch("/api/orders/trigger-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to trigger bot")
      }

      setStatus("success")
      setMessage("Bot triggered successfully")

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error("Error triggering bot:", error)
      setStatus("error")
      setMessage(error.message || "Failed to trigger bot")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={className}>
      <Button onClick={handleRetry} disabled={isLoading} variant="outline" size="sm" className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Retry Bot Processing"
        )}
      </Button>

      {status === "success" && (
        <div className="mt-2 flex items-center text-sm text-green-600">
          <CheckCircle className="mr-1 h-4 w-4" />
          {message}
        </div>
      )}

      {status === "error" && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <AlertCircle className="mr-1 h-4 w-4" />
          {message}
        </div>
      )}
    </div>
  )
}
