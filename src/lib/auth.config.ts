import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // Enable debug in development
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
          console.log('NextAuth: Attempting login to:', `${baseUrl}/api/v1/auth/login`);
          console.log('NextAuth: Email:', credentials.email);
          
          const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          });
          
          console.log('NextAuth: Backend response status:', res.status);

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Login failed' }));
            console.error('Backend login error:', {
              status: res.status,
              statusText: res.statusText,
              error: errorData
            });
            return null;
          }

          const response = await res.json();
          console.log('NextAuth: Backend response:', JSON.stringify(response, null, 2));
          
          // Handle TransformInterceptor wrapper: { success: true, data: {...} }
          const data = response.data || response;
          console.log('NextAuth: Extracted data:', JSON.stringify(data, null, 2));

          if (data.user && data.access_token) {
            const userData = {
              user_id: data.user.user_id || data.user.id,
              id: data.user.user_id || data.user.id,
              email: data.user.email,
              full_name: data.user.full_name,
              name: data.user.name || data.user.full_name,
              is_admin: data.user.is_admin,
              isAdmin: data.user.isAdmin || data.user.is_admin,
              role: data.user.role || (data.user.is_admin ? 'admin' : 'user'),
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            };
            console.log('NextAuth: Returning user data:', JSON.stringify({ ...userData, access_token: '***', refresh_token: '***' }, null, 2));
            return userData;
          }
          
          console.error('NextAuth: Invalid response format from backend:', response);
          return null;
        } catch (error) {
          console.error('Login Error in NextAuth:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    // No custom pages - using modals instead
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.user_id || user.id;
        token.email = user.email;
        token.name = user.full_name || user.name;
        token.role = user.role || (user.is_admin ? 'admin' : 'user');
        token.isAdmin = user.is_admin || user.isAdmin || false;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        console.log('NextAuth JWT callback - Token updated:', {
          id: token.id,
          email: token.email,
          role: token.role,
          isAdmin: token.isAdmin,
          hasAccessToken: !!token.access_token
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const role = token.role as string;
        const isAdmin = token.isAdmin as boolean || role === 'admin' || role === 'ADMIN';
        
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: role || (isAdmin ? 'admin' : 'user'),
          isAdmin: isAdmin,
        };
        (session as any).access_token = token.access_token;
        (session as any).refresh_token = token.refresh_token;
        
        console.log('Session callback - User role:', session.user.role, 'isAdmin:', session.user.isAdmin);
      }
      return session;
    },
  },
};