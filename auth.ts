
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Use backend API
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
          const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();

          if (res.ok && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Login Error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Store user data in token
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.isAdmin = user.isAdmin;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Map token data to session user
      if (token && token.email) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role as string,
          isAdmin: token.isAdmin as boolean,
        };
        // Store tokens in session for API calls if needed
        (session as any).access_token = token.access_token;
        (session as any).refresh_token = token.refresh_token;
      }
      return session;
    },
  },
};
