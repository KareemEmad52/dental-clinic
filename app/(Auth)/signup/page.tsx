import SignupForm from "@/components/Auth/SignupForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dentaire - Dentist & Dental Clinic",
  description: "Login",
}
 
export default function Signup() {
  return (
      <SignupForm />
  )
} 