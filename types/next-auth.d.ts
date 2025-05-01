import { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string | null; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string | null; 
  }
}