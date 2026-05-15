import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeVariant = "default" | "primary" | "secondary" | "outline" | "destructive" | "success";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-white/10 text-[#F0F1F5] border border-white/10": variant === "default",
          "bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30": variant === "primary",
          "bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30": variant === "secondary",
          "border border-white/20 text-[#9DA5B4] bg-transparent": variant === "outline",
          "bg-red-500/15 text-red-400 border border-red-500/30": variant === "destructive",
          "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30": variant === "success",
        },
        className
      )}
      {...props}
    />
  );
}
