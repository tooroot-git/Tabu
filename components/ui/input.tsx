import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, iconPosition = "left", helperText, ...props }, ref) => {
    // Determine if we should show the icon on the left or right based on language direction
    const isRTL = document.dir === "rtl"
    const effectiveIconPosition = isRTL ? (iconPosition === "left" ? "right" : "left") : iconPosition

    return (
      <div className="relative w-full">
        {icon && effectiveIconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 flex items-center pl-3 rtl:pl-0 rtl:pr-3">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error focus-visible:ring-error",
            icon && effectiveIconPosition === "left" && "pl-10 rtl:pl-3 rtl:pr-10",
            icon && effectiveIconPosition === "right" && "pr-10 rtl:pr-3 rtl:pl-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon && effectiveIconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center pr-3 rtl:pr-0 rtl:pl-3">
            {icon}
          </div>
        )}
        {(error || helperText) && (
          <div className={`mt-1 text-sm ${error ? "text-error" : "text-muted-foreground"}`}>{error || helperText}</div>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
