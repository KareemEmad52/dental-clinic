import { GetDoctorInfoResponse } from "@/types/types";
import axios from "axios";


export const getDoctorInfo = async (): Promise<GetDoctorInfoResponse> =>{
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/profile`);
  return res.data
}