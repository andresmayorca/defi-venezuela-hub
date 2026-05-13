"use client";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer",
          {
            "bg-[#00FF88] hover:bg-[#00e67a] text-[#0D1117] shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]":
              variant === "primary",
            "bg-[#161B24] hover:bg-[#1E242F] text-[#9DA5B4] border border-[#272E3B] hover:border-[#00FF88]/30":
              variant === "secondary",
            "border border-[#00FF88]/40 hover:border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88]/10":
              variant === "outline",
            "text-[#9DA5B4] hover:text-[#F0F1F5] hover:bg-white/5":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
export default Button;
