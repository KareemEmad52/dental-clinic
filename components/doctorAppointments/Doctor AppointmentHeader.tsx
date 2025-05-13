"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start below and invisible
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };


export default function DoctorAppointmentHeader() {
    return <>
        <motion.div
            className="w-full flex justify-center items-center gap-2 "
            variants={itemVariants}
        >
            <Image src="/icon-sub-heading.svg" width={15} height={15} alt="star Icon" />
            <h3 className="capitalize font-poppins text-mainLight font-medium">
                Booking
            </h3>
        </motion.div>
        <h1 className="font-poppins text-2xl md:text-4xl font-bold text-center capitalize">Manage your <span className="text-mainLight">appointment</span></h1>
    </>
}