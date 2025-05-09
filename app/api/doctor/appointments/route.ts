import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { actionError, actionSuccess } from "@/utils/response";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Authentication check
        const session = await auth();
        if (!session || !session.user || session.user.role !== Role.DOCTOR) {
            return NextResponse.json(actionSuccess("Unauthorized: Must be a doctor", null, 401),
                { status: 401 }
            );
        }
        const appiontments = await prisma.appointment.findMany({
            where: { doctorId: session.user.id },
            include: {
                patient: { select: { name: true, email: true } },
                service: { select: { name: true, price: true, duration: true } }
            },
            orderBy: { startTime: "asc" }
        })
        return NextResponse.json(actionSuccess("success", appiontments));
    } catch (error) {
        return NextResponse.json(actionError("Failed to fetch appointments", error, 500));
    }
}