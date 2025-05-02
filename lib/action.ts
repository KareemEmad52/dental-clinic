"use server";

import { z } from "zod";
import { signIn, signOut } from "./auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";
import { LoginSchema } from "./validations";

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
      redirect: false,
    });

    if (result?.error) {
      console.error("Auth.js error:", result.error);
      return { error: result.error || "Invalid password" };
    }

    return { success: true , data: result };
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }
    
    // Handle Auth.js CallbackRouteError
    if (error.type === "CallbackRouteError" && error.cause) {
      console.error("Auth.js error:", error.cause.err);
      return { error: error.cause.err.message || "Invalid password" };
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

    console.log(process.env.HASH_SECRET_ROUND);

    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_SECRET_ROUND as string)
    );

    const user = await prisma.user.create({
      data: {
        email,
        name: username,
        password: hashPassword,
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
  await signOut()
}