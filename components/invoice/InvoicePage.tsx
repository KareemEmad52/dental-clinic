"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { getPatientSpecificInvoice } from "@/utils/api"
import { Spinner } from "../Spinner"
import { ActionResponse, PatientInvoices } from "@/types/types"
import { AlertCircleIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "../ui/badge"
import { InvoiceStatus } from "@prisma/client"
import InvoiceForm from "./invoiceForm"

export default function InvoicePage({ InvoiceId }: { InvoiceId: string }) {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const session = useSession()

  const { data, isLoading } = useQuery<ActionResponse<PatientInvoices>>({
    queryKey: ['invoice-details', InvoiceId],
    queryFn: () => getPatientSpecificInvoice(InvoiceId)
  })


  


  if (isLoading) {
    return (
      <div className="container min-h-[80vh] space-y-4 flex items-center justify-center">
        <Spinner className="w-16 h-16" variant="primary" />
      </div>
    )
  }

  




  if (!session.data?.user) {
    return <div>
      User Not Found
    </div>
  }



  if (data?.data?.status === InvoiceStatus.PAID) {
    return <>
      <div className="container min-h-[80vh] space-y-4 flex items-center justify-center">
        <h1 className="font-poppins text-2xl md:text-4xl font-bold text-center capitalize">Invoice Already Paid</h1>
      </div>
    </>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-poppins">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - User Info & Order Summary */}
          <Card className="p-6 shadow-sm">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Your Info</h2>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src={session.data.user.image as string}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium capitalize ">{session.data.user.name}</p>
                  <p className="text-sm text-gray-500">{session.data.user.email}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold capitalize">invoice Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p>{data?.data?.appointment.service.name}</p>
                      <p className="text-sm text-gray-500"></p>
                    </div>
                    <p className="font-medium flex justify-center items-center gap-1"> <span>{data?.data?.appointment.service.duration} min</span> </p>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p>Start at </p>
                      {/* <p className="text-sm text-gray-500">$15.00 × 2</p> */}
                    </div>
                    <p className="font-normal text-gray-700">
                      {data?.data?.appointment.startTime
                        ? format(new Date(data.data.appointment.startTime), "PPp")
                        : ""}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p>Status </p>
                      {/* <p className="text-sm text-gray-500">$15.00 × 2</p> */}
                    </div>
                    <p className="font-normal text-gray-700">
                      <Badge
                        variant='outline'
                        className='border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400 [a&]:hover:bg-amber-600/10 [a&]:hover:text-amber-600/90 dark:[a&]:hover:bg-amber-400/10 dark:[a&]:hover:text-amber-400/90'
                      >
                        <AlertCircleIcon className='size-3' />
                        Pending
                      </Badge>
                    </p>
                  </div>



                  <Separator />

                  <div className="flex justify-between">
                    <p>Price</p>
                    <p className="font-medium">${data?.data?.appointment.service.price}.00</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Fees</p>
                    <p className="font-medium">$0.00</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <h2 className="text-2xl font-bold">Total</h2>
                <p className="text-2xl font-semibold text-green-600">${data?.data?.appointment.service.price}.00</p>
              </div>
            </div>
          </Card>

          {/* Right Column - Payment Method */}
          <Card className="p-6 shadow-sm">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Choose your payment method</h2>

              <div>
                <p className="mb-4 text-center text-gray-500">Express checkout</p>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" className="h-14" onClick={() => setPaymentMethod("paypal")}>
                    <span className="sr-only">PayPal</span>
                    <svg viewBox="0 0 24 24" className="!h-8 !w-8 text-[#003087]" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082H9.826l-1.03 6.542h3.046c.435 0 .805-.318.874-.748l.036-.198.694-4.406.045-.237a.87.87 0 0 1 .874-.75h.55c3.568 0 6.364-1.45 7.18-5.639.34-1.76.164-3.23-.873-4.359z" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="h-14" onClick={() => setPaymentMethod("google")}>
                    <span className="sr-only">Google Pay</span>
                    <svg viewBox="0 0 24 24" className="!h-10 !w-10">
                      <path
                        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                        fill="white"
                      />
                      <path
                        d="M17.5172 12.5555C17.5172 12.0912 17.4759 11.6455 17.3978 11.2183H12V13.4585H15.1371C15.0126 14.1673 14.6358 14.7697 14.0679 15.1683V16.8253H15.9574C16.9517 15.9039 17.5172 14.3555 17.5172 12.5555Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 18C13.6138 18 14.9647 17.4703 15.9574 16.8253L14.0679 15.1683C13.5766 15.5017 12.9508 15.7018 12 15.7018C10.3958 15.7018 9.0438 14.6204 8.65708 13.1555H6.70068V14.8555C7.68894 16.7227 9.6817 18 12 18Z"
                        fill="#34A853"
                      />
                      <path
                        d="M8.65708 13.1555C8.55274 12.8221 8.49274 12.4665 8.49274 12C8.49274 11.5335 8.55274 11.1779 8.65708 10.8445V9.14453H6.70068C6.25068 10.0335 6 11.0001 6 12C6 12.9999 6.25068 13.9665 6.70068 14.8555L8.65708 13.1555Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 8.29821C12.8329 8.29821 13.5766 8.57277 14.1688 9.14089L15.8646 7.4451C14.9601 6.60277 13.6138 6 12 6C9.6817 6 7.68894 7.27733 6.70068 9.14453L8.65708 10.8445C9.0438 9.37964 10.3958 8.29821 12 8.29821Z"
                        fill="#EA4335"
                      />
                    </svg>
                  </Button>
                  <Button variant="outline" className="h-14" onClick={() => setPaymentMethod("apple")}>
                    <span className="sr-only">Apple Pay</span>
                    <svg viewBox="0 0 24 24" className="!h-8 !w-8" fill="currentColor">
                      <path d="M17.0415 10.4309C16.9784 8.15066 18.8045 6.90347 18.8811 6.85265C17.7692 5.17129 16.0541 4.93033 15.4436 4.90492C13.9948 4.75 12.5976 5.78033 11.8613 5.78033C11.1091 5.78033 9.97403 4.92746 8.74949 4.95287C7.18754 4.97828 5.74949 5.85066 4.94754 7.20287C3.29949 9.95795 4.52403 14.1863 6.10139 16.4158C6.88793 17.5056 7.80139 18.7274 8.98793 18.6766C10.1431 18.6258 10.5829 17.9244 11.9784 17.9244C13.3584 17.9244 13.7727 18.6766 14.9784 18.6512C16.2099 18.6258 17.0118 17.5309 17.7727 16.4412C18.6608 15.1686 19.0245 13.9214 19.0499 13.8452C19.0245 13.8198 17.1091 13.0929 17.0415 10.4309Z" />
                      <path d="M15.0541 3.12746C15.6899 2.35635 16.1043 1.29066 15.9784 0.225C15.0541 0.25041 13.8992 0.834435 13.238 1.58013C12.6529 2.25127 12.1371 3.35127 12.2884 4.36619C13.3245 4.44234 14.3929 3.89066 15.0541 3.12746Z" />
                    </svg>
                  </Button>
                </div>
              </div>

              <InvoiceForm id={InvoiceId} />

            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
