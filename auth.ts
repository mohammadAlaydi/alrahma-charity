import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Placeholder: replace with your backend auth call
        // e.g. POST `${API_BASE_URL}/auth/login` and return user object on success
        if (!credentials?.email || !credentials?.password) return null;

        // Demo-only: accept any non-empty credentials
        return {
          id: "demo-user",
          name: "مستخدم تجريبي",
          email: credentials.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user ?? session.user;
      return session;
    },
  },
};
