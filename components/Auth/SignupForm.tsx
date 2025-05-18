"use client"

import Link from "next/link"
import Image from "next/image"
import { Lock, Mail, User } from "lucide-react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CustomInput } from "../InputField"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomButton } from "../Cutsombutton"
import { useState } from "react"
import {  SignupUser } from "@/utils/actions/Auth-actions"

// Validation schema
const validatonSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})



const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: "easeOut"
    }
  })
}





export default function SignupForm() {


  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof validatonSchema>>({
    resolver: zodResolver(validatonSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const [loading, setLoading] = useState(false)


  const onSubmit = async (data: z.infer<typeof validatonSchema>) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("password", data.password)
    const res = await SignupUser(formData)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-4xl overflow-hidden py-0">
        <div className="grid md:grid-cols-2">
          <CardContent className="p-6 md:p-6 w-full flex flex-col items-center justify-center bg-white">
            <Image src="/logo.svg" width={200} height={200} alt="logo" />

            <div className="mt-4 space-y-6 w-full">
              <motion.div
                className="space-y-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <p className="text-sm text-slate-500">Create your account to get started with us</p>
              </motion.div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  className="space-y-2"
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="username">UserName</Label>
                  <CustomInput
                    placeholder="johndoe"
                    icon={<User className="w-4 h-4" />}
                    error={errors.username}
                    {...register("username")}
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="email">Email</Label>
                  <CustomInput
                    placeholder="example@gmail.com"
                    icon={<Mail className="w-4 h-4" />}
                    error={errors.email}
                    {...register("email")}
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-cyan-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <CustomInput
                    placeholder="password"
                    type="password"
                    icon={<Lock className="w-4 h-4" />}
                    error={errors.password}
                    {...register("password")}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <CustomButton type="submit" loading={loading} disabled={loading}>Sign in</CustomButton>
                </motion.div>
              </form>



              <div className="space-y-2">
                <motion.div
                className="text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                Already have an account?{" "}
                <Link href="/login" className="text-cyan-600 hover:underline">
                  Login
                </Link>
              </motion.div>

              <motion.div
                className="text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                Signup as Doctor?{" "}
                <Link href="/signup-doctor" className="text-cyan-600 hover:underline">
                  here
                </Link>
              </motion.div></div>

            </div>
          </CardContent>

          <div className="relative hidden bg-cyan-600 md:block h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-cyan-600/80"></div>
            <Image
              src="/team-3.jpg"
              alt="Dental care professionals"
              width={600}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <blockquote className="space-y-2">
                <p className="text-lg font-medium">
                  We&apos;re committed to providing the highest quality dental care in a comfortable environment.
                </p>
                <footer className="text-sm">dr. alison banson, Lead Dentist</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}