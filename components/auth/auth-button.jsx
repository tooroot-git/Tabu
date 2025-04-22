import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AuthButton() {
  return (
    <Button variant="outline" size="sm" className="text-white border-gray-700 bg-gray-800/70 hover:bg-gray-800" asChild>
      <Link href="/">Login</Link>
    </Button>
  )
}
