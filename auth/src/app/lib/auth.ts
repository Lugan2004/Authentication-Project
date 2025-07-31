import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import { prisma } from "./prisma"; // or "./lib/prisma"
import NextAuth from "next-auth";


const config ={
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        session: async ({ session, token}) => {
            if (session?.user && token?.sub){
                session.user.id =token.sub
            }
            return session
        },
        jwt: async ({ user, token }) =>{
            if(user){
                token.sub = user.id
            }
            return token
        },
    },
    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: "/auth/signin",
    },
    
    trustHost: true,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut} =NextAuth(config)
