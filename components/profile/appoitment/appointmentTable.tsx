"use client";


import { DataTable } from "@/components/doctorAppointments/data-table";
import { ActionResponse, GetPatientAppointmentsResponse } from "@/types/types";
import { patientAppointments } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Patientcolumns } from "./PatientTablecolumns";
import { Spinner } from "@/components/Spinner";

export function AppointmentTable() {

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
    <DataTable data={data?.data || []} columns={Patientcolumns} initialSorting={[{ id: 'createdAt', desc: true }]} />
  </>
}