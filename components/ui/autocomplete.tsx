"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Spinner } from "@/components/ui/spinner"

export type AutocompleteOption = {
  value: string
  label: string
}

interface AutocompleteProps {
  options: AutocompleteOption[]
  value: string
  onChange: (value: string) => void
  onSearch: (query: string) => void
  placeholder?: string
  emptyMessage?: string
  label?: string
  error?: string
  isLoading?: boolean
  className?: string
  dir?: "ltr" | "rtl"
}

export function Autocomplete({
  options,
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  emptyMessage = "No results found.",
  label,
  error,
  isLoading = false,
  className,
  dir = "ltr",
  ...props
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      onSearch(value)
    },
    [onSearch],
  )

  const selectedOption = React.useMemo(() => options.find((option) => option.value === value), [options, value])

  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      onChange(selectedValue)
      setOpen(false)
    },
    [onChange],
  )

  const handleClear = React.useCallback(() => {
    onChange("")
    setInputValue("")
    onSearch("")
  }, [onChange, onSearch])

  return (
    <div className={cn("relative", className)} dir={dir}>
      {label && <label className="mb-2 block text-sm font-medium text-gray-300">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-700/50 hover:text-white",
              error && "border-red-500",
              "h-10 px-3 py-2",
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <div className="flex items-center">
              {value && (
                <X
                  className="mr-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear()
                  }}
                />
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 bg-gray-800 border-gray-700 text-gray-200"
          align={dir === "rtl" ? "end" : "start"}
        >
          <Command className="bg-transparent" dir={dir}>
            <CommandInput
              placeholder={placeholder}
              className="h-9 bg-transparent border-b border-gray-700"
              value={inputValue}
              onValueChange={setInputValue}
              onInput={handleInputChange}
            />
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Spinner size="sm" />
              </div>
            ) : (
              <>
                <CommandList>
                  <CommandEmpty className="py-6 text-center text-sm text-gray-400">{emptyMessage}</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-auto">
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={handleSelect}
                        className="cursor-pointer hover:bg-gray-700 aria-selected:bg-gray-700"
                      >
                        <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
