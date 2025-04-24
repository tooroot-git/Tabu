"use client"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import { useEffect, useState } from "react"

export interface StepProps {
  title: string
  description?: string
  status: "completed" | "current" | "upcoming"
}

interface StepperProps {
  steps: StepProps[]
  currentStep: number
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function Stepper({ steps, currentStep, className, orientation = "horizontal" }: StepperProps) {
  const [isRTL, setIsRTL] = useState(false)

  // Check text direction only on client
  useEffect(() => {
    setIsRTL(document.dir === "rtl")
  }, [])

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "items-center justify-center" : "flex-col space-y-6",
          isRTL && orientation === "horizontal" && "flex-row-reverse",
        )}
        aria-label="Progress steps"
        role="list"
      >
        {steps.map((step, index) => {
          const status = index < currentStep ? "completed" : index === currentStep ? "current" : "upcoming"
          const isLast = index === steps.length - 1

          return (
            <div
              key={step.title || index}
              className={cn("relative flex flex-col items-center", orientation === "horizontal" && !isLast && "flex-1")}
              aria-current={status === "current" ? "step" : undefined}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-md",
                  status === "completed"
                    ? "border-primary-600 bg-primary-600 text-white"
                    : status === "current"
                      ? "border-primary-600 bg-gray-900 text-primary-600"
                      : "border-gray-700 bg-gray-900 text-gray-500",
                )}
                aria-hidden="true"
              >
                {status === "completed" ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step Title */}
              <div className="mt-2 text-center">
                <span
                  className={cn(
                    "text-sm font-medium",
                    status === "completed" || status === "current" ? "text-white" : "text-gray-500",
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <p
                    className={cn(
                      "mt-1 text-xs",
                      status === "completed" || status === "current" ? "text-gray-400" : "text-gray-600",
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>

              {/* Connector Line */}
              {!isLast && orientation === "horizontal" && (
                <div
                  className={cn(
                    "absolute top-6 h-[2px] w-full",
                    status === "completed" ? "bg-primary-600" : "bg-gray-700",
                    isRTL ? "right-1/2" : "left-1/2",
                  )}
                  style={{ width: "calc(100% - 3rem)" }}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
