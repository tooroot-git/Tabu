/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["he", "en"],
    defaultLocale: "he", // Ensure Hebrew is the default
    localeDetection: false, // Disable automatic locale detection
    domains: [
      {
        domain: "tabuisrael.co.il",
        defaultLocale: "he",
      },
      {
        domain: "www.tabuisrael.co.il",
        defaultLocale: "he",
      },
      {
        domain: "en.tabuisrael.co.il", // Optional: Use subdomain for English
        defaultLocale: "en",
      },
    ],
  },
  images: {
    domains: ["tabuisrael.co.il"],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
