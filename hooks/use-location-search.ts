"use client"

import { useState, useCallback } from "react"
import type { AutocompleteOption } from "@/components/ui/autocomplete"

// Resource IDs for the government API
const CITIES_RESOURCE_ID = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba"
const STREETS_RESOURCE_ID = "9ad3862c-8391-4b2f-84a4-2d4c68625f4b"

// API base URL
const API_BASE_URL = "https://data.gov.il/api/3/action/datastore_search"

export function useLocationSearch() {
  const [cities, setCities] = useState<AutocompleteOption[]>([])
  const [streets, setStreets] = useState<AutocompleteOption[]>([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingStreets, setLoadingStreets] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")

  // Search for cities
  const searchCities = useCallback(async (query: string) => {
    // Only search if query has at least 1 character
    if (query.length < 1) {
      setCities([])
      return
    }

    setLoadingCities(true)
    try {
      // Fetch cities from the government API
      const response = await fetch(
        `${API_BASE_URL}?resource_id=${CITIES_RESOURCE_ID}&q=${encodeURIComponent(query)}&limit=15`,
      )

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      // Comprehensive fallback data
      const CITIES_LIST = [
        "תל אביב-יפו",
        "ירושלים",
        "חיפה",
        "ראשון לציון",
        "פתח תקווה",
        "אשדוד",
        "נתניה",
        "באר שבע",
        "בני ברק",
        "חולון",
        "רמת גן",
        "אשקלון",
        "רחובות",
        "בת ים",
        "הרצליה",
        "כפר סבא",
        "מודיעין-מכבים-רעות",
        "רעננה",
        "רמלה",
        "לוד",
      ]

      // Filter cities that match the query (case insensitive)
      const lowerQuery = query.toLowerCase()
      const filteredCities = CITIES_LIST.filter((city) => city.toLowerCase().includes(lowerQuery)).map((city) => ({
        value: city,
        label: city,
      }))

      if (data.success && data.result && data.result.records && data.result.records.length > 0) {
        // Map the API response to our autocomplete options format
        const cityOptions = data.result.records.map((record: any) => ({
          value: record.שם_ישוב,
          label: record.שם_ישוב,
          data: record,
        }))

        // Combine API results with our fallback data, removing duplicates
        const combinedOptions = [...cityOptions]

        filteredCities.forEach((fallbackCity) => {
          if (!combinedOptions.some((option) => option.value === fallbackCity.value)) {
            combinedOptions.push(fallbackCity)
          }
        })

        setCities(combinedOptions)
      } else {
        setCities(filteredCities)
      }
    } catch (error) {
      console.error("Error searching cities:", error)

      // Fallback to local data if API fails
      const CITIES_LIST = [
        "תל אביב-יפו",
        "ירושלים",
        "חיפה",
        "ראשון לציון",
        "פתח תקווה",
        "אשדוד",
        "נתניה",
        "באר שבע",
        "בני ברק",
        "חולון",
        "רמת גן",
        "אשקלון",
        "רחובות",
        "בת ים",
        "הרצליה",
        "כפר סבא",
        "מודיעין-מכבים-רעות",
        "רעננה",
        "רמלה",
        "לוד",
      ]

      // Filter cities that match the query (case insensitive)
      const lowerQuery = query.toLowerCase()
      const filteredCities = CITIES_LIST.filter((city) => city.toLowerCase().includes(lowerQuery)).map((city) => ({
        value: city,
        label: city,
      }))

      setCities(filteredCities)
    } finally {
      setLoadingCities(false)
    }
  }, [])

  // Search for streets in a specific city
  const searchStreets = useCallback(
    async (query: string) => {
      // Only search if we have a selected city
      if (!selectedCity) {
        setStreets([])
        return
      }

      setLoadingStreets(true)
      try {
        console.log(`Searching streets in ${selectedCity} with query: ${query}`)

        // Comprehensive street data for major cities
        const TEL_AVIV_STREETS = [
          "אלנבי",
          "דיזנגוף",
          "רוטשילד",
          "בן יהודה",
          "קינג ג'ורג'",
          "הירקון",
          "אבן גבירול",
          "בוגרשוב",
          "נחלת בנימין",
          "שינקין",
          "הרברט סמואל",
          "יהודה הלוי",
          "לילינבלום",
          "מונטיפיורי",
          "נחמני",
          "פרישמן",
          "ארלוזורוב",
          "ז'בוטינסקי",
          "בן גוריון",
          "וייצמן",
          "אחד העם",
          "הרצל",
          "לוינסקי",
          "מנחם בגין",
          "יפת",
          "שדרות ירושלים",
          "יגאל אלון",
          "החשמונאים",
          "קרליבך",
          "שאול המלך",
        ]

        const JERUSALEM_STREETS = [
          "יפו",
          "בן יהודה",
          "קינג ג'ורג'",
          "עמק רפאים",
          "שדרות הרצל",
          "אגריפס",
          "בצלאל",
          "הנביאים",
          "שבטי ישראל",
          "יחזקאל",
          "דרך חברון",
          "דרך בית לחם",
          "דרך שכם",
          'הפלמ"ח',
          "עזה",
          "הלל",
          "שמאי",
          "יהודה המכבי",
          "הרב קוק",
          "שמואל הנגיד",
        ]

        const HAIFA_STREETS = [
          "הרצל",
          "חטיבת גבעתי",
          "שדרות בן גוריון",
          "מוריה",
          "הנשיא",
          "חורב",
          "אבא חושי",
          "דרך הים",
          "יפה נוף",
          "גאולה",
          "הציונות",
          "הנמל",
          "יפו",
          "אלנבי",
          "הגפן",
        ]

        // Map of cities to their streets
        const STREETS_DATA: Record<string, string[]> = {
          "תל אביב-יפו": TEL_AVIV_STREETS,
          ירושלים: JERUSALEM_STREETS,
          חיפה: HAIFA_STREETS,
        }

        // Get streets for the selected city or use an empty array if not found
        const cityStreets = STREETS_DATA[selectedCity] || []

        // Filter streets based on query if provided
        let filteredStreets
        if (query && query.length > 0) {
          const lowerQuery = query.toLowerCase()
          filteredStreets = cityStreets
            .filter((street) => street.toLowerCase().includes(lowerQuery))
            .map((street) => ({
              value: street,
              label: street,
            }))
        } else {
          // If no query, return all streets for the city (limited to first 15)
          filteredStreets = cityStreets.slice(0, 15).map((street) => ({
            value: street,
            label: street,
          }))
        }

        // Try to fetch from API as well
        try {
          const apiUrl = `${API_BASE_URL}?resource_id=${STREETS_RESOURCE_ID}&q=${encodeURIComponent(query || "")}&limit=15`
          const response = await fetch(apiUrl)

          if (response.ok) {
            const data = await response.json()

            if (data.success && data.result && data.result.records && data.result.records.length > 0) {
              // Filter API results to only include streets from the selected city
              const cityStreetOptions = data.result.records
                .filter((record: any) => record.שם_ישוב === selectedCity)
                .map((record: any) => ({
                  value: record.שם_רחוב,
                  label: record.שם_רחוב,
                  data: record,
                }))

              // Combine API results with our fallback data, removing duplicates
              const combinedOptions = [...cityStreetOptions]

              filteredStreets.forEach((fallbackStreet) => {
                if (!combinedOptions.some((option) => option.value === fallbackStreet.value)) {
                  combinedOptions.push(fallbackStreet)
                }
              })

              setStreets(combinedOptions)
              return
            }
          }
        } catch (apiError) {
          console.error("API error when fetching streets:", apiError)
          // Continue with fallback data
        }

        // If API failed or returned no results, use our fallback data
        setStreets(filteredStreets)
      } catch (error) {
        console.error("Error searching streets:", error)
        setStreets([])
      } finally {
        setLoadingStreets(false)
      }
    },
    [selectedCity],
  )

  // Add this function to ensure selectedCity is properly set
  const setSelectedCityAndClearStreets = useCallback((city: string) => {
    setSelectedCity(city)
    setStreets([]) // Clear streets when city changes
  }, [])

  // Return this function instead of setSelectedCity
  return {
    cities,
    streets,
    loadingCities,
    loadingStreets,
    searchCities,
    searchStreets,
    selectedCity,
    setSelectedCity: setSelectedCityAndClearStreets,
  }
}
