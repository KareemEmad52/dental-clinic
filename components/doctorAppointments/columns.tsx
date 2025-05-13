"use client"

import { DoctorAppointmentsResponseData } from "@/types/types"
import { truncateLongWords } from "@/utils/transcate-words"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowUpDown, Calendar, Check, Circle, CircleCheck, LucideChevronsUpDown, MoreHorizontal, X } from "lucide-react"
import { Badge } from "../ui/badge"
import { stat } from "fs"
import { AppointmentStatus } from "@prisma/client"
import { JSX } from "react"
import { format } from "date-fns"
import { Checkbox } from "../ui/checkbox"
import { UpdateStatus } from "./updateStatus"


export const columns: ColumnDef<DoctorAppointmentsResponseData["appointments"]>[] = [
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
    accessorKey: "patient.name",
    header: "Patient Name",
    cell: ({ row }) => {
      const name: string = row.original.patient.name as string
      return <div>{name?.split(" ").slice(0, 2).join(" ")}</div>
    }
  },
  {
    accessorKey: "patient.email",
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
      return (
        <UpdateStatus appointment={row.original}/>
      )
    },
  },
]
