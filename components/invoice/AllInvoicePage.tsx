"use client"

import { DataTable } from '@/components/doctorAppointments/data-table'
import { Spinner } from '@/components/Spinner'
import { ActionResponse, PatientInvoices } from '@/types/types'
import { getPatientInvoices } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Invoicescolumns } from '../profile/invoice/InvoicesColumns'
import Image from 'next/image'


const InvoicesDisplayTable = () => {

  const session = useSession()
  const InvoiceId = session.data?.user?.id


  const { data, isLoading } = useQuery<ActionResponse<PatientInvoices[]>>({
    queryKey: ['invoice-details', InvoiceId],
    queryFn: () => getPatientInvoices(InvoiceId as string)
  })





  if (isLoading) {
    return (
      <div className="container  space-y-4 flex items-center justify-center">
        <Spinner className="w-16 h-16" variant="primary" />
      </div>
    )
  }

  return (
    <div className='w-full '>

      <div
        className="w-full flex justify-center items-center gap-1 "
      >
        <Image src="/icon-sub-heading.svg" width={15} height={15} alt="star Icon" />
        <h3 className="capitalize font-poppins text-mainLight font-medium">
          Invoice
        </h3>
      </div>
      <h1 className="font-poppins text-2xl md:text-4xl font-bold text-center capitalize">Manage Your <span className="text-mainLight">Invoices</span></h1>
      
      <DataTable data={data?.data || []} columns={Invoicescolumns} initialSorting={[{ id: 'createdAt', desc: true }]} />
    </div>
  )
}

export default InvoicesDisplayTable