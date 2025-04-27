"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  blur?: boolean
  loading?: "eager" | "lazy"
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  objectFit = "cover",
  blur = true,
  loading,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Ensure alt text is always provided
  const safeAlt = alt || "תמונה באתר טאבו ישראל"

  const objectFitClass =
    objectFit === "cover"
      ? "object-cover"
      : objectFit === "contain"
        ? "object-contain"
        : objectFit === "fill"
          ? "object-fill"
          : objectFit === "scale-down"
            ? "object-scale-down"
            : "object-none"

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      <Image
        src={error ? "/placeholder.svg" : src || "/placeholder.svg"}
        alt={safeAlt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        loading={loading}
        className={`transition-opacity duration-500 ${objectFitClass} ${isLoading && blur ? "opacity-0" : "opacity-100"}`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
      />
      {isLoading && blur && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs text-gray-500 text-center">{safeAlt}</span>
        </div>
      )}
    </div>
  )
}
