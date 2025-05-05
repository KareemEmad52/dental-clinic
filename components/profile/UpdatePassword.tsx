"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";

import { CardContent } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "../InputField";
import { Lock } from "lucide-react";

import { CustomButton } from "../Cutsombutton";
import { Label } from "../ui/label";
import { useState } from "react";
import { updateDoctorPassword } from "@/utils/actions/Doctors-actions";
import toast from "react-hot-toast";
import { updatePasswordSchema } from "@/utils/validations";



export default function UpdatePasswordForm() {

  const { register, handleSubmit, formState: { errors } ,reset } = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema)
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    try {
      setLoading(true);
      const result = await updateDoctorPassword(data);
  
      if (result.success) {
        toast.success(result.message || "Password updated successfully");
        reset();
      } else {
        toast.error(result.message || "Failed to update password");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <h2 className="text-xl font-medium text-left  mb-5">Update Your Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 w-full flex mx-auto md:mt-5 flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <CustomInput
            type="password"
            placeholder="Enter new password"
            icon={<Lock className="h-4 w-4" />}
            error={errors.newPassword}
            {...register("newPassword")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <CustomInput
            type="password"
            placeholder="Confirm password"
            error={errors.confirmPassword}
            icon={<Lock className="h-4 w-4" />}
            {...register("confirmPassword")}
          />
        </div>
        <CustomButton className="" type="submit" loading={loading} disabled={loading}>Update Password</CustomButton>
      </form>

    </CardContent>
  )
}