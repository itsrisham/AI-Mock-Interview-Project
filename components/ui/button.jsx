import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[#4845D2] text-white shadow-xs hover:bg-[#4845D2]/90", // Changed to #4845D2, and white text.
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-700 focus-visible:ring-red-200 dark:focus-visible:ring-red-400 dark:bg-red-600", //Kept red for destructive.
        outline:
          "border bg-background shadow-xs hover:bg-[#4845D2] hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50", //changed outline hover to #4845D2
        secondary:
          "bg-gray-500 text-white shadow-xs hover:bg-gray-600", //Kept gray for secondary
        ghost:
          "hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700", //Kept gray for ghost.
        link: "text-[#4845D2] underline-offset-4 hover:underline", //Changed link to #4845D2
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };