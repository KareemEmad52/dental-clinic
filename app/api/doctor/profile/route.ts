import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { doctorProfileUpdateSchema } from "@/utils/validations";
import { exclude } from "@/utils/exclude";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();  
  if (!session || !session.user || session.user.role !== Role.DOCTOR) {
    return NextResponse.json(
      {
        errors: [{ field: "auth", message: "Unauthorized: Must be a doctor" }],
      },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { doctorProfile: true },
  });

  if (!user || !user.doctorProfile) {
    return NextResponse.json(
      { errors: [{ field: "profile", message: "Profile not found" }] },
      { status: 404 }
    );
  }

  const safeUser = exclude(user, ["password"]);

  return NextResponse.json({
    message: "success",
    data: safeUser,
  });
}
