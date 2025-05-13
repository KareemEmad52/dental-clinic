"use client";

import { ActionResponse, DoctorAppointmentsResponseData } from "@/types/types";
import { doctorAppointments } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import DoctorAppointmentHeader from "./Doctor AppointmentHeader";
import { BookOpen, Clock, Trophy, History as HistoryIcon, Calendar, CheckCircle, Activity, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import motion from "framer-motion";
import { StatCard } from "./statCard";
import { Separator } from "@radix-ui/react-select";
import { Spinner } from "../Spinner";

interface AppointmentStatistics {
  total: number;
  completed: number;
  confirmed: number;
  cancelled: number;
  scheduled: number;
}


export default function DoctorAppointments() {

  const { data, isLoading } = useQuery<ActionResponse<DoctorAppointmentsResponseData>>({
    queryKey: ["doctor-appointments"],
    queryFn: doctorAppointments
  })


  console.log(data);


  const statistics: AppointmentStatistics = data?.data?.statistics || {
    total: 0,
    completed: 0,
    confirmed: 0,
    cancelled: 0,
    scheduled: 0
  };


  if(isLoading) {
    return (
      <div className="container space-y-4 flex items-center justify-center">
        <Spinner className="w-16 h-16" variant="primary" />
      </div>
    )
  }




  return (
    <div className="container space-y-4">
      <DoctorAppointmentHeader />
      <Separator />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Appointments"
          value={statistics.total}
          icon={<Calendar className="h-5 w-5" />}
          description="Total number of appointments"
          isLoading={isLoading}
        />
        <StatCard
          title="Scheduled"
          value={statistics.scheduled || 0}
          icon={<Clock className="h-5 w-5" />}
          description="Upcoming appointments"
          isLoading={isLoading}
        />


        <StatCard
          title="Confirmed"
          value={statistics.confirmed || 0}
          icon={<CheckCircle className="h-5 w-5" />}
          description="Ready for consultation"
          isLoading={isLoading}
        />

        <StatCard
          title="Completed"
          value={statistics.completed || 0}
          icon={<Activity className="h-5 w-5" />}
          description="Successfully conducted"
          isLoading={isLoading}
        />

        <StatCard
          title="Cancelled"
          value={statistics.cancelled || 0}
          icon={<XCircle className="h-5 w-5" />}
          description="Did not take place"
          isLoading={isLoading}

        />

      </div>
      {/* <Separator /> */}
      <DataTable data={Array.isArray(data?.data?.appointments) ? data.data.appointments : []} columns={columns} />
    </div>
  );
}