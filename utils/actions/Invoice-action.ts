"use server";

import { auth } from "@/lib/auth";
import { actionError, actionSuccess } from "../response";
import prisma from "@/lib/prisma";
import { AppointmentStatus, InvoiceStatus } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";

export async function UpdateInvoiceStatus(id: string) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "PATIENT") {
      return actionError("Unauthorized: Must be a patient", null, 401);
    }

    const existInvoice = await prisma.invoice.findUnique({
      where: { id: id },
    });
    if (!existInvoice) {
      return actionError("Invoice not found", null, 404);
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id: id },
      data: {
        status: InvoiceStatus.PAID,
        paidAt: new Date(),
        appointment: {
          update: {
            status: AppointmentStatus.CONFIRMED,
          },
        },
      },
      include: {
        appointment: {
          include: {
            service: true,
            doctor: true,
          },
        },
        user: true,
      },
    });

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/send-booking-email`,
      {
        to: updatedInvoice.user.email,
        date: format(updatedInvoice.appointment.startTime, "PPP"),
        time: format(updatedInvoice.appointment.startTime, "hh:mm a"),
        service: updatedInvoice.appointment.service.name,
        dentist: updatedInvoice.appointment.doctor.name,
        location: "BrightSmile Dental - Downtown",
        address: "123 Main Street, Suite 200, Cityville, ST 12345",
        patientName: updatedInvoice.user.name,
        bookingId: updatedInvoice.appointment.id,
      }
    );

    return actionSuccess("Invoice updated successfully", updatedInvoice);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update invoice", error, 500);
  }
}
