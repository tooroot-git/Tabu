// Minimal auth utilities - no functionality, just placeholders
export function getUser() {
  return null
}

export function login() {
  return null
}

export function logout() {
  return null
}

// Mock API handlers
export function handleAuth() {
  return async () => {
    return new Response("Auth handler mock", { status: 200 })
  }
}

export function handleLogin() {
  return async () => {
    return new Response("Login handler mock", { status: 200 })
  }
}

export function handleCallback() {
  return async () => {
    return new Response("Callback handler mock", { status: 200 })
  }
}

export function handleLogout() {
  return async () => {
    return new Response("Logout handler mock", { status: 200 })
  }
}
