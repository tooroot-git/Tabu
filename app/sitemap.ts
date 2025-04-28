import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tabuisrael.co.il"

  // Define all public routes
  const routes = [
    "",
    "/order",
    "/document-selection",
    "/payment",
    "/confirmation",
    "/faq",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/terms",
    "/privacy",
    "/accessibility",
    "/services",
  ]

  const sitemapEntries = []

  // Add Hebrew routes (default)
  for (const route of routes) {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1.0 : route === "/order" ? 0.9 : 0.8,
      // Add language alternates
      alternates: {
        languages: {
          he: `${baseUrl}${route}`,
          en: `${baseUrl}/en${route}`,
        },
      },
    })
  }

  // Add English routes
  for (const route of routes) {
    sitemapEntries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 0.9 : route === "/order" ? 0.8 : 0.7,
      // Add language alternates
      alternates: {
        languages: {
          en: `${baseUrl}/en${route}`,
          he: `${baseUrl}${route}`,
        },
      },
    })
  }

  return sitemapEntries
}
