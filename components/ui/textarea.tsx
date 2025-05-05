import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground  dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-mainLight focus-visible:ring-[1.5px] focus:border-0",
        "aria-invalid:ring-destructive/80 aria-invalid:ring-[1px] dark:aria-invalid:ring-0 aria-invalid:border-0",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
