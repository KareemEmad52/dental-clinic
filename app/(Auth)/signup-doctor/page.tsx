import DoctorSignupForm from "@/components/Auth/SignupAsDoctor"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dentaire - Dentist & Dental Clinic",
  description: "Signup to Dentaire",
}
 
export default function Page() {
  return (
      <DoctorSignupForm />
  )
} 