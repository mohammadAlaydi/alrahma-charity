import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    user_id?: string;
    full_name?: string;
    role?: string;
    is_admin?: boolean;
    isAdmin?: boolean;
    access_token?: string;
    refresh_token?: string;
  }

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
