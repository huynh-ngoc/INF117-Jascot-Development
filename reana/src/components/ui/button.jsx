import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Primary - Electric Blue with gradient hover
        default:
          "bg-[#00A3E0] text-white font-bold font-montserrat shadow-xs hover:bg-gradient-to-r hover:from-[#00A3E0] hover:to-[#0087C1] hover:shadow-lg hover:shadow-[#00A3E0]/30",

        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        // Secondary - Deep Blue with glow
        secondary:
          "bg-[#1A3D7C] text-white font-bold font-montserrat shadow-xs hover:bg-[#0F2A5A] hover:shadow-lg hover:shadow-[#1A3D7C]/40",

        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",

        link: "text-primary underline-offset-4 hover:underline",

        disabled:
          "bg-[#C0C0C0] text-gray-500 font-bold font-montserrat cursor-not-allowed hover:bg-[#C0C0C0]",

        primary:
          "bg-[#00A3E0] text-white font-bold font-montserrat shadow-xs hover:bg-gradient-to-r hover:from-[#00A3E0] hover:to-[#0087C1] hover:shadow-lg hover:shadow-[#00A3E0]/30",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-md px-8 has-[>svg]:px-6 text-base",
        icon: "size-9",
        full: "h-9 px-4 py-2 w-full has-[>svg]:px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  disabled,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  const actualVariant =
    disabled && !["outline", "ghost", "link", "destructive"].includes(variant)
      ? "disabled"
      : variant;

  const handleMouseEnter = (e) => {
    if (variant === "secondary" && !disabled) {
      e.target.style.filter = "drop-shadow(0 0 8px rgba(26, 61, 124, 0.6))";
    }
  };

  const handleMouseLeave = (e) => {
    if (variant === "secondary" && !disabled) {
      e.target.style.filter = "none";
    }
  };

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant: actualVariant, size, className })
      )}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
}

export { Button, buttonVariants };
