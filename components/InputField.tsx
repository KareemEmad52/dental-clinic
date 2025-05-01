"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { FieldError } from "react-hook-form"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  className?: string
  containerClassName?: string
  error?: FieldError | undefined
  errorMessage?: string
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, icon, type = "text", containerClassName, error, errorMessage, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev)
    }

    return (
      <div className={cn("space-y-1", containerClassName)}>
        <div className="relative flex items-center">
          {icon && <div className="absolute left-2.5 flex h-full items-center text-muted-foreground">{icon}</div>}
          <Input
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              icon && "pl-8",
              isPassword && "pr-10",
              error && "border-destructive focus-visible:ring-destructive ",
              className,
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 h-7 w-7"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          )}
        </div>
        {(error || errorMessage) && <p className="text-xs text-destructive">{errorMessage || error?.message}</p>}
      </div>
    )
  },
)

CustomInput.displayName = "CustomInput"
