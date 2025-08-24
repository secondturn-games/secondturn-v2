import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-dark-green-600 placeholder:text-dark-green-400 selection:bg-vibrant-orange-100 selection:text-dark-green-600 border-dark-green-200 flex h-12 w-full min-w-0 rounded-xl border-2 bg-white px-4 py-3 text-base shadow-soft transition-all duration-200 outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-base file:font-medium disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:border-vibrant-orange-500 focus-visible:ring-2 focus-visible:ring-vibrant-orange-500/20 focus-visible:ring-offset-2",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
