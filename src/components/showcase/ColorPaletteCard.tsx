"use client"

export default function ColorPaletteCard() {
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
            COLOR PALETTE
          </h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <span className="text-[#D4AF37] text-[10px]">❖</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
        </div>

        {/* Surfaces */}
        <div className="mb-5">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            SURFACES
          </span>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center">
              <div className="w-full h-12 rounded-lg bg-[#FFFFFF] border border-gray-200 shadow-sm" />
              <span className="text-[10px] font-mono text-[#111827]/70 font-semibold mt-1">#FFFFFF</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-12 rounded-lg bg-[#FDFBF7] border border-[#D4AF37]/20 shadow-sm" />
              <span className="text-[10px] font-mono text-[#111827]/70 font-semibold mt-1">#FDFBF7</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-12 rounded-lg bg-[#FAFAFA] border border-gray-200 shadow-sm" />
              <span className="text-[10px] font-mono text-[#111827]/70 font-semibold mt-1">#FAFAFA</span>
            </div>
          </div>
        </div>

        {/* Accents */}
        <div className="mb-5">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            ACCENTS
          </span>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center">
              <div className="w-full h-12 rounded-lg bg-[#D4AF37] shadow-sm shadow-[#D4AF37]/20" />
              <span className="text-[10px] font-mono text-[#111827]/70 font-semibold mt-1">#D4AF37</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-12 rounded-lg bg-[#AA7A1E] shadow-sm" />
              <span className="text-[10px] font-mono text-[#111827]/70 font-semibold mt-1">#AA7A1E</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-12 rounded-lg bg-[#F4E0A5] border border-[#D4AF37]/30 shadow-sm" />
              <span className="text-[10px] font-mono text-[#111827]/70 font-semibold mt-1">#F4E0A5</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="mb-5">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            TEXT
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center">
              <div className="w-full h-10 rounded-lg bg-[#111827] shadow-sm" />
              <span className="text-[10px] font-mono text-[#111827]/70 font-semibold mt-1">#111827</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-10 rounded-lg bg-[#D4AF37] shadow-sm" />
              <span className="text-[10px] font-mono text-[#111827]/70 font-semibold mt-1">#D4AF37</span>
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="mb-6">
          <span className="block text-[10px] font-bold text-[#111827]/40 uppercase tracking-[0.2em] mb-2 font-heading">
            AMBIENT GLOW
          </span>
          <div className="w-full py-2.5 px-3 rounded-lg bg-white/60 border border-[#D4AF37]/30 flex items-center justify-center text-center shadow-inner">
            <span className="text-xs font-mono font-medium text-[#AA7A1E]">
              rgba(212, 175, 55, 0.12)
            </span>
          </div>
        </div>
      </div>

      {/* Background & Ambience Sub-Card */}
      <div className="mt-4 p-4 rounded-xl bg-[#FDFBF7]/90 border border-[#D4AF37]/25 shadow-sm">
        <h4 className="text-[10px] font-bold text-[#AA7A1E] uppercase tracking-[0.2em] mb-2 font-heading text-center">
          BACKGROUND & AMBIENCE
        </h4>
        <ul className="space-y-1.5 text-[11px] text-[#111827]/75 font-sans leading-tight">
          <li><span className="font-semibold text-[#111827]">Particles:</span> slow floating dust, light specks, subtle feathers</li>
          <li><span className="font-semibold text-[#111827]">Movement:</span> ultra-slow, ethereal, weightless</li>
          <li><span className="font-semibold text-[#111827]">Performance:</span> GPU accelerated, optimized</li>
          <li><span className="font-semibold text-[#111827]">Blend Mode:</span> screen / lighten for glow</li>
        </ul>
      </div>
    </div>
  )
}
