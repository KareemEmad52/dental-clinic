import SignupForm from "@/components/Auth/SignupForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dentaire - Dentist & Dental Clinic",
  description: "Signup to Dentaire",
}
 
export default function Signup() {
  return (
      <SignupForm />
  )
} 