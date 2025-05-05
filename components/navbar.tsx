import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton/animated-Button";
import { auth } from "@/lib/auth";
import { UserAvatar } from "./user-avatar";
import SideBarToggleIcon from "./sidebar-toggle";

export default async function Navbar() {
  const session = await auth()
  return (
    <nav className="border-b border-spacing-0.5 border-[#0E384C1A] py-[30px]  ">
      <div className="container flex  items-center justify-between lg:justify-center gap-5">
        <Link href='/'>
          <Image src="/logo.svg" width={190} height={50} alt="logo" />
        </Link>

        <div className=" justify-between items-center flex-1 hidden lg:flex">
          <div className=" flex-1 text-center">
            <ul className="flex justify-center items-center gap-10">
              <li>
                <Link href="/" className="text-mainDark text-md font-medium font-poppins hover:text-mainLight transition-all duration-500 ">Home</Link>
              </li>
              <li>
                <Link href="/" className="text-mainDark text-md font-medium font-poppins hover:text-mainLight transition-all duration-500 ">About us</Link>
              </li>
              <li>
                <Link href="/" className="text-mainDark text-md font-medium font-poppins hover:text-mainLight transition-all duration-500 ">Contact</Link>
              </li>
              <li>
                <Link href="/" className="text-mainDark text-md font-medium font-poppins hover:text-mainLight transition-all duration-500 ">Page</Link>
              </li>
              <li>
                <Link href="/" className="text-mainDark text-md font-medium font-poppins hover:text-mainLight transition-all duration-500 ">Footer</Link>
              </li>
            </ul>
          </div>
          {session?.user? <div>
            <UserAvatar />
          </div> : <Link href="/login"> 
          <AnimatedButton text="Book Appointment" /> 
          </Link>}
          
        </div>

        <div className="lg:hidden flex items-center justify-center gap-2">
          <UserAvatar />
          <SideBarToggleIcon />
        </div>
      </div>
    </nav>
  )
}