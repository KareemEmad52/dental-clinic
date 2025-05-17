"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { CustomButton } from '../Cutsombutton'
import { UpdateInvoiceStatus } from '@/utils/actions/Invoice-action'



const invoiceSchema = z.object({
  cardNumber: z.string().min(12, 'Card number must be at least 12 digits'),
  expDate: z.string().min(4, 'Expiration date is required'),
  csv: z.string().min(3, 'CSV must be at least 3 digits'),
  zipCode: z.string().min(3, 'Zip code is required'),
  saveCard: z.boolean().optional(),
  nameOnCard: z.string().min(2, 'Name on card is required'),
  country: z.string().min(2, 'Country is required'),
})

type InvoiceFormData = z.infer<typeof invoiceSchema>



const InvoiceForm: React.FC<{ id: string }> = ({ id }) => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      saveCard: false,
    },
  })

  const onSubmit = async (data: InvoiceFormData) => {
    setIsLoading(true)
    try {
      const res = await UpdateInvoiceStatus(id)
      if (res.success) {
        toast.success(res.message)
        router.push('/')
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="font-medium">Card information</h3>

      <div className="relative">
        <Input
          type="text"
          placeholder="Card number"
          className="pr-16"
          {...register('cardNumber')}
        />
        {errors.cardNumber && (
          <p className="text-sm !text-red-500">{errors.cardNumber.message}</p>
        )}
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <Image src="/visa.svg" alt="Visa" width={36} height={24} />
          <Image src="/mastercard.svg" alt="Mastercard" width={36} height={24} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Input type="text" placeholder="Exp date" {...register('expDate')} />
          {errors.expDate && (
            <p className="text-sm text-red-500">{errors.expDate.message}</p>
          )}
        </div>
        <div>
          <Input type="text" placeholder="CSV" {...register('csv')} />
          {errors.csv && (
            <p className="text-sm text-red-500">{errors.csv.message}</p>
          )}
        </div>
        <div>
          <Input type="text" placeholder="Zip code" {...register('zipCode')} />
          {errors.zipCode && (
            <p className="text-sm text-red-500">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="save-card"
          checked={watch('saveCard')}
          onCheckedChange={(val) => setValue('saveCard', !!val)}
        />
        <Label htmlFor="save-card">Save card</Label>
      </div>

      <div>
        <Label htmlFor="name-on-card">Name on card</Label>
        <Input id="name-on-card" className="mt-1" {...register('nameOnCard')} />
        {errors.nameOnCard && (
          <p className="text-sm text-red-500">{errors.nameOnCard.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="country">Country or region</Label>
        <Select
          onValueChange={(val) => setValue('country', val)}
        >
          <SelectTrigger id="country" className="mt-1 w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="eg">Egypt</SelectItem>
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <CustomButton loading={isLoading}  disabled={isLoading} type="submit" >
          Confirm payment
        </CustomButton>
      </div>
    </form>
  )
}

export default InvoiceForm