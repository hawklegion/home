"use client"

import { Calendar, Globe, Swords, Shield, ArrowDown } from "lucide-react"

export default function HowItWorksCard() {
  return (
    <div
      className="relative backdrop-blur-xl bg-white/80 rounded-2xl p-6 md:p-8 card-glow border border-[#D4AF37]/35 flex flex-col items-center justify-center text-center h-full"
      style={{
        boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.12), 0 8px 32px rgba(212, 175, 55, 0.06)",
      }}
    >
      {/* Corner filigree accents */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />

      <h3 className="font-heading text-xs md:text-sm font-bold text-[#AA7A1E] tracking-[0.25em] uppercase mb-6">
        HOW IT WORKS
      </h3>

      <div className="w-full max-w-sm space-y-3">
        {/* Step 1 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#D4AF37]/20 shadow-sm text-left">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="text-xs text-[#111827]/80 font-medium">
            You enter your current local date & time.
          </span>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center my-1">
          <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#D4AF37]/20 shadow-sm text-left">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="text-xs text-[#111827]/80 font-medium">
            We compare it with global atomic time.
          </span>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center my-1">
          <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#D4AF37]/20 shadow-sm text-left">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
            <Swords className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="text-xs text-[#111827]/80 font-medium">
            We calculate your correct UTC offset.
          </span>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center my-1">
          <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

        {/* Step 4 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[#D4AF37]/20 shadow-sm text-left">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <span className="text-xs text-[#111827]/80 font-medium">
            Your timezone, time & date are updated instantly.
          </span>
        </div>
      </div>
    </div>
  )
}
