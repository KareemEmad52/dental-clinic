"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Lock, Mail, User, Award, GraduationCap, BookOpen, Upload } from "lucide-react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CustomInput } from "../InputField"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomButton } from "../Cutsombutton"
import { Textarea } from "@/components/ui/textarea"
import { doctorSignupSchema } from "@/utils/validations"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { SignupDoctor } from "@/utils/actions/Doctors-actions"



const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: "easeOut"
    }
  })
}

export default function DoctorSignupForm() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(doctorSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      specialty: "",
      qualifications: "",
      bio: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const onSubmit = async (data: z.infer<typeof doctorSignupSchema>) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("specialty", data.specialty)
    formData.append("qualifications", data.qualifications)
    formData.append("bio", data.bio)
    
    try {
      const res = await SignupDoctor(formData)
      if (res.success){
        router.push("/login")
        toast.success("Account created successfully!")
      } else {
        toast.error(res.error || "Something went wrong")
      }
    } catch (error) {
      console.error("Error during signup:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-5xl overflow-hidden py-0">
        <div className="grid md:grid-cols-2">
          
          <CardContent className="p-6 w-full flex flex-col items-center justify-center bg-white">
            <Image src="/logo.svg" width={180} height={180} alt="logo" className="mb-2" />

            <div className="w-full">
              <motion.div
                className="space-y-2 text-center mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold">Doctor Registration</h2>
                <p className="text-sm text-slate-500">Create your professional account to join our practice</p>
              </motion.div>

              <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <motion.div
                    className="space-y-1"
                    custom={0}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="name">Full Name</Label>
                    <CustomInput
                      placeholder="Dr. John Smith"
                      icon={<User className="w-4 h-4" />}
                      error={errors.name}
                      {...register("name")}
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-1"
                    custom={1}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="email">Email</Label>
                    <CustomInput
                      placeholder="doctor@example.com"
                      icon={<Mail className="w-4 h-4" />}
                      error={errors.email}
                      {...register("email")}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-1"
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="password">Password</Label>
                  <CustomInput
                    placeholder="Create a secure password"
                    type="password"
                    icon={<Lock className="w-4 h-4" />}
                    error={errors.password}
                    {...register("password")}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <motion.div
                    className="space-y-1"
                    custom={3}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="specialty">Specialty</Label>
                    <CustomInput
                      placeholder="e.g. Orthodontist"
                      icon={<Award className="w-4 h-4" />}
                      error={errors.specialty}
                      {...register("specialty")}
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-1"
                    custom={4}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <CustomInput
                      placeholder="e.g. DDS, MS"
                      icon={<GraduationCap className="w-4 h-4" />}
                      error={errors.qualifications}
                      {...register("qualifications")}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-1"
                  custom={5}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Label htmlFor="bio">Professional Bio</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <Textarea
                      placeholder="Brief description of your experience and expertise"
                      className={`pl-10 min-h-24 ${errors.bio ? 'border-red-500' : ''}`}
                      {...register("bio")}
                    />
                  </div>
                  {(errors && errors.bio) && <p className="text-xs text-destructive">{errors.bio.message}</p>}

                </motion.div>

                

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="pt-2"
                >
                  <CustomButton type="submit" loading={loading} disabled={loading}>
                    Create Account
                  </CustomButton>
                </motion.div>
              </form>

              <motion.div
                className="text-center text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                Already have an account?{" "}
                <Link href="/login" className="text-cyan-600 hover:underline">
                  Login
                </Link>
              </motion.div>
            </div>
          </CardContent>

          <div className="relative hidden bg-cyan-600 md:block h-full">
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
                  Join our network of dental professionals and help provide excellent care to our patients.
                </p>
                <footer className="text-sm">Dr. Alison Banson, Lead Dentist</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}