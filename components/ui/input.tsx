"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, ...props }, ref) => {
    const [isRTL, setIsRTL] = useState(false)

    // בדיקת כיוון הטקסט רק בצד הלקוח
    useEffect(() => {
      setIsRTL(document.dir === "rtl")
    }, [])

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error focus-visible:ring-error",
            className,
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <div className={`mt-1 text-sm ${error ? "text-error" : "text-muted-foreground"}`}>{error || helperText}</div>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
