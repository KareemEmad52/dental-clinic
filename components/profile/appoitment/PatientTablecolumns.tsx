"use client"

import { DoctorAppointmentsResponseData, GetPatientAppointmentsResponse } from "@/types/types"
import { truncateLongWords } from "@/utils/transcate-words"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../ui/button"
import { ArrowUpDown, Calendar, Check, Circle, CircleCheck, LucideChevronsUpDown, MoreHorizontal, X } from "lucide-react"
import { Badge } from "../../ui/badge"
import { stat } from "fs"
import { AppointmentStatus } from "@prisma/client"
import { JSX } from "react"
import { format } from "date-fns"
import { Checkbox } from "../../ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export const Patientcolumns: ColumnDef<GetPatientAppointmentsResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "doctor.name",
    header: "Doctor Name",
    cell: ({ row }) => {
      const name: string = row.original.doctor.name as string
      return <div>{name?.split(" ").slice(0, 2).join(" ")}</div>
    }
  },
  {
    accessorKey: "doctor.email",
    header: "Email",
    id: "email",
  },
  {
    accessorKey: "service.name",
    header: "Service",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.original.status as string;
      let badgeColor: string;

      switch (status.toUpperCase()) {
        case "SCHEDULED":
          badgeColor = "bg-blue-500 text-white";
          break;
        case "CONFIRMED":
          badgeColor = "bg-green-500 text-white";
          break;
        case "COMPLETED":
          badgeColor = "bg-gray-500 text-white";
          break;
        case "CANCELLED":
          badgeColor = "bg-red-500 text-white";
          break;
        default:
          badgeColor = "bg-gray-200 text-gray-800"; // Fallback for unexpected status
      }

      return (
        <Badge className={`capitalize ${badgeColor}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "service.duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
           className="flex items-center justify-between cursor-pointer w-full"
        >
          Duration
          <LucideChevronsUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div>{row.original.service.duration} min</div>
    },
    
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-between cursor-pointer w-full"
        >
          Date
          <LucideChevronsUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {      
      return <div>{format(new Date(row.original.startTime), "PPP")}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
