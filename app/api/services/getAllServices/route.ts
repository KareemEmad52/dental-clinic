import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { actionError, actionSuccess } from "@/utils/response";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session || !session.user || session.user.role !== Role.PATIENT) {
            return NextResponse.json(actionError("Unauthorized: Must be a patient", null, 401),
                { status: 401 }
            );
        }

        const services = await prisma.service.findMany()

        return NextResponse.json(actionSuccess("success", services));

    } catch (error) {
        console.log(error);
        return NextResponse.json(actionError("Failed to fetch services", error, 500));
    }
}