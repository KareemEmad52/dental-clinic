"use server"

import { updatePatientType } from "@/components/profile/updatePatient";
import { actionError, actionSuccess } from "../response";
import { MakeAppointmentSchema, patientProfileUpdateSchema } from "../validations";
import prisma from "@/lib/prisma";
import { exclude } from "../exclude";
import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function updatePatientInfo(data: Partial<updatePatientType>) {
    try {
        // Check if the user is authenticated and has the role of "doctor"
        const session = await auth();


        

        if (!session || !session.user || session.user.role !== Role.PATIENT) {
            return actionError("Unauthorized: Must be a doctor", {message: " Auth error"}, 401);
        }

        // Validate the input data
        const parsedBody = patientProfileUpdateSchema.safeParse(data);
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

        // Check if user exists
        const existingProfile = await prisma.user.findUnique({
            where: { id: session.user.id },
        });
        if (!existingProfile) {
            return actionError("User not found", null, 404);
        }

        // Update the user
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name: parsedBody.data.name,
                email: parsedBody.data.email,
                phone: parsedBody.data.phone,
                address: parsedBody.data.address,
                gender: parsedBody.data.gender,
                dateOfBirth: parsedBody.data.dob,
            },
        });

        // Exclude sensitive fields
        const safeUser = exclude(updatedUser, ["password"]);

        // Return success response
        return actionSuccess("Profile updated successfully", safeUser);
    } catch (error) {
        console.error("UpdateDoctorInfo error:", error);
        return actionError("Failed to update profile", error, 500);
    }
}


export async function MakeAppointment(data: {doctorId: string, serviceId: string, startTime: string}){
    try {
        const session = await auth();
        if (!session || !session.user || session.user.role !== Role.PATIENT) {
            return actionError("Unauthorized: Must be a doctor", {message: " Auth error"}, 401);
        }


        const parsedBody = MakeAppointmentSchema.safeParse(data);
        if (!parsedBody.success) {
            const error = parsedBody.error.errors[0]?.message;
            return actionError(error || "Invalid data", null, 400);
        }

        const {doctorId, serviceId, startTime} = parsedBody.data;

        // check if the service is available
        const service = await prisma.service.findUnique({
            where: { id: serviceId },
          });
          if (!service) {
            return actionError("Service not found", null, 404);
          }

        const existingAppointment = await prisma.appointment.findUnique({
            where: {
              doctorId_serviceId_startTime: {
                doctorId,
                serviceId,
                startTime,
              },
            },
          });
          
          if (existingAppointment) {
            return actionError("Appointment already exists", null, 400);
          }


          const endTime = new Date(startTime.getTime() + service.duration * 60 * 1000);


          


          const newAppointment = await prisma.appointment.create({
            data: {
              patientId: session.user.id,
              doctorId,
              serviceId,
              startTime,
              endTime,
            },
          });
          

          const invoice = await prisma.invoice.create({
            data: {
              appointmentId: newAppointment.id,
              userId: session.user.id,
              amount: service.price,
              issuedAt: new Date(),
            },
          });

          return actionSuccess("Appointment made successfully", newAppointment);



    } catch (error) {
        console.error("MakeAppointment error:", error);
        return actionError("Failed to make appointment", error, 500);
    }
}