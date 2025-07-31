import {  NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function GET(){
    const session = await auth()

    if (!session?.user?.email){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { counterValue: true}
        })
        return NextResponse.json({count: user?.counterValue || 0})
    }catch(error){
        return NextResponse.json({ error: "Database error"}, {status: 500 })
    }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { count } = await request.json()
    
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { counterValue: count },
      select: { counterValue: true }
    })

    return NextResponse.json({ count: updatedUser.counterValue })
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}