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

