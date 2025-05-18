"use client"

import { PatientInvoices } from "@/types/types"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../ui/button"
import { LucideChevronsUpDown, MoreHorizontal } from "lucide-react"
import { Badge } from "../../ui/badge"
import { format } from "date-fns"
import { Checkbox } from "../../ui/checkbox"

import { BadgeSuccess } from "@/components/ui/BadgeSuccess"
import BadgePending from "@/components/ui/PendingBadge"
import { RedirectToPayment } from "./redirectToPayment"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"


export const Invoicescolumns: ColumnDef<PatientInvoices>[] = [
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
      const name: string = row.original.appointment.doctor.name as string
      return <div>{name?.split(" ").slice(0, 2).join(" ")}</div>
    }
  },
  {
    accessorKey: "appointment.doctor.email",
    header: "Email",
    id: "email",
  },
  {
    accessorKey: "appointment.service.name",
    header: "Service",
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status: string = row.original.status as string;
      let badgeColor: React.ReactNode;



      switch (status.toUpperCase()) {
        case "PAID":
          badgeColor = <BadgeSuccess text={status} />;
          break;
        case "PENDING":
          badgeColor = <BadgePending />;
          break;
        default:
          <Badge variant={"outline"} >
            {status}
          </Badge>; // Fallback for unexpected status
      }

      return (
        badgeColor
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
      return <div>{row.original.appointment.service.duration} min</div>
    },

  },
  {
    accessorKey: "createdAt",
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
      return <div>{format(new Date(row.original.appointment.startTime), "PPP")}</div>
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
            <Link href={`/invoice/payment/${payment.id}`}>
              <DropdownMenuItem>
                Pay Invoice
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={`/invoice/${payment.id}`}>
              <DropdownMenuItem>View Invoice</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
