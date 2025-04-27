import React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

type StepStatus = "completed" | "current" | "upcoming"

interface Step {
  label: string
  status?: StepStatus
  completed?: boolean
  active?: boolean
}

interface StepperProps {
  steps: Step[]
  currentStep?: number
  className?: string
}

export function Stepper({ steps, currentStep = 0, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          // Determine step status
          let status: StepStatus = "upcoming"
          if (index < currentStep || step.completed) {
            status = "completed"
          } else if (index === currentStep || step.active) {
            status = "current"
          }

          // Determine if this is the last step
          const isLastStep = index === steps.length - 1

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2",
                    status === "completed"
                      ? "border-primary-500 bg-primary-500 text-white"
                      : status === "current"
                        ? "border-primary-500 text-primary-500"
                        : "border-gray-600 text-gray-600",
                  )}
                >
                  {status === "completed" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-center text-xs font-medium",
                    status === "completed" ? "text-primary-500" : status === "current" ? "text-white" : "text-gray-500",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {!isLastStep && (
                <div
                  className={cn(
                    "h-0.5 w-full max-w-[100px] flex-1",
                    index < currentStep ? "bg-primary-500" : "bg-gray-600",
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
