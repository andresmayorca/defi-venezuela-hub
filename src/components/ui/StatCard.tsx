import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: LucideIcon;
  className?: string;
  accent?: "green" | "blue";
}

export function StatCard({ label, value, change, icon: Icon, className, accent = "green" }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-5 overflow-hidden group transition-all duration-300",
        "bg-gradient-to-br from-[#161B24] to-[#131720]",
        accent === "green"
          ? "border-[#00FF88]/15 hover:border-[#00FF88]/30 hover:shadow-[0_8px_32px_rgba(0,255,136,0.08)]"
          : "border-[#00D4FF]/15 hover:border-[#00D4FF]/30 hover:shadow-[0_8px_32px_rgba(0,212,255,0.08)]",
        className
      )}
    >
      {/* Background glow */}
      <div
        className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2",
          accent === "green" ? "bg-[#00FF88]/10" : "bg-[#00D4FF]/10"
        )}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-[#9DA5B4]/60 uppercase tracking-wider">{label}</p>
          <p className={cn(
            "text-2xl font-bold font-mono tracking-tight",
            accent === "green" ? "text-[#F0F1F5]" : "text-[#F0F1F5]"
          )}>
            {value}
          </p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              isPositive ? "text-[#00FF88]" : "text-red-400"
            )}>
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {isPositive ? "+" : ""}{change}%
            </div>
          )}
        </div>

        {Icon && (
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            accent === "green" ? "bg-[#00FF88]/10" : "bg-[#00D4FF]/10"
          )}>
            <Icon className={cn("w-5 h-5", accent === "green" ? "text-[#00FF88]" : "text-[#00D4FF]")} />
          </div>
        )}
      </div>
    </div>
  );
}
