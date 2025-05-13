import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { actionError, actionSuccess } from "@/utils/response";
import { AppointmentStatus, Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Authentication check
    const session = await auth();
    if (!session || !session.user || session.user.role !== Role.DOCTOR) {
      return NextResponse.json(
        actionError("Unauthorized: Must be a patient", null, 401),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const getStats = searchParams.get("stats") === "true";

    const whereClause: any = { doctorId: session.user.id };

    if (status) {
      whereClause.status = status;
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: { select: { name: true, email: true } },
        service: { select: { name: true, price: true, duration: true } },
      },
      orderBy: { startTime: "asc" },
    });

    // Calculate statistics if requested
    let statistics = {};

    if (getStats) {
      const allAppointments = status
        ? appointments
        : await prisma.appointment.findMany({
            where: { doctorId: session.user.id },
            select: { status: true },
          });


          

      // Count appointments by status
      const totalCount = allAppointments.length;
      const completedCount = allAppointments.filter(
        (a) => a.status === AppointmentStatus.COMPLETED
      ).length;
      const confirmedCount = allAppointments.filter(
        (a) => a.status === AppointmentStatus.CONFIRMED
      ).length;
      const cancelledCount = allAppointments.filter(
        (a) => a.status === AppointmentStatus.CANCELLED
      ).length;
      const scheduledCount = allAppointments.filter(
        (a) => a.status === AppointmentStatus.SCHEDULED
      ).length;

      statistics = {
        total: totalCount,
        completed: completedCount,
        confirmed: confirmedCount,
        cancelled: cancelledCount,
        scheduled: scheduledCount,
      };
    }

    return NextResponse.json(
      actionSuccess("success", { appointments, statistics })
    );
  } catch (error) {
    return NextResponse.json(
      actionError("Failed to fetch appointments", error, 500)
    );
  }
}
