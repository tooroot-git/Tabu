"use client"

// This file provides a unified interface for authentication
// It uses the mock implementation in development/preview and the real Auth0 in production

// In production, uncomment this line and comment out the mock import
// import { useUser as useAuth0User } from "@auth0/nextjs-auth0/client";

// For development/preview, we use the mock implementation
import { useUser as useMockUser } from "./auth-mock"

// Export the appropriate implementation
export const useUser = useMockUser

// For production, use this instead:
// export const useUser = useAuth0User;
