import { Gender } from "@prisma/client";
import { z } from "zod";
import { parse } from "date-fns";


export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const doctorSignupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be 100 characters or less" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be 100 characters or less" }),
  specialty: z
    .string()
    .min(1, { message: "Specialty is required" })
    .max(100, { message: "Specialty must be 100 characters or less" }),
  qualifications: z
    .string()
    .min(1, { message: "Qualifications are required" })
    .max(500, { message: "Qualifications must be 500 characters or less" }),
  bio: z
    .string()
    .max(1000, { message: "Bio must be 1000 characters or less" })
    .min(1, { message: "Bio is required" }),
  photoUrl: z
    .string()
    .url({ message: "Invalid URL format" })
    .max(500, { message: "Photo URL must be 500 characters or less" })
    .optional(),
});

export const doctorProfileUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name must be 100 characters or less" })
      .optional(),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .max(255, { message: "Email must be 255 characters or less" })
      .optional(),
    specialty: z
      .string()
      .min(1, { message: "Specialty is required" })
      .max(100, { message: "Specialty must be 100 characters or less" })
      .optional(),
    qualifications: z
      .string()
      .min(1, { message: "Qualifications are required" })
      .max(500, { message: "Qualifications must be 500 characters or less" })
      .optional(),
    bio: z
      .string()
      .max(1000, { message: "Bio must be 1000 characters or less" })
      .optional(),
    photoUrl: z
      .string()
      .url({ message: "Invalid URL format" })
      .max(500, { message: "Photo URL must be 500 characters or less" })
      .optional(),
    phone: z
      .string()
      .min(10, { message: "Phone number is required" })
      .max(11, { message: "Phone number must be 11 characters " })
      .optional(),
    address: z
      .string()
      .min(1, { message: "Address is required" })
      .max(100, { message: "Address must be 100 characters or less" })
      .optional(),
    gender: z
      .enum([Gender.MALE, Gender.FEMALE], { message: "Gender is required" })
      .optional(),
    dob: z.coerce
      .date({
        required_error: "Date is required",
        invalid_type_error: "Invalid date",
      })
      .optional(),
  })
  .strict();

export const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



export const patientProfileUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name must be 100 characters or less" })
      .optional(),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .max(255, { message: "Email must be 255 characters or less" })
      .optional(),
    phone: z
      .string()
      .min(10, { message: "Phone number is required" })
      .max(11, { message: "Phone number must be 11 characters " })
      .optional(),
    address: z
      .string()
      .min(1, { message: "Address is required" })
      .max(100, { message: "Address must be 100 characters or less" })
      .optional(),
    gender: z
      .enum([Gender.MALE, Gender.FEMALE], { message: "Gender is required" })
      .optional(),
    dob: z.coerce
      .date({
        required_error: "Date is required",
        invalid_type_error: "Invalid date",
      })
      .optional(),
  })
  .strict();



export const availabilityQuerySchema = z.object({
  date: z.string().refine((val) => {
    const date = parse(val, "yyyy-MM-dd", new Date());
    return !isNaN(date.getTime());
  }, { message: "Invalid date format (use YYYY-MM-DD)" }),
  serviceId: z.string().min(1, { message: "Service ID is required" }),
});


export const bookAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Please select a doctor"),
  serviceId: z.string().min(1, "Please select a service"),
  date: z.coerce
  .date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  startTime: z.string().min(1, "Please select a time"),
});


export const MakeAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Please select a doctor"),
  serviceId: z.string().min(1, "Please select a service"),
  startTime: z.coerce
  .date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
});

 