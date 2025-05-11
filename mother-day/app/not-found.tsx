import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Page Not Found</h1>
        <p className="text-gray-300 mb-8">Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
