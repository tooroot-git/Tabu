import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-primary-foreground hover:bg-primary-700 active:bg-primary-800 hover:shadow-md hover:shadow-primary-500/20",
        secondary:
          "bg-secondary-600 text-secondary-foreground hover:bg-secondary-700 active:bg-secondary-800 hover:shadow-md hover:shadow-secondary-500/20",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/70",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/70",
        link: "text-primary underline-offset-4 hover:underline active:text-primary-700",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/100 hover:shadow-md hover:shadow-destructive/20",
        white:
          "bg-white text-primary-600 hover:bg-gray-50 active:bg-gray-100 border border-gray-200 hover:border-gray-300",
      },
      size: {
        default: "h-11 px-4 py-2", // Increased height for better touch targets
        sm: "h-10 rounded-md px-3", // Increased from h-9 for better touch targets
        lg: "h-12 rounded-md px-8", // Increased height
        icon: "h-11 w-11", // Increased size for touch targets
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, loadingText, leftIcon, rightIcon, children, ...props }, ref) => {
    // Get RTL information from HTML dir attribute
    const isRTL = typeof document !== "undefined" ? document.dir === "rtl" : false

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* Ripple effect overlay */}
        <span className="ripple-effect" />

        {isLoading ? (
          <>
            <Loader2 className={`h-4 w-4 animate-spin ${loadingText ? (isRTL ? "ml-2" : "mr-2") : ""}`} />
            {loadingText}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className={`transition-transform duration-300 ${isRTL ? "ml-2" : "mr-2"}`}>{leftIcon}</span>
            )}
            <span className="relative z-10 inline-flex items-center whitespace-nowrap">{children}</span>
            {rightIcon && (
              <span className={`transition-transform duration-300 ${isRTL ? "mr-2" : "ml-2"}`}>{rightIcon}</span>
            )}
          </>
        )}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
