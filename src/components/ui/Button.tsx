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
  ({ className, variant = "primary", size = "md", asChild = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117]",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#00FF88] hover:bg-[#00e67a] active:bg-[#00cc6a] text-[#0D1117] shadow-[0_0_20px_rgba(0,255,136,0.25)] hover:shadow-[0_0_32px_rgba(0,255,136,0.45)] active:shadow-none":
              variant === "primary",
            "bg-[#161B24] hover:bg-[#1E242F] active:bg-[#252C3A] text-[#9DA5B4] hover:text-[#F0F1F5] border border-white/10 hover:border-white/20":
              variant === "secondary",
            "border border-[#00FF88]/40 hover:border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88]/8 active:bg-[#00FF88]/15":
              variant === "outline",
            "text-[#9DA5B4] hover:text-[#F0F1F5] hover:bg-white/5 active:bg-white/8":
              variant === "ghost",
          },
          {
            "px-3.5 py-2 text-sm gap-1.5 h-9": size === "sm",
            "px-5 py-2.5 text-sm gap-2 h-10": size === "md",
            "px-7 py-3.5 text-base gap-2.5 h-12": size === "lg",
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
