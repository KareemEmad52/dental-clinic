"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  doctorProfileUpdateSchema,
  doctorSignupSchema,
  updatePasswordSchema,
} from "@/utils/validations";
import { exclude } from "../exclude";
import { updateDoctorType } from "@/components/profile/UpdateDoctorForm";
import { AppointmentStatus, InvoiceStatus, Providers, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ActionResponse } from "@/types/types";
import { actionError, actionSuccess } from "../response";
import { z } from "zod";
import { updateStatusSchema } from "@/components/doctorAppointments/updateStatus";
import axios from "axios";
import { format } from "date-fns";

export async function SignupDoctor(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  const parsed = doctorSignupSchema.safeParse(rawData);

  if (!parsed.success) {
    const error = parsed.error.errors[0]?.message;
    return actionError(error || "Invalid data", null, 400);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/signup/doctor`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return actionError(
        data.error.message || "Something went wrong",
        null,
        500
      );
    }

    return actionSuccess("Account created successfully!", data);
  } catch (error) {
    console.error("Signup error:", error);
    return actionError("Something went wrong", null, 500);
  }
}

export async function updateDoctorInfo(data: Partial<updateDoctorType>) {
  try {
    // Check if the user is authenticated and has the role of "doctor"
    const session = await auth();

    if (!session || !session.user || session.user.role !== Role.DOCTOR) {
      return actionError("Unauthorized: Must be a doctor", null, 401);
    }

    // Validate the input data
    const parsedBody = doctorProfileUpdateSchema.safeParse(data);
    if (!parsedBody.success) {
      const error = parsedBody.error.errors[0]?.message;
      return actionError(error || "Invalid data", null, 400);
    }

    // Check if email is already in use by another doctor
    if (parsedBody.data.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: parsedBody.data.email },
      });
      if (existingEmail && existingEmail.id !== session.user.id) {
        return actionError("Email already in use", null, 400);
      }
    }

    // Check if phone is already in use by another doctor
    if (parsedBody.data.phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone: parsedBody.data.phone },
      });
      if (existingPhone && existingPhone.id !== session.user.id) {
        return actionError("Phone already in use", null, 400);
      }
    }

    // Check if DoctorProfile exists
    const existingProfile = await prisma.doctorProfile.findUnique({
      where: { userId: session.user.id },
    });
    if (!existingProfile) {
      return actionError("Doctor profile not found", null, 404);
    }

    // Update the user and doctor profile in a transaction
    const [updatedUser, updatedProfile] = await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: parsedBody.data.name,
          email: parsedBody.data.email,
          phone: parsedBody.data.phone,
          address: parsedBody.data.address,
          gender: parsedBody.data.gender,
          dateOfBirth: parsedBody.data.dob,
        },
        include: { doctorProfile: true },
      }),
      prisma.doctorProfile.update({
        where: { userId: session.user.id },
        data: {
          specialty: parsedBody.data.specialty,
          qualifications: parsedBody.data.qualifications,
          bio: parsedBody.data.bio,
          photoUrl: parsedBody.data.photoUrl,
        },
      }),
    ]);

    // Exclude sensitive fields
    const safeUser = exclude(updatedUser, ["password"]);

    // Return success response
    return actionSuccess("Profile updated successfully", safeUser);
  } catch (error) {
    console.error("UpdateDoctorInfo error:", error);
    return actionError("Failed to update profile", error, 500);
  }
}

export async function updateDoctorPassword(
  data: z.infer<typeof updatePasswordSchema>
): Promise<ActionResponse> {
  try {
    // Authentication check
    const session = await auth();
    if (!session?.user) {
      return actionError("Unauthorized: Must be a doctor", null, 401);
    }

    if (
      !session.user.provider ||
      session.user.provider !== Providers.CREDENTIALS
    ) {
      return actionError("Must be login with credentials", null, 401);
    }

    // Validation
    const validation = updatePasswordSchema.safeParse(data);
    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message;
      return actionError(firstError || "Invalid data");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validation.data.newPassword, 12);

    // Update in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return actionSuccess("Password updated successfully");
  } catch (error) {
    return actionError("Failed to update password", error, 500);
  }
}

export async function updateAppointmentStatus(
  newStatus: AppointmentStatus,
  appointmentId: string
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== Role.DOCTOR) {
      return actionError("Unauthorized: Must be a doctor", null, 401);
    }

    const existDoctor = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!existDoctor) {
      return actionError("Doctor not found", null, 404);
    }

    const existAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });
    if (!existAppointment) {
      return actionError("Appointment not found", null, 404);
    }

    // First update the appointment status in all cases
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: newStatus },
      include: {
        patient: true,
        doctor: true,
        service: true,
      },
    });

    if (newStatus === "CONFIRMED") {
      try {
        // Send email confirmation to patient
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/send-booking-email`,
          {
            to: updatedAppointment.patient.email,
            date: format(updatedAppointment.startTime, "PPP"),
            time: format(updatedAppointment.startTime, "hh:mm a"),
            service: updatedAppointment.service.name,
            dentist: updatedAppointment.doctor.name,
            location: "BrightSmile Dental - Downtown",
            address: "123 Main Street, Suite 200, Cityville, ST 12345",
            patientName: updatedAppointment.patient.name,
            bookingId: updatedAppointment.id,
          }
        );
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Continue execution - don't fail the whole operation if just the email fails
      }

      // Check for existing invoice
      const existingInvoice = await prisma.invoice.findFirst({
        where: { 
          appointmentId: updatedAppointment.id 
        }
      });

      if (!existingInvoice) {
        // Create new invoice if none exists
        await prisma.invoice.create({
          data: {
            userId: updatedAppointment.patient.id,
            amount: updatedAppointment.service.price,
            appointmentId: updatedAppointment.id,
            issuedAt: new Date(),
            status: InvoiceStatus.PAID, 
          },
        });
      } else {
        // Update existing invoice to paid
        await prisma.invoice.update({
          where: { id: existingInvoice.id },
          data: {
            status: InvoiceStatus.PAID,
          },
        });
      }
    }

    return actionSuccess("Status updated successfully", updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return actionError("Failed to update status", error, 500);
  }
}