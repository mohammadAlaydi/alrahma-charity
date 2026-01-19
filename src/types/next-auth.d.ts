import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id?: string;
      email?: string;
      name?: string;
      role?: string;
      isAdmin?: boolean;
    };
    access_token?: string;
    refresh_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
    isAdmin?: boolean;
    access_token?: string;
    refresh_token?: string;
  }
}
