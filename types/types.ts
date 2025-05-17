import { AppointmentStatus, Service } from "@prisma/client";

export interface GetDoctorInfoResponse {
  message: string;
  data: User;
}

export interface GetUserInfoResponse {
  message: string;
  data: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: any;
  role: string;
  image: any;
  phone: string;
  address: any;
  gender: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  doctorProfile: DoctorProfile;
}

export interface DoctorProfile {
  id: string;
  userId: string;
  specialty: string;
  qualifications: string;
  bio: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type globalError = {
  errors: {
    field: string;
    message: string;
  }[];
};

export type ActionResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  code?: number;
};

export type DoctorAppointmentsResponseData = {
  appointments: {
    id: string;
    patientId: string;
    doctorId: string;
    serviceId: string;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    notes: any;
    createdAt: string;
    updatedAt: string;
    patient: Partial<User>;
    service: Partial<Service>;
  };
  statistics: {
    total: number;
    completed: number;
    confirmed: number;
    cancelled: number;
    scheduled: number;
  };
};

export type GetPatientAppointmentsResponse = {
  id: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: any;
  createdAt: string;
  updatedAt: string;
  service: {
    name: string;
    description: string;
    price: number;
    duration: number;
  };
  doctor: {
    name: string;
    email: string;
    image: string;
    doctorProfile: {
      specialty: string;
      bio: string;
      qualifications: string;
      photoUrl: string;
    };
  };
};

export type PatientInvoices = {
  id: string;
  amount: number;
  issuedAt: string;
  paidAt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  appointment: {
    startTime: string;
    service: {
      name: string;
      price: number;
      duration: number;
    };
    doctor: {
      name: string;
      email: string;
    };

    patient: {
      name: string;
      email: string;
    };
  };
};
