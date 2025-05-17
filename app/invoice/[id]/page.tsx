import InvoicePageDisplay from "@/components/invoice/DisplayInvoice";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params

  return (
    <>
      <InvoicePageDisplay InvoiceId={id} />
    </>
  )
}