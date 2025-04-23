"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Info } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  helperText?: string
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, label, id, required, leftIcon, rightIcon, isLoading, ...props }, ref) => {
    const [isRTL, setIsRTL] = useState(false)
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

    // Check text direction on client side only
    useEffect(() => {
      setIsRTL(document.dir === "rtl")
    }, [])

    // Determine if this is a right-to-left field that needs special handling
    const isRtlField = isRTL && (type === "email" || type === "tel" || type === "number")

    return (
      <div className="relative w-full">
        {label && (
          <label htmlFor={inputId} className={`block text-sm font-medium mb-1.5 ${error ? "text-red-500" : ""}`}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-gray-500`}>
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && (isRTL ? "pr-10" : "pl-10"),
              rightIcon && (isRTL ? "pl-10" : "pr-10"),
              error && "border-red-500 focus-visible:ring-red-500",
              isRtlField && "text-right direction-ltr",
              isLoading && "bg-gray-100",
              className,
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error || helperText ? `${inputId}-description` : undefined}
            {...props}
          />

          {rightIcon && (
            <div className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-gray-500`}>
              {rightIcon}
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div
            id={`${inputId}-description`}
            className={`mt-1.5 text-sm flex items-start ${error ? "text-red-500" : "text-gray-500"}`}
          >
            {error && <Info className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />}
            <span>{error || helperText}</span>
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
