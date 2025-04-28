import { Inter, Montserrat, Heebo } from "next/font/google"

// Configure Inter font
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Configure Montserrat font
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

// Add Heebo for Hebrew text
export const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  display: "swap",
  variable: "--font-heebo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})
