"use client"

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Counter(){

    const {data: session} = useSession();
    const [count,setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        if (session) {
            loadCounter()
        }
    }, [session])

    useEffect(() => {
        if (session && !loading){
            saveCounter()
        }
    },[count, session, loading])

    const loadCounter = async () =>{
        try{
            const response = await fetch("/api/counter")
            if (response.ok){
                const data =  await response.json()
                setCount(data.count)
            }
        }catch(error){
            console.error("Failed to load counter: ",error)
        }finally{
            setLoading(false)
        }
    }

    const saveCounter = async () => {
        setSaving(true)
        try{
            await fetch("/api/counter",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({count})
            })
        }catch(error){
            console.error("Failed to save counter: ", error)
        }finally{
            setSaving(false)
        }
    }
    const increment = ()=>{
        setCount (prev => prev +1)
    }
    const decrement = () => {
        setCount(prev => Math.max(0,prev - 0))
    }
    if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading your counter...</div>
      </div>
     )
    }
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        {/* User info and sign out */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-gray-600">Welcome back,</p>
            <p className="font-medium">{session?.user?.name}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Sign Out
          </button>
        </div>

        {/* Counter */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Counter</h1>
          
          <div className="text-6xl font-bold text-indigo-600 mb-8">
            {count}
          </div>

          <div className="space-x-4">
            <button
              onClick={decrement}
              disabled={count === 0 || saving}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Decrement
            </button>
            
            <button
              onClick={increment}
              disabled={saving}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              Increment
            </button>
          </div>

          {saving && (
            <p className="text-sm text-gray-500 mt-4">Saving...</p>
          )}
        </div>
      </div>
    </div>
  )
}