"use client"

import { Button } from "@/components/ui/button"
import { LogIn, User } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth0"

export function AuthButton() {
  const { user, error, isLoading, loginWithRedirect, logout } = useAuth()
  const { isRTL } = useLanguage()

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="text-gray-400">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    )
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            {user.picture ? (
              <img
                src={user.picture || "/placeholder.svg"}
                alt={user.name || "User"}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <User className="h-4 w-4" />
            )}
            <span className="hidden md:inline">{user.name?.split(" ")[0] || user.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isRTL ? "start" : "end"}>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">{isRTL ? "לוח בקרה" : "Dashboard"}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/my-orders">{isRTL ? "ההזמנות שלי" : "My Orders"}</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>{isRTL ? "התנתק" : "Logout"}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button variant="ghost" size="sm" onClick={loginWithRedirect}>
      <LogIn className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
      {isRTL ? "התחבר" : "Login"}
    </Button>
  )
}
