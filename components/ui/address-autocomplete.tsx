"use client"

import type * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface AutocompleteOption {
  value: string
  label: string
  data?: any
}

interface AddressAutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options: AutocompleteOption[]
  onSearch: (query: string) => void
  onSelect: (option: AutocompleteOption) => void
  loading?: boolean
  label?: string
  required?: boolean
}

export function AddressAutocomplete({
  options,
  onSearch,
  onSelect,
  loading = false,
  label,
  required = false,
  className,
  ...props
}: AddressAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(props.value?.toString() || "")
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Always call onSearch, even with empty string
    onSearch(value)

    // Only open dropdown if we have input
    if (value.length >= 1) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  // Handle option selection
  const handleOptionSelect = (option: AutocompleteOption) => {
    setInputValue(option.label)
    onSelect(option)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
          {required && "*"}
        </label>
      )}
      <div className="relative">
        <Input
          {...props}
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue.length >= 1 && setIsOpen(true)}
          className={cn("bg-[#1A1F2E] border-gray-700 text-white placeholder:text-gray-500", className)}
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
      {isOpen && options.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-[#1A1F2E] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={`${option.value}-${index}`}
                onClick={() => handleOptionSelect(option)}
                className="px-4 py-2 text-white hover:bg-[#2A3042] cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
