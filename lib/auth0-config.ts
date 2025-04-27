// Auth0 configuration
export const auth0Config = {
  authorizationParams: {
    scope: "openid profile email",
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  },
  baseURL: process.env.AUTH0_BASE_URL || "http://localhost:3000",
  clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "",
  clientSecret: process.env.AUTH0_SECRET || "",
  issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ? `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}` : "",
  secret: process.env.AUTH0_SECRET || "a-long-random-string-that-should-be-replaced",
  routes: {
    callback: "/api/auth/callback",
    login: "/api/auth/login",
    logout: "/api/auth/logout",
  },
}
