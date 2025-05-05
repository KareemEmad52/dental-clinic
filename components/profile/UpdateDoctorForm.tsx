import { doctorProfileUpdateSchema } from '@/utils/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Award, Check, Edit, GraduationCap, Mail, Phone, User } from 'lucide-react'
import { Label } from '../ui/label'
import { CustomInput } from '../InputField'
import DatePicker from '../ui/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { getDoctorInfo } from '@/utils/api'
import { GetDoctorInfoResponse, globalError } from '@/types/types'
import { Gender } from '@prisma/client'
import { Textarea } from '../ui/textarea'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { Spinner } from '../Spinner'
import { CustomButton } from '../Cutsombutton'
import { updateDoctorInfo } from '@/utils/actions/Doctors-actions'

export type updateDoctorType = z.infer<typeof doctorProfileUpdateSchema>


type Props = {
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateDoctorForm: React.FC<Props> = ({ isEditing, setIsEditing }) => {

  const [originalData, setOriginalData] = useState<updateDoctorType | null>(null)
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false)

  const { data, error, isLoading } = useQuery<GetDoctorInfoResponse>({
    queryKey: ["doctorInfo"],
    queryFn: getDoctorInfo,
  })

  const methods = useForm<updateDoctorType>({
    resolver: zodResolver(doctorProfileUpdateSchema),
  })


  const { register, handleSubmit, control, formState: { errors, dirtyFields }, reset } = methods


  const onSubmit = async (data: updateDoctorType) => {

    setIsUpdateLoading(true)
    // Check if there are any changes
    if (!originalData || Object.keys(dirtyFields).length === 0) {
      toast.error('No changes made');
      setIsEditing(false);
      setIsUpdateLoading(false)
      return;
    }
  
    // Extract only changed fields
    const changedValues = Object.keys(dirtyFields).reduce((acc, key) => {
      const fieldKey = key as keyof updateDoctorType;
      acc[fieldKey] = data[fieldKey] as any;
      return acc;
    }, {} as Partial<updateDoctorType>);
  
    // Call the Server Action
    const res = await updateDoctorInfo(changedValues);
  
    // Handle response
    if (res.success) {
      toast.success(res.message || 'Profile updated successfully');
      setIsEditing(false);
      
    } else {
      const errorMessage = res.message || 'Failed to update profile';
      toast.error(errorMessage);
    }

    setIsUpdateLoading(false)
  };


  useEffect(() => {
    if (data) {
      const formValues = {
        email: data.data?.email || "",
        name: data.data?.name || "",
        phone: data.data?.phone || "",
        specialty: data.data?.doctorProfile?.specialty || "",
        address: data.data?.address || "123 Main Street",
        bio: data.data?.doctorProfile?.bio || "",
        dob: data.data?.dateOfBirth ? new Date(data.data.dateOfBirth) : undefined,
        gender: data.data?.gender as Gender || Gender.MALE,
        photoUrl: data.data?.doctorProfile?.photoUrl || "",
        qualifications: data.data?.doctorProfile?.qualifications || "",
      }

      // Set the original data for comparison later
      setOriginalData(formValues)

      // Reset form with the data
      reset(formValues)
    }
  }, [data, reset])


  if (!data || isLoading) {
    return <div className='w-full min-h-[300px] flex items-center justify-center'>
      <Spinner className='w-10 h-10' variant='primary' />
      </div>
  }

  return <>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Personal Information</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Check className="h-4 w-4" />
                  Done Editing
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">UserName</Label>
              <CustomInput
                id="name"
                readOnly={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
                {...register("name")}
                icon={<User className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <CustomInput
                id="Email"
                readOnly={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
                {...register("email")}
                icon={<Mail className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <CustomInput
                id="email"
                readOnly={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
                {...register("phone")}
                icon={<Phone className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date of Birth</Label>
              <Controller
                control={control}
                name="dob"
                defaultValue={undefined}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} disabled={!isEditing} />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Controller
                control={control}
                name="gender"
                defaultValue={data.data.gender as Gender || Gender.MALE}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${errors.gender && "text-destructive"}`}>Gender</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!isEditing}>
                        <SelectTrigger className="w-full focus:ring-blue-600 focus-visible:ring-blue-600">
                          <SelectValue placeholder={"Select your gender"} className="placeholder:text-gray-400" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Gender.MALE}>Male</SelectItem>
                          <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {errors.gender && errors.gender.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <CustomInput
                  id="address"
                  {...register("address")}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={"AnyTown"}
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={"California"}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={"12345"}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="specialty">specialty</Label>
                <CustomInput
                  id="specialty"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  {...register("specialty")}
                  icon={<Award className='h-4 w-4' />}
                  error={errors.specialty}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualifications">qualifications</Label>
                <CustomInput
                  id="qualifications"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  {...register("qualifications")}
                  icon={<GraduationCap className="h-4 w-4" />}
                  error={errors.qualifications}
                />
              </div>
            </div>
            <div className="space-y-4 mt-3">
              <div className="space-y-2">
                <Label htmlFor="bio">bio</Label>
                <Textarea
                  id="bio"
                  readOnly={!isEditing}
                  {...register("bio")}
                  className={!isEditing ? "bg-muted resize-none" : "resize-none"}
                  rows={2}
                />
              </div>

            </div>

          </div>
        </CardContent>

        {isEditing && (
          <CardFooter className="border-t p-6 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <CustomButton type='submit' className='min-w-fit' loading={isUpdateLoading} disabled={isUpdateLoading}>
              Save Changes
            </CustomButton>
          </CardFooter>
        )}
      </form>
    </FormProvider>
  </>
}

export default UpdateDoctorForm