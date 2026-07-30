"use client"

import { Shield, Swords, Sparkles, Feather, Crown } from "lucide-react"

export default function UiElementsCard() {
  return (
    <div
      className="relative backdrop-blur-xl bg-white/80 rounded-2xl p-6 md:p-7 card-glow border border-[#D4AF37]/35 flex flex-col justify-between"
      style={{
        boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.12), 0 8px 32px rgba(212, 175, 55, 0.06)",
      }}
    >
      {/* Corner filigree accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/40 pointer-events-none" />

      <div>
        {/* Title Header */}
        <div className="text-center mb-6">
          <h3 className="font-heading text-xs md:text-sm font-bold text-[#AA7A1E] tracking-[0.25em] uppercase">
            UI ELEMENTS
          </h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <span className="text-[#D4AF37] text-[10px]">❖</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
        </div>

        {/* Primary Button */}
        <div className="mb-5">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            Primary Button
          </span>
          <div className="relative">
            <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#FDFBF7] via-[#FFFDF5] to-[#FDFBF7] border border-[#D4AF37]/60 text-[#AA7A1E] font-heading font-bold text-xs tracking-[0.2em] shadow-sm hover:border-[#D4AF37] hover:shadow-md transition-all relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37] text-[10px]">❖</span>
              CLICK ME
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37] text-[10px]">❖</span>
            </button>
          </div>
        </div>

        {/* Glass Card Sample */}
        <div className="mb-5">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            Glass Card
          </span>
          <div className="p-4 rounded-xl bg-white/70 border border-[#D4AF37]/30 shadow-sm text-center relative">
            <div className="flex justify-center mb-1.5">
              <img src="/logo.png" alt="Card Logo" className="w-5 h-5 object-contain" />
            </div>
            <h4 className="font-heading text-xs font-bold text-[#111827] tracking-wider mb-1">
              Card Title
            </h4>
            <p className="text-[11px] text-[#111827]/70 font-sans leading-tight">
              This is a glassmorphism card example with golden border and soft shadow.
            </p>
            <div className="mt-2 flex items-center justify-center gap-1.5">
              <span className="h-px w-6 bg-[#D4AF37]/40" />
              <span className="text-[#D4AF37] text-[8px]">❖</span>
              <span className="h-px w-6 bg-[#D4AF37]/40" />
            </div>
          </div>
        </div>

        {/* Icon Style */}
        <div className="mb-6">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            Icon Style
          </span>
          <div className="flex items-center justify-around p-2.5 rounded-xl bg-white/50 border border-[#D4AF37]/20">
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-white/60">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-white/60">
              <Swords className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-white/60">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-white/60">
              <Feather className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-white/60">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>
        </div>
      </div>

      {/* Future Ready Sub-Card */}
      <div className="mt-4 p-4 rounded-xl bg-[#FDFBF7]/90 border border-[#D4AF37]/25 shadow-sm">
        <h4 className="text-[10px] font-bold text-[#AA7A1E] uppercase tracking-[0.2em] mb-2 font-heading text-center">
          FUTURE READY
        </h4>
        <ul className="space-y-1.5 text-[11px] text-[#111827]/75 font-sans">
          <li>Built with modular components</li>
          <li>Scroll-driven animations ready</li>
          <li>Parallax layers ready</li>
          <li>Extensible for multi-page expansion</li>
        </ul>
      </div>
    </div>
  )
}
