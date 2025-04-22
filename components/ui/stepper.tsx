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
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  const [isRTL, setIsRTL] = useState(false)

  // בדיקת כיוון הטקסט רק בצד הלקוח
  useEffect(() => {
    setIsRTL(document.dir === "rtl")
  }, [])

  return (
    <div className={cn("w-full", className)}>
      <ol className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
        {steps.map((step, index) => {
          const status = index < currentStep ? "completed" : index === currentStep ? "current" : "upcoming"

          return (
            <li
              key={step.title}
              className={cn("relative flex flex-col items-center", index !== steps.length - 1 ? "flex-1" : "")}
            >
              {/* Step Indicator */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 z-10
                  bg-gray-900
                  border-primary-600
                  shadow-[0_0_10px_rgba(232,93,4,0.3)]"
              >
                {status === "completed" ? (
                  <CheckIcon className="h-5 w-5 text-primary-500" />
                ) : (
                  <span
                    className={cn("text-sm font-medium", status === "current" ? "text-primary-500" : "text-gray-500")}
                  >
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Step Content */}
              <div className="mt-3 text-center">
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

              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 h-0.5 w-full",
                    isRTL ? "right-1/2" : "left-1/2",
                    status === "completed" ? "bg-primary-600" : "bg-gray-700",
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
