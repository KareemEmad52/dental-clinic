import { Gender, Providers } from "@prisma/client";
import { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role?: string | null;
      phone?: string | null;
      gender?: Gender | null;
      address?: string | null;
      dateOfBirth?: Date | null;
      provider?: Providers | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string | null;
    phone?: string | null;
    gender?: Gender | null;
    address?: string | null;
    dateOfBirth?: Date | null;
    provider?: Providers | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string | null;
    phone?: string | null;
    gender?: Gender | null;
    address?: string | null;
    dateOfBirth?: Date | null;
    provider?: Providers | null;
  }
}
