import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { exclude } from "@/utils/exclude";
import { actionError, actionSuccess } from "@/utils/response";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();  
  if (!session || !session.user || session.user.role !== Role.PATIENT) {
    return NextResponse.json(
      actionError("Unauthorized: Must be a patient", null, 401),
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user ) {
    return NextResponse.json(
      actionError("Profile not found", null, 404),
      { status: 404 }
    );
  }

  const safeUser = exclude(user, ["password"]);

  return NextResponse.json(actionSuccess("success", safeUser));
}
