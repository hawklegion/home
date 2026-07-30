import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-xl bg-white/80",
        "border border-[#D4AF37]/30",
        "shadow-2xl shadow-[#D4AF37]/10",
        "rounded-2xl p-8",
        "before:absolute before:inset-0 before:rounded-2xl",
        "before:border before:border-[#D4AF37]/10 before:pointer-events-none",
        "before:inset-[3px]",
        "after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2",
        "after:w-3/4 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-[#D4AF37]/40 after:to-transparent",
        className
      )}
    >
      <div className="absolute -top-[1px] left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      {children}
    </div>
  )
}
