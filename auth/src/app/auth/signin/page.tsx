"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Sign(){
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getSession().then((session) => {
            if (session){
                router.push("/")
            }
        })
    }, [router])

    const handleSignIn = async () => {
        setLoading(true)
        await signIn("github", {callbackUrl: "/"})
    }
      return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Counter App
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to access your personal counter
          </p>
        </div>
        <div>
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in with GitHub"}
          </button>
        </div>
      </div>
    </div>
  )
}