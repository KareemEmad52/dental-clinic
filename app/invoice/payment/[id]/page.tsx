import InvoicePage from '@/components/invoice/InvoicePage'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params

  return (
    <InvoicePage InvoiceId={id} />
  )
}

export default Page