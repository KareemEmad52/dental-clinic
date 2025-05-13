"use client"

import Link from "next/link"
import Image from "next/image"
import { Lock, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CustomInput } from "../InputField"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomButton } from "../Cutsombutton"
import { FaGithub } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { SigninWithCredentials, signInWithGitHub, signInWithGoogle } from "@/utils/actions/Auth-actions"
import { BiLoader } from "react-icons/bi"
import { LoginSchema } from "@/utils/validations"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Spinner } from "../Spinner"
import { useSession } from "next-auth/react"




// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

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

const buttonVariants = {
  hidden: { opacity: 0, x: -50 },
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



export default function LoginForm() {


  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [githubLoading, setGithubLoading] = useState<boolean>(false)
  const [googleLoading, setGoogleLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const session = useSession()

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    setLoading(true)
    const res = await SigninWithCredentials(formData)
    console.log(res)
    if (res.success) {
      // router.prefetch("/")
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Login Successfully", { duration: 2000 })
      // router.push("/")
      // session.update()
    } else {
      if (res.error === "User not found") {
        toast.error("Email not Exists", { duration: 2000 })
      } else {
        toast.error(res.error, { duration: 2000 })
      }
    }
    setLoading(false)
  }

  const handleGitHubSignIn = async () => {
    setGithubLoading(true)
    const result = await signInWithGitHub()
    console.log(result);
    setGithubLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    const result = await signInWithGoogle()
    console.log(result);
    setGoogleLoading(false)
  }

  useEffect(()=>{
    const error = new URLSearchParams(window.location.search).get("error")
    if (error) {
      toast.error("Another account already exists with the same e-mail address.", { duration: 2000 })
    }
  },[])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        <Card className="w-full max-w-4xl overflow-hidden py-0">
          <div className="grid md:grid-cols-2">
            <CardContent className="p-6 md:p-6 w-full flex flex-col items-center justify-center bg-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image src="/logo.svg" width={200} height={200} alt="logo" />
              </motion.div>

              <div className="mt-4 space-y-6 w-full">
                <motion.div
                  className="space-y-2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <p className="text-sm text-slate-500">Sign in to access your patient portal</p>
                </motion.div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <motion.div
                    className="space-y-2"
                    custom={0}
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
                    custom={1}
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
                    <CustomButton type="submit" loading={loading} disabled={loading} >Sign in</CustomButton>
                  </motion.div>
                </form>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    variants={buttonVariants}
                    className="w-full"
                  >
                    <CustomButton variant="outline" className="w-full" onClick={handleGitHubSignIn} disabled={githubLoading} >
                      {githubLoading ? (
                        <Spinner size={22} variant={"primary"} />
                      ) : (
                        <FaGithub className="h-6 w-6" />
                      )}
                      <span className="sr-only">Login with Github</span>
                    </CustomButton>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    variants={buttonVariants}
                  >
                    <CustomButton variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={googleLoading}>
                      {googleLoading ? (
                        <Spinner size={22} variant={"primary"} />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                      <span className="sr-only">Login with Google</span>
                    </CustomButton>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    variants={buttonVariants}
                  >
                    <CustomButton variant="outline" className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="sr-only">Login with Meta</span>
                    </CustomButton>
                  </motion.div>
                </div>

                <motion.div
                  className="text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-cyan-600 hover:underline">
                    Signup
                  </Link>
                </motion.div>
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
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <blockquote className="space-y-2">
                  <p className="text-lg font-medium">
                    We&apos;re committed to providing the highest quality dental care in a comfortable environment.
                  </p>
                  <footer className="text-sm">dr. alison banson, Lead Dentist</footer>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}