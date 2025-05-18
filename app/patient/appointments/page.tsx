import { AppointmentTable } from '@/components/profile/appoitment/appointmentTable'
import { ViewAppointmentsPage } from '@/components/viewAppointments/ViewAppointments'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

const metadata: Metadata = {
  title: "Dentaire - Dentist & Dental Clinic",
  description: "Patient Appointments Page",
}

export default async function Page() {
  return (
    <div className="min-h-[90vh] md:container w-full flex flex-col gap-5 justify-center items-center my-8">
    <ViewAppointmentsPage />
    </div>
  )
}
