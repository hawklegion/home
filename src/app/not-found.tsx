"use client"

import { usePathname, useRouter } from "next/navigation"
import { findClosestRoute } from "@/lib/routeMatcher"
import GlassCard from "@/components/ui/GlassCard"
import { ArrowRight, ShieldOff } from "lucide-react"

export default function NotFound() {
  const pathname = usePathname()
  const router = useRouter()
  const suggestion = findClosestRoute(pathname)

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <GlassCard className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <ShieldOff className="w-12 h-12 text-[#D4AF37]/60" />
        </div>

        <h1 className="font-heading text-3xl font-bold text-[#111827] mb-4">
          404 — Page Not Found
        </h1>

        {suggestion ? (
          <>
            <p className="text-[#111827]/60 font-sans mb-6">
              The page you sought does not exist. Were you searching for{" "}
              <span className="font-semibold text-[#D4AF37]">{suggestion.label}</span>?
            </p>
            <button
              onClick={() => router.push(suggestion.route)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#AA7A1E] transition-colors"
            >
              Go to {suggestion.label}
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <p className="text-[#111827]/60 font-sans mb-6">
              The sacred path you seek does not exist within these halls.
            </p>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#AA7A1E] transition-colors"
            >
              Return to Sanctuary
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </GlassCard>
    </div>
  )
}
