"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import prisma from "../../lib/prisma";
import { Prisma, Providers, Role } from "@prisma/client";
import { auth, signIn, signOut } from "../../lib/auth";
import {
  LoginSchema,
  doctorProfileUpdateSchema,
  doctorSignupSchema,
} from "../validations";
import { updateDoctorType } from "@/components/profile/UpdateDoctorForm";
import axios, { AxiosError } from "axios";
import { globalError } from "@/types/types";
import { getCsrfToken } from "next-auth/react";
import { exclude } from "@/utils/exclude";

export async function SigninWithCredentials(formData: FormData) {
  const parsedData = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedData.success) {
    const errorMessage = parsedData.error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    console.error("Validation error:", errorMessage);
    return { error: `Invalid input: ${errorMessage}` };
  }

  const { email, password } = parsedData.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });


    return { success: true, data: result };
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error.type === "CallbackRouteError" && error.cause?.err) {
      console.error("Auth.js error:", error.cause.err);
      const errorMessage = error.cause.err.message || "Invalid email or password";
      return { error: errorMessage };
    }

    // Handle other unexpected errors
    console.error("Unexpected error during sign-in:", error);
    return { error: "An unexpected error occurred during sign-in" };
  }
}

export async function signInWithGitHub() {
  try {
    await signIn("github", { redirectTo: "/" });

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
}

export async function signInWithGoogle() {
  try {
    await signIn("google", { redirectTo: "/" });
    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
}

const SignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function SignupUser(formData: FormData) {
  try {
    const ParsedData = SignupSchema.parse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const { username, email, password } = ParsedData;

    // check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) return { error: "Email already exists" };

    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_SECRET_ROUND as string)
    );

    const user = await prisma.user.create({
      data: {
        email,
        name: username,
        password: hashPassword,
        provider: Providers.CREDENTIALS
      },
    });

    return { success: true, data: user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map((err) => {
          return `${err.path.join(".")}: ${err.message}`;
        })
        .join(", ");
      console.error("Validation error:", errorMessage);
      return { error: `Invalid input: ${errorMessage}` };
    }
    // Handle Prisma database errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", error.message, {
        code: error.code,
        meta: error.meta,
      });
      if (error.code === "P2002") {
        // Unique constraint violation (e.g., email already exists)
        return { error: "A user with this email already exists" };
      }
      return { error: "A database error occurred during signup" };
    }

    // Handle other unexpected errors
    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred during signup" };
  }
}



export async function handleLogout() {
  await signOut();
}

