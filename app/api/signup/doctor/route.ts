import prisma from "@/lib/prisma";
import { doctorSignupSchema } from "@/utils/validations";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { errors: [{ field: "body", message: "Request body is required or malformed" }] },
        { status: 400 }
      );
    }

    // Validate request body using Zod schema
    const parsed = doctorSignupSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { email, name, password, specialty, qualifications, bio, photoUrl } =
      parsed.data;

    // check if the email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { errors: [{ field: "email", message: "Email already Exists" }] },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User and DoctorProfile in a transaction
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "DOCTOR",
        doctorProfile: {
          create: {
            specialty,
            qualifications,
            bio,
            photoUrl:"https://res.cloudinary.com/dnsvisuww/image/upload/v1746280828/jugtbfc50my68ktbwc73.jpg",
          },
        },
      },
      include: { doctorProfile: true },
    });

    return NextResponse.json({
      message: "Doctor signed up successfully",
      data: user
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { errors: [{ field: "server", message: "Internal server error" }] },
      { status: 500 }
    );
  }
}
