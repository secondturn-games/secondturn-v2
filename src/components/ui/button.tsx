import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-vibrant-orange-500 text-white hover:bg-vibrant-orange-600 focus-visible:ring-vibrant-orange-500 shadow-soft hover:shadow-medium",
        secondary:
          "bg-warm-yellow-400 text-dark-green-600 hover:bg-warm-yellow-500 focus-visible:ring-warm-yellow-500 shadow-soft hover:shadow-medium",
        outline:
          "border-2 border-dark-green-300 bg-transparent text-dark-green-600 hover:bg-dark-green-50 hover:border-dark-green-400 focus-visible:ring-dark-green-500",
        ghost:
          "text-dark-green-600 hover:bg-dark-green-50 focus-visible:ring-dark-green-500",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 shadow-soft hover:shadow-medium",
        link: "text-vibrant-orange-500 underline-offset-4 hover:underline focus-visible:ring-vibrant-orange-500",
      },
      size: {
        sm: "h-10 px-4 py-2 text-sm",
        default: "h-12 px-6 py-3 text-base",
        lg: "h-14 px-8 py-4 text-lg",
        xl: "h-16 px-10 py-5 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
