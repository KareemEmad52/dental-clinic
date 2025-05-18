import InvoicePageDisplay from "@/components/invoice/DisplayInvoice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dentaire - Dentist & Dental Clinic',
  description: 'Invoice View',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params

  return (
    <>
      <InvoicePageDisplay InvoiceId={id} />
    </>
  )
}