import { handleAuth, handleLogin, handleCallback, handleLogout } from "@/lib/auth-mock"

// In production, you would use the real Auth0 handlers:
// import { handleAuth, handleLogin, handleCallback, handleLogout } from "@auth0/nextjs-auth0"

export const GET = handleAuth({
  login: handleLogin(),
  callback: handleCallback(),
  logout: handleLogout(),
})

export const POST = GET
