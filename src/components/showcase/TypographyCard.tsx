"use client"

import { Shield, Sun, Swords, Scroll, Smartphone } from "lucide-react"

export default function TypographyCard() {
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
            TYPOGRAPHY
          </h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <span className="text-[#D4AF37] text-[10px]">❖</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
        </div>

        {/* Headings */}
        <div className="mb-5">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            HEADINGS (CINZEL)
          </span>
          <div className="space-y-1 text-center bg-white/50 p-3 rounded-xl border border-[#D4AF37]/15">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#AA7A1E] tracking-wide">
              H1 Heading
            </h1>
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-[#111827] tracking-wide">
              H2 Heading
            </h2>
            <h3 className="font-heading text-base md:text-lg font-medium text-[#111827]/80 tracking-wide">
              H3 Heading
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="mb-5">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            BODY (PLUS JAKARTA SANS)
          </span>
          <p className="text-xs text-[#111827]/70 font-sans leading-relaxed bg-white/50 p-3 rounded-xl border border-[#D4AF37]/15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Button Example */}
        <div className="mb-6">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            BUTTON EXAMPLE
          </span>
          <div className="flex justify-center">
            <button className="px-5 py-2.5 rounded-lg bg-white/80 border border-[#D4AF37]/40 text-xs font-heading font-bold text-[#AA7A1E] tracking-wider hover:bg-[#D4AF37]/10 transition-colors shadow-sm">
              BUTTON EXAMPLE
            </button>
          </div>
        </div>
      </div>

      {/* Design Details Sub-Card */}
      <div className="mt-4 p-4 rounded-xl bg-[#FDFBF7]/90 border border-[#D4AF37]/25 shadow-sm">
        <h4 className="text-[10px] font-bold text-[#AA7A1E] uppercase tracking-[0.2em] mb-2.5 font-heading text-center">
          DESIGN DETAILS
        </h4>
        <ul className="space-y-2 text-[11px] text-[#111827]/80 font-sans">
          <li className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Glassmorphism with golden edges</span>
          </li>
          <li className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Soft golden bloom & ambient lighting</span>
          </li>
          <li className="flex items-center gap-2">
            <Swords className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Subtle medieval ornaments & filigree</span>
          </li>
          <li className="flex items-center gap-2">
            <Scroll className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Clean, premium, modern, and sacred</span>
          </li>
          <li className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Mobile-first & fully responsive</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
