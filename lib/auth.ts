import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "../utils/validations";
import Google from "next-auth/providers/google";

export const {
  handlers: { POST, GET },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const parsedData = await LoginSchema.safeParse(credentials);
        if (!parsedData.success) throw new Error("Invalid credentials");

        const { email, password } = parsedData.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.password) throw new Error("User not found");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
        token.address = user.address;
        token.gender = user.gender;
        token.dateOfBirth = user.dateOfBirth;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.address = token.address;
        session.user.gender = token.gender;
        session.user.dateOfBirth = token.dateOfBirth;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account && (account.provider === "google" || account.provider === "github")) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });

        if (existingUser && existingUser.password) {
          // Redirect to the sign-in page with a custom error message
          return `/auth/login?error=${encodeURIComponent(
            "An account with this email already exists. Please sign in with your email and password."
          )}`;
        }
      }
      return true; // Allow sign-in if no conflict
    },
  },
});
