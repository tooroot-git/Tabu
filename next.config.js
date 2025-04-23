/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "s.gravatar.com"], // For Auth0 profile images
    unoptimized: true,
  },
  env: {
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
  },
}

module.exports = nextConfig
