import type * as React from "react"
import { cn } from "@/lib/utils"
import { FileText, Clock, History, FileSearch } from "lucide-react"

export interface DocumentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  price: string
  type: "regular" | "historical" | "full" | "retrieval"
  selected?: boolean
  disabled?: boolean
}

export function DocumentCard({
  title,
  description,
  price,
  type,
  selected = false,
  disabled = false,
  className,
  ...props
}: DocumentCardProps) {
  const getIcon = () => {
    switch (type) {
      case "regular":
        return <FileText className="h-6 w-6" />
      case "historical":
        return <History className="h-6 w-6" />
      case "full":
        return <FileSearch className="h-6 w-6" />
      case "retrieval":
        return <Clock className="h-6 w-6" />
      default:
        return <FileText className="h-6 w-6" />
    }
  }

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border p-5 transition-all",
        selected && !disabled && "border-primary-600 bg-primary-50",
        disabled && "opacity-60 cursor-not-allowed",
        !disabled && !selected && "hover:border-primary-300 cursor-pointer",
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
        {getIcon()}
      </div>
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-gray-600">{description}</p>
      <div className="mt-auto text-lg font-bold text-primary-700">{price}</div>
      {selected && !disabled && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary-600 bg-opacity-10">
          <div className="absolute right-3 rtl:left-3 rtl:right-auto top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
