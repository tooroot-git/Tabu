import { handleAuth, handleLogin, handleCallback, handleLogout } from "@auth0/nextjs-auth0"

export const GET = handleAuth({
  login: handleLogin({
    returnTo: "/dashboard",
  }),
  callback: handleCallback({
    afterCallback: (_req, _res, session) => {
      return session
    },
  }),
  logout: handleLogout({
    returnTo: "/",
  }),
})
