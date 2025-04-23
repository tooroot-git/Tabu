import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tabuisrael.co.il"

  const routes = [
    "",
    "/order",
    "/document-selection",
    "/faq",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/terms",
    "/privacy",
    "/accessibility",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }))
}
