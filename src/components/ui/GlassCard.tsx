import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-xl",
        "hover:bg-white/[0.05] hover:border-white/[0.1] transition-all",
        className
      )}
    >
      {children}
    </div>
  );
}
