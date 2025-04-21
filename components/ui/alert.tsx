"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-success/50 text-success dark:border-success [&>svg]:text-success",
        warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
        info: "border-info/50 text-info dark:border-info [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  const [isRTL, setIsRTL] = useState(false)

  // בדיקת כיוון הטקסט רק בצד הלקוח
  useEffect(() => {
    setIsRTL(document.dir === "rtl")
  }, [])

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant }),
        isRTL && "[&>svg]:right-4 [&>svg]:left-auto [&>svg~*]:pr-7 [&>svg~*]:pl-0",
        className,
      )}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
)
AlertDescription.displayName = "AlertDescription"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success" | "warning" | "info"
  title?: string
  description?: string
}

const AlertInfo = ({ variant = "info", title, description, className, ...props }: AlertProps) => {
  return (
    <Alert variant={variant} className={className} {...props}>
      <Info className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}

const AlertSuccess = ({ variant = "success", title, description, className, ...props }: AlertProps) => {
  return (
    <Alert variant={variant} className={className} {...props}>
      <CheckCircle className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}

const AlertWarning = ({ variant = "warning", title, description, className, ...props }: AlertProps) => {
  return (
    <Alert variant={variant} className={className} {...props}>
      <AlertCircle className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}

const AlertError = ({ variant = "destructive", title, description, className, ...props }: AlertProps) => {
  return (
    <Alert variant={variant} className={className} {...props}>
      <XCircle className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertInfo, AlertSuccess, AlertWarning, AlertError }
