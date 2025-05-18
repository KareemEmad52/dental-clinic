"use client";

import { ActionResponse, User } from "@/types/types";
import { getAllDoctors, getAllServices, getAvailability } from "@/utils/api";
import { bookAppointmentSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EnhancedDatePicker } from "../enhancedDatePicker";
import { CustomButton } from "../Cutsombutton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { actionSuccess } from "@/utils/response";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatTime } from "@/utils/fromatTime";
import { MakeAppointment } from "@/utils/actions/Patient-action";
import toast from "react-hot-toast";
import { useState } from "react";

export const BookAppointmentsForm = () => {
  const form = useForm<z.infer<typeof bookAppointmentSchema>>({
    resolver: zodResolver(bookAppointmentSchema),
  });

  const isMobile = useIsMobile();
  const session = useSession();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const watchedDoctorId = form.watch("doctorId");
  const watchedServiceId = form.watch("serviceId");
  const watchedDate = form.watch("date");

  // Queries
  const { data: doctors, isLoading: doctorsLoading } = useQuery<
    ActionResponse<User[]>
  >({
    queryKey: ["doctors"],
    queryFn: () => getAllDoctors(),
    enabled: !!session?.data?.user,
    staleTime: 1000 * 60 * 2,
  });

  const { data: Services, isLoading: ServicesLoading } = useQuery<
    ActionResponse<Service[]>
  >({
    queryKey: ["services"],
    queryFn: () => getAllServices(),
    enabled: !!session?.data?.user,
    staleTime: 1000 * 60 * 2,
  });

  // Available times query
  const {
    data: availableTimesResponse,
    isLoading: isLoadingTimes,
    isSuccess: isSuccessTimes,
  } = useQuery<ActionResponse<string[]>>({
    queryKey: ["availability", watchedDoctorId, watchedServiceId, watchedDate],
    queryFn: async () => {
      if (!watchedDoctorId || !watchedServiceId || !watchedDate) {
        // Return an empty successful response if we don't have all required params
        return actionSuccess("success", []);
      }

      const formattedDate = format(watchedDate, "yyyy-MM-dd");
      return getAvailability({
        doctorId: watchedDoctorId,
        serviceId: watchedServiceId,
        date: formattedDate,
      });
    },
    enabled: !!(watchedDoctorId && watchedServiceId && watchedDate),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });




  const onSubmit = async (data: z.infer<typeof bookAppointmentSchema>) => {
    try {
      setIsLoading(true)
      const res = await MakeAppointment(data)
      if (res.success){
        toast.success("Appointment made successfully")
        form.reset()
        form.setValue("doctorId", "")
        form.setValue("serviceId", "")
        queryClient.invalidateQueries({
          queryKey: ["availability", watchedDoctorId, watchedServiceId, watchedDate],
        })
      } else {
        toast.error(res.error || "Something went wrong")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  if (doctorsLoading || ServicesLoading) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center">
        <Spinner variant="primary" className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Controller
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${
                        form.formState.errors.doctorId && "text-destructive"
                      }`}
                    >
                      Doctors
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full focus:ring-mainLight focus-visible:ring-[1px]  focus-visible:ring-mainLight">
                          <SelectValue
                            placeholder={"Select your doctor"}
                            className="placeholder:text-gray-400"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors?.data?.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              <div
                                className="flex items-center gap-2"
                                key={doctor.id}
                              >
                                <Avatar className="h-6 w-6">
                                  {doctor.doctorProfile?.photoUrl ? (
                                    <AvatarImage
                                      src={doctor.doctorProfile?.photoUrl}
                                      alt={doctor.name as string}
                                    />
                                  ) : (
                                    <AvatarFallback className="bg-slate-200 text-slate-600">
                                      {doctor.name?.charAt(0) as string}
                                    </AvatarFallback>
                                  )}
                                </Avatar>
                                <span>{doctor.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.doctorId &&
                        form.formState.errors.doctorId.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${
                        form.formState.errors.serviceId && "text-destructive"
                      }`}
                    >
                      Services
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full focus:ring-mainLight focus-visible:ring-[1px] focus-visible:ring-mainLight">
                          <SelectValue
                            placeholder={"Select your service"}
                            className="placeholder:text-gray-400"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Services?.data?.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.serviceId &&
                        form.formState.errors.serviceId.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date of Birth</Label>
              <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground "
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start" >
                      <Calendar
                        fromDate={new Date()}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            {watchedDoctorId && watchedServiceId && watchedDate && (
              <div className="space-y-2">
                <Controller
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className={!isMobile ? "space-y-3" : undefined}>
                      <FormLabel
                        className={cn(
                          "text-sm font-medium text-gray-700",
                          form.formState.errors.startTime && "text-destructive"
                        )}
                      >
                        Available Times
                      </FormLabel>
                      <FormControl>
                        {isLoadingTimes ? (
                          <div className="flex justify-center py-4">
                            <Spinner variant="primary" className="w-8 h-8" />
                          </div>
                        ) : isMobile ? (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!availableTimesResponse?.data?.length}
                          >
                            <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-mainLight transition-all duration-200">
                              <SelectValue
                                placeholder={
                                  availableTimesResponse?.data?.length
                                    ? "Select a time"
                                    : "No times available"
                                }
                                className="text-gray-500"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTimesResponse?.data?.map((time) => (
                                <SelectItem key={time} value={time}>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-800">
                                      {formatTime(time)}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-3 gap-2 md:grid-cols-4"
                          >
                            {availableTimesResponse?.data?.length ? (
                              availableTimesResponse.data.map((time) => (
                                <FormItem key={time}>
                                  <FormControl>
                                    <RadioGroupItem
                                      value={time}
                                      id={time}
                                      className="peer sr-only"
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor={time}
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <Clock className="mb-1 h-4 w-4" />
                                    <span>{formatTime(time)}</span>
                                  </FormLabel>
                                </FormItem>
                              ))
                            ) : (
                              <p className="col-span-full text-sm text-muted-foreground">
                                No available times for this date. Please select
                                another date.
                              </p>
                            )}
                          </RadioGroup>
                        )}
                      </FormControl>
                      <FormMessage className="text-xs">
                        {form.formState.errors.startTime?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <CustomButton type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
              Book Appointment
            </CustomButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
