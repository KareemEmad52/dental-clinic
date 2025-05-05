import HomePage from "@/components/home/home";
import Navbar from "@/components/navbar";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Dentaire - Dentist & Dental Clinic",
    description: "Home",
}

export default function Home() {
  return (
    <>
    <div className="w-full ">
      {/* <Navbar /> */}
      <HomePage />
    </div>
    </>
  );
}
