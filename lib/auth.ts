// lib/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!, // adapter needs service role to write user tables
  }),
  providers: [
    Google,
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(c) {
        // implement your own or skip credentials if only OAuth
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // Mirror the Supabase user id for RLS-friendly JWTs:
      if (user?.id) token.sub = user.id as string;
      return token;
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
