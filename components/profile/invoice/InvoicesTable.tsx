"use client"

import { DataTable } from '@/components/doctorAppointments/data-table'
import { Spinner } from '@/components/Spinner'
import { ActionResponse, PatientInvoices } from '@/types/types'
import { getPatientInvoices } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Invoicescolumns } from './InvoicesColumns'

const InvoicesTable = () => {

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
    <DataTable data={data?.data || []} columns={Invoicescolumns} initialSorting={[{ id: 'createdAt', desc: true }]} />
  )
}

export default InvoicesTable