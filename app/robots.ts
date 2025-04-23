import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/dashboard/",
        "/my-orders/",
        "/settings/",
        "/profile/",
        "/reset-password/",
        "/forgot-password/",
      ],
    },
    sitemap: "https://tabuisrael.co.il/sitemap.xml",
  }
}
