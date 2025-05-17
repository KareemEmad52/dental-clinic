"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'



export const RedirectToPayment = ({ id }: { id: string }) => {

  const router = useRouter()

  return (
    <Button variant={"outline"} onClick={() => router.push(`invoice/payment/${id}`)} className='w-fit'>
      pay
    </Button>
  )
}

export default RedirectToPayment