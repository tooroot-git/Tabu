"use client"

import { useState, useCallback } from "react"
import type { AutocompleteOption } from "@/components/ui/autocomplete"

// Resource IDs for the government API
const CITIES_RESOURCE_ID = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba"
const STREETS_RESOURCE_ID = "9ad3862c-8391-4b2f-84a4-2d4c68625f4b"

// Mock data for cities and streets
const CITIES = ["Tel Aviv", "Jerusalem", "Haifa", "Rishon Lezion"]
const STREETS = {
  "Tel Aviv": ["Allenby", "Dizengoff", "Rothschild"],
  Jerusalem: ["Jaffa", "Ben Yehuda", "King George"],
  Haifa: ["Herzl", "Hativat Givati", "Sderot Ben Gurion"],
  "Rishon Lezion": ["Jabotinsky", "Herzl", "Rotshild"],
}

export function useLocationSearch() {
  const [cities, setCities] = useState<AutocompleteOption[]>([])
  const [streets, setStreets] = useState<AutocompleteOption[]>([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingStreets, setLoadingStreets] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")

  // Search for cities
  const searchCities = useCallback(async (query: string) => {
    // Only search if query has at least 2 characters
    if (query.length < 2) {
      setCities([])
      return
    }

    setLoadingCities(true)
    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Filter cities that match the query
      const filteredCities = CITIES.filter((city) => city.toLowerCase().includes(query.toLowerCase())).map((city) => ({
        value: city,
        label: city,
      }))

      setCities(filteredCities)
    } catch (error) {
      console.error("Error searching cities:", error)
      setCities([])
    } finally {
      setLoadingCities(false)
    }
  }, [])

  // Search for streets in a specific city
  const searchStreets = useCallback(
    async (query: string) => {
      // Only search if we have a selected city and query has at least 2 characters
      if (!selectedCity || query.length < 2) {
        setStreets([])
        return
      }

      setLoadingStreets(true)
      try {
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Filter streets that match the query for the selected city
        const filteredStreets = STREETS[selectedCity as keyof typeof STREETS] || []
        const matchedStreets = filteredStreets
          .filter((street) => street.toLowerCase().includes(query.toLowerCase()))
          .map((street) => ({ value: street, label: street }))

        setStreets(matchedStreets)
      } catch (error) {
        console.error("Error searching streets:", error)
        setStreets([])
      } finally {
        setLoadingStreets(false)
      }
    },
    [selectedCity],
  )

  return {
    cities,
    streets,
    loadingCities,
    loadingStreets,
    searchCities,
    searchStreets,
    selectedCity,
    setSelectedCity,
  }
}
