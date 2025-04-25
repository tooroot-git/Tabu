import { Loader2 } from "lucide-react"

export default function PaymentSetupLoading() {
  return (
    <div className="container max-w-md py-12 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary-500 mx-auto" />
        <p className="mt-4 text-gray-400">Loading payment setup...</p>
      </div>
    </div>
  )
}
