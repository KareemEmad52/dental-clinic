import InvoicesDisplayTable from "@/components/invoice/AllInvoicePage";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Dentaire - Dentist & Dental Clinic',
  description: 'Invoice',
}

export default async function Page() {
  return (
    <div className="min-h-[90vh] container flex flex-col gap-5 justify-center items-center m">
      <InvoicesDisplayTable />
    </div>
  )
}
