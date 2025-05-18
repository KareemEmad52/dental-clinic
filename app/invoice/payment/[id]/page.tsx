import InvoicePage from '@/components/invoice/SingleInvoicePage'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata ={
  title: 'Dentaire - Dentist & Dental Clinic',
  description: 'Invoice payment',
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params

  return (
    <InvoicePage InvoiceId={id} />
  )
}

export default Page