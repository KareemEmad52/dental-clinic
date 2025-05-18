import DoctorAppointments from "@/components/doctorAppointments/DoctorAppointments";
import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Doctor Appointments",
  description: "Doctor Appointments Page",
};

export default async function Page() {
  const session = await auth()

    
    if(  session?.user && session?.user.role !== Role.DOCTOR) {
        redirect('/')
    }
  
  return (
    <div className="min-h-screen flex justify-center items-center my-8">
      <DoctorAppointments />
    </div>
  );
}
