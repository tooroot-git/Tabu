// Auth utilities - mock implementations for development
export function getUser() {
  return null
}

export function login() {
  return null
}

export function logout() {
  return null
}

// Mock API handlers that match Auth0 patterns
export function handleAuth() {
  return async (req, res) => {
    return new Response("Auth handler mock", { status: 200 })
  }
}

export function handleLogin() {
  return async (req, res) => {
    return new Response("Login handler mock", { status: 200 })
  }
}

export function handleCallback() {
  return async (req, res) => {
    return new Response("Callback handler mock", { status: 200 })
  }
}

export function handleLogout() {
  return async (req, res) => {
    return new Response("Logout handler mock", { status: 200 })
  }
}
