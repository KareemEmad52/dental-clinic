import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { actionError, actionSuccess } from "@/utils/response";
import { availabilityQuerySchema } from "@/utils/validations";
import { Role } from "@prisma/client";
import {
  addMinutes,
  endOfDay,
  isWithinInterval,
  parse,
  startOfDay,
  isEqual,
} from "date-fns";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        actionError("Unauthorized: Must be a patient", null, 401),
        { status: 401 }
      );
    }

    // validate doctorsId
    const { id: doctorId } = await params;
    if (!doctorId) {
      return NextResponse.json(actionError("Invalid doctorsId", null, 400), {
        status: 400,
      });
    }

    // parse and validate the Query params
    const { searchParams } = new URL(req.url);
    const query = {
      date: searchParams.get("date"),
      serviceId: searchParams.get("serviceId"),
    };

    const parsed = availabilityQuerySchema.safeParse(query);
    if (!parsed.success) {
      const error = parsed.error.errors[0]?.message;
      return NextResponse.json(
        actionError(error || "Invalid query parameters", null, 400),
        { status: 400 }
      );
    }

    const { date, serviceId } = parsed.data;

    // Check if doctor exists and has DOCTOR role
    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
    });
    if (!doctor || doctor.role !== "DOCTOR") {
      return NextResponse.json(actionError("Invalid doctor", null, 400), {
        status: 400,
      });
    }

    // Check if service exists and get duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      return NextResponse.json(actionError("Invalid service", null, 400), {
        status: 400,
      });
    }

    // Parse date in UTC explicitly
    const targetDate = parse(date, "yyyy-MM-dd", new Date());
    // Create a UTC date for 2025-05-09 00:00:00 UTC
    const utcTargetDate = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()));

    // Define working hours in UTC
    const startOfWork = new Date(utcTargetDate);
    startOfWork.setUTCHours(9, 0, 0, 0); // 9 AM UTC
    const endOfWork = new Date(utcTargetDate);
    endOfWork.setUTCHours(17, 0, 0, 0); // 5 PM UTC

    // Fetch doctor's appointments for the day
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        startTime: {
          gte: startOfDay(utcTargetDate),
          lte: endOfDay(utcTargetDate),
        },
      },
      select: { startTime: true, endTime: true },
    });

    // Generate 30-minute slots within working hours
    const slots: string[] = [];
    let currentTime = startOfWork;

    while (currentTime < endOfWork) {
      const slotEnd = addMinutes(currentTime, service.duration);

      // Check if slot is within working hours
      if (slotEnd > endOfWork) break;

      // Check for overlaps with existing appointments
      const isAvailable = !appointments.some(
        (appt) => {
          // Exclude exact start time overlap and allow slot to start at end time
          const startsDuringAppointment = isWithinInterval(currentTime, {
            start: appt.startTime,
            end: appt.endTime,
          }) && !isEqual(currentTime, appt.endTime);
          const endsDuringAppointment = isWithinInterval(slotEnd, {
            start: appt.startTime,
            end: appt.endTime,
          }) && !isEqual(slotEnd, appt.startTime);
          const spansAppointment = currentTime < appt.startTime && slotEnd > appt.endTime;

          return startsDuringAppointment || endsDuringAppointment || spansAppointment;
        }
      );

      if (isAvailable) {
        slots.push(currentTime.toISOString());
      }

      currentTime = addMinutes(currentTime, service.duration);
    }

    // Add slot starting at the last appointment's end time if available
    const lastAppointmentEnd = appointments.length > 0 ? Math.max(...appointments.map(a => a.endTime.getTime())) : startOfWork.getTime();
    const potentialSlotStart = new Date(lastAppointmentEnd);
    if (potentialSlotStart >= startOfWork && potentialSlotStart < endOfWork) {
      const slotEnd = addMinutes(potentialSlotStart, service.duration);
      if (slotEnd <= endOfWork) {
        const isAvailable = !appointments.some(
          (appt) => {
            const startsDuringAppointment = isWithinInterval(potentialSlotStart, {
              start: appt.startTime,
              end: appt.endTime,
            }) && !isEqual(potentialSlotStart, appt.endTime);
            const endsDuringAppointment = isWithinInterval(slotEnd, {
              start: appt.startTime,
              end: appt.endTime,
            }) && !isEqual(slotEnd, appt.startTime);
            const spansAppointment = potentialSlotStart < appt.startTime && slotEnd > appt.endTime;

            return startsDuringAppointment || endsDuringAppointment || spansAppointment;
          }
        );
        if (isAvailable && !slots.some(slot => slot === potentialSlotStart.toISOString())) {
          slots.push(potentialSlotStart.toISOString());
        }
      }
    }

    // Sort slots to ensure chronological order
    slots.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return NextResponse.json(actionSuccess("success", slots));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      actionError("Failed to fetch availability", error, 500)
    );
  }
}