import HomePage from "@/components/home/home";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Dentaire - Dentist & Dental Clinic",
    description: "Home",
}

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
