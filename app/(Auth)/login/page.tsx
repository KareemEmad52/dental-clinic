import LoginForm from "@/components/Auth/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dentaire - Dentist & Dental Clinic",
  description: "Login",
}
 
export default function Login() {
  return (
      <LoginForm />
  )
} 