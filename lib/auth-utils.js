// Simple authentication utilities without React context or TypeScript

// Get user from localStorage
export function getUser() {
  if (typeof window === "undefined") return null

  try {
    const user = localStorage.getItem("mock_user")
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

// Login function
export function login() {
  if (typeof window === "undefined") return

  const mockUser = {
    name: "משתמש לדוגמה",
    email: "user@example.com",
    picture: "/vibrant-street-market.png",
  }

  localStorage.setItem("mock_user", JSON.stringify(mockUser))
  return mockUser
}

// Logout function
export function logout() {
  if (typeof window === "undefined") return

  localStorage.removeItem("mock_user")
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
