"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"
import { useState, useEffect } from "react"
import { AlertCircle, Check } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  dir?: "ltr" | "rtl"
  required?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  isValid?: boolean
  showSuccessIndicator?: boolean
}

export function Input({
  className,
  type,
  label,
  error,
  helperText,
  dir,
  required,
  leftIcon,
  rightIcon,
  isLoading,
  isValid,
  showSuccessIndicator = false,
  ...props
}: InputProps) {
  const { isRTL } = useLanguage()
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Check if input has value
  useEffect(() => {
    setHasValue(!!props.value)
  }, [props.value])

  // Determine if this is a right-to-left field that needs special handling
  const isRtlField = isRTL && (type === "email" || type === "tel" || type === "number")

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  const inputId = props.id || `input-${Math.random().toString(36).substring(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={`mb-1.5 block text-sm font-medium transition-colors duration-200 ${
            isFocused ? "text-primary-400" : error ? "text-red-500" : "text-gray-300"
          } ${isRTL ? "text-right" : "text-left"}`}
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
          {helperText && <span className="ml-1 text-xs text-gray-500">{helperText}</span>}
        </label>
      )}

      <div
        className={`relative transition-all duration-200 ${isFocused ? "scale-[1.01]" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {leftIcon && (
          <div
            className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-200 ${
              isFocused ? "text-primary-400" : ""
            }`}
          >
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type || "text"}
          className={cn(
            "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            leftIcon && (isRTL ? "pr-10" : "pl-10"),
            rightIcon && (isRTL ? "pl-10" : "pr-10"),
            error && "border-red-500 focus-visible:ring-red-500",
            isValid && !error && "border-green-500 focus-visible:ring-green-500",
            isRtlField && "text-right direction-ltr",
            isLoading && "bg-gray-100",
            isFocused && !error && "border-primary-500 shadow-sm",
            isHovered && !isFocused && !error && "border-gray-400",
            className,
          )}
          dir={dir || (isRTL ? "rtl" : "ltr")}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error || helperText ? `${inputId}-description` : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          {...props}
        />

        {rightIcon && (
          <div className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-gray-500`}>
            {rightIcon}
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent"></div>
          </div>
        )}

        {isValid && showSuccessIndicator && !error && hasValue && (
          <div className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-green-500`}>
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>

      {(error || helperText) && (
        <div
          id={`${inputId}-description`}
          className={`mt-1.5 text-sm flex items-start ${error ? "text-red-500" : "text-gray-500"} transition-all duration-200`}
        >
          {error && <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />}
          <span>{error || helperText}</span>
        </div>
      )}
    </div>
  )
}
