import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-xl border bg-[#161B24] px-3 py-2 text-sm text-[#F0F1F5] placeholder:text-[#9DA5B4]/40 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500/50 focus:ring-red-500/30"
            : "border-white/10 focus:border-[#00FF88]/50 focus:ring-[#00FF88]/20",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
