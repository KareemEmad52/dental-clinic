import HomePage from "@/components/home/home";
import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Dentaire - Dentist & Dental Clinic",
    description: "Home",
}

export default async function Home() {
  const sessoin = await auth();
  
  return (
    <>
    <div className="w-full ">
      {/* <Navbar /> */}
      <HomePage />
    </div>
    </>
  );
}
