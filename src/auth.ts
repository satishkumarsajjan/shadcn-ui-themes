import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { Session } from "next-auth"
import GitHub from "next-auth/providers/github"
import { prisma } from "./db/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async session({ session, user }: { session: Session;  user: any }) {
      if (session.user) {
        session.user.id = user.id;
        // Add any other user details you need
      }
      return session;
    }
  }
})