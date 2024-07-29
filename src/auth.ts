import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Google
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth;
      const isIndexPage = nextUrl.pathname === '/';

      //Redirect authorized users from index page to dashboard
      if (isIndexPage && isLoggedIn)
        return Response.redirect(new URL('/tournaments/my', nextUrl));

      // Allow index page (landing)
      if (isIndexPage && !isLoggedIn) return true;

      // Other pages are protected
      return isLoggedIn;
    },
  }
})