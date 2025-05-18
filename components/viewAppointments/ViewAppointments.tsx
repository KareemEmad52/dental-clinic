"use client";


import { DataTable } from "@/components/doctorAppointments/data-table";
import { ActionResponse, GetPatientAppointmentsResponse } from "@/types/types";
import { patientAppointments } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@/components/Spinner";
import { Patientcolumns } from "../profile/appoitment/PatientTablecolumns";
import Image from "next/image";

export function ViewAppointmentsPage() {

  const { data, isLoading } = useQuery<ActionResponse<GetPatientAppointmentsResponse[]>>({
    queryKey: ['patient-appointments'],
    queryFn: patientAppointments
  })


  if (isLoading) {
    return (
      <div className="container space-y-4 flex items-center justify-center">
        <Spinner className="w-16 h-16" variant="primary" />
      </div>
    )
  }


  return <>

    <div
      className="w-full flex justify-center items-center gap-1 "
    >
      <Image src="/icon-sub-heading.svg" width={15} height={15} alt="star Icon" />
      <h3 className="capitalize font-poppins text-mainLight font-medium">
        Appointments
      </h3>
    </div>
    <h1 className="font-poppins text-2xl md:text-4xl font-bold text-center capitalize">View Your <span className="text-mainLight">Appointments</span></h1>
    <div className="container">
      <DataTable data={data?.data || []} columns={Patientcolumns} initialSorting={[{ id: 'createdAt', desc: true }]} />
    </div>

  </>
}