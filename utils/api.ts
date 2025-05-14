import {
  ActionResponse,
  GetDoctorInfoResponse,
  GetPatientAppointmentsResponse,
  GetUserInfoResponse,
  User,
} from "@/types/types";
import { Service } from "@prisma/client";
import axios from "axios";

export const getDoctorInfo = async (): Promise<GetDoctorInfoResponse> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/profile`
  );
  return res.data;
};

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`);
  return res.data;
};

export const getAllDoctors = async (): Promise<ActionResponse<User[]>> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/getAllDoctors`
  );
  return res.data;
};

export const getAllServices = async (): Promise<ActionResponse<Service[]>> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/services/getAllServices`
  );
  return res.data;
};

export const getAvailability = async ({
  doctorId,
  date,
  serviceId,
}: {
  doctorId: string;
  date: string;
  serviceId: string;
}): Promise<ActionResponse<string[]>> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${doctorId}/availability?date=${date}&serviceId=${serviceId}`
  );
  return res.data;
};

export const doctorAppointments = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/appointments?stats=true`
  );
  return res.data;
};

export const patientAppointments = async (): Promise<ActionResponse<GetPatientAppointmentsResponse[]>> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/appointments`
  );
  return res.data;
};