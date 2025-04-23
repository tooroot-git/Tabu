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
      <ol
        className={cn(
          orientation === "horizontal" ? "flex items-center" : "flex flex-col space-y-6",
          isRTL && orientation === "horizontal" && "flex-row-reverse",
        )}
        aria-label="Progress steps"
        role="list"
      >
        {steps.map((step, index) => {
          const status = index < currentStep ? "completed" : index === currentStep ? "current" : "upcoming"

          return (
            <li
              key={step.title}
              className={cn(
                "relative",
                orientation === "horizontal" && index !== steps.length - 1 && "flex-1",
                orientation === "vertical" && "flex",
              )}
              aria-current={status === "current" ? "step" : undefined}
            >
              {/* Step Indicator */}
              <div className={cn("flex items-center", orientation === "vertical" && "flex-col")}>
                <div
                  className={cn(
                    "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-md",
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

                {/* Connector Line */}
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      orientation === "horizontal" ? `absolute top-5 w-full h-0.5` : `h-full w-0.5 mt-2.5 ml-5`,
                      status === "completed" ? "bg-primary-600" : "bg-gray-700",
                      isRTL && orientation === "horizontal" ? "right-1/2" : orientation === "horizontal" && "left-1/2",
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Step Content */}
              <div className={cn(orientation === "horizontal" ? "mt-3 text-center" : "ml-4 mt-0")}>
                <h3
                  className={cn(
                    "text-sm font-medium",
                    status === "completed" || status === "current" ? "text-white" : "text-gray-500",
                  )}
                >
                  {step.title}
                </h3>
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
            </li>
          )
        })}
      </ol>
    </div>
  )
}
