import { handleAuth, handleLogin, handleCallback, handleLogout } from "@/lib/auth-utils"

export const GET = handleAuth({
  login: handleLogin(),
  callback: handleCallback(),
  logout: handleLogout(),
})

export const POST = GET
