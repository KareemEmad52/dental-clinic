"use client";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"
import { BiLoader } from "react-icons/bi";
import React from "react";
import { Spinner } from "./Spinner";

const buttonVariants = {
  tap: { scale: 0.95 }
}

//extend the button props to include all the button attributes and add custom props
type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
  loading?: boolean
  variant?: "default" | "outline" | "link" | "destructive" | "ghost" | "secondary" 
}


export const CustomButton: React.FC<CustomButtonProps> = ({ children, className, type,loading ,variant, ...props }) => {

  return <motion.div
    variants={buttonVariants}
    whileTap="tap"
  >
    <Button
      type={type || "submit"}
      className={cn(`w-full ${variant?"" : "bg-cyan-600 hover:bg-mainLight"} cursor-pointer`, className)}
      variant={variant || "default"}
      {...props}>
      {loading ? <Spinner size={22}/> : children}
      
    </Button>
  </motion.div>

}