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
              className={cn(
                "relative flex items-center",
                index !== steps.length - 1 ? "flex-1" : "",
                isRTL ? "flex-row-reverse" : "",
              )}
            >
              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2",
                    status === "completed"
                      ? "border-primary-600 bg-primary-600"
                      : status === "current"
                        ? "border-primary-600 bg-white"
                        : "border-gray-300 bg-white",
                  )}
                >
                  {status === "completed" ? (
                    <CheckIcon className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={cn("text-sm font-medium", status === "current" ? "text-primary-600" : "text-gray-500")}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-4 rtl:ml-0 rtl:mr-4">
                <p
                  className={cn(
                    "text-sm font-medium",
                    status === "completed" || status === "current" ? "text-gray-900" : "text-gray-500",
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p
                    className={cn(
                      "text-sm",
                      status === "completed" || status === "current" ? "text-gray-600" : "text-gray-400",
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4 h-0.5 w-full",
                    isRTL ? "right-8" : "left-8",
                    status === "completed" ? "bg-primary-600" : "bg-gray-300",
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
