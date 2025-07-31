"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Counter from "@/app/Components/Counter"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return // Don't run on server
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/auth/signin")
    }
  }, [session, status, router, isClient])

  // Show loading during hydration
  if (!isClient || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to sign in
  }

  return <Counter />
}