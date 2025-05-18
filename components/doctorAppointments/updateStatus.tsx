"use client"


import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { AppointmentStatus } from "@prisma/client";
import { CustomButton } from "../Cutsombutton";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { updateAppointmentStatus } from "@/utils/actions/Doctors-actions";
import toast from "react-hot-toast";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";


interface UpdateStatusProps {
  appointment: any;
}

export const updateStatusSchema = z.object({
  status: z.nativeEnum(AppointmentStatus, {message: "Status is required"}),
})


export function UpdateStatus({ appointment }: UpdateStatusProps) {

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const query = useQueryClient()

  const form = useForm<z.infer<typeof updateStatusSchema>>({
    resolver: zodResolver(updateStatusSchema)
  })


  const onSubmit = async (data: z.infer<typeof updateStatusSchema>) => {

    
    setIsLoading(true);
    try {
      const res = await updateAppointmentStatus(data.status, appointment.id);
      if (res.success) {
        toast.success(res.message || "Status updated successfully");
        query.invalidateQueries({
          queryKey: ['doctor-appointments'] 
        });
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem>
            Update Status
          </DropdownMenuItem></DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <div className="mt-4 w-full mb-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full focus:ring-mainLight focus-visible:ring-[1px] focus-visible:ring-mainLight">
                            <SelectValue placeholder="Select your new status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={AppointmentStatus.CANCELLED}>CANCELLED</SelectItem>
                          <SelectItem value={AppointmentStatus.COMPLETED}>COMPLETED</SelectItem>
                          <SelectItem value={AppointmentStatus.SCHEDULED}>SCHEDULED</SelectItem>
                          <SelectItem value={AppointmentStatus.CONFIRMED}>CONFIRMED</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <CustomButton type="submit" loading={isLoading} disabled={isLoading}>Confirm</CustomButton>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </>
  )
}