"use client"

import Header from "@/components/Header"
import SacredBackground from "@/components/ambient/SacredBackground"
import { useTimezoneEngine } from "@/hooks/useTimezoneEngine"
import { useLiveClock } from "@/hooks/useLiveClock"
import TimeOverrideModal from "@/components/timezone/TimeOverrideModal"
import { showToast } from "@/components/ui/Toast"
import { Compass, Copy, Clock as ClockIcon } from "lucide-react"

export default function HomePage() {
  const {
    effectiveOffset,
    offsetLabel,
    isManual,
    modalOpen,
    setModalOpen,
    calculateOffset,
    resetToAuto,
  } = useTimezoneEngine()

  const { time, date } = useLiveClock(effectiveOffset)

  function handleCopy() {
    navigator.clipboard.writeText(offsetLabel)
    showToast("Copied to clipboard!")
  }

  return (
    <>
      <Header />
      <SacredBackground />

      <main className="flex-1 flex flex-col items-center justify-start px-4 pt-20 pb-20 relative z-10 max-w-7xl mx-auto w-full">
        {/* Hero Section: Logo & Sacred Order Title */}
        <div className="flex flex-col items-center mt-6 mb-8 animate-gold-bloom text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-3xl scale-150" />
            <img
              src="/logo.png"
              alt="Hawk Legion Sacred Emblem"
              className="w-36 h-36 md:w-44 md:h-44 object-contain relative z-10 drop-shadow-[0_12px_24px_rgba(212,175,55,0.35)]"
            />
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-[0.2em] text-[#111827] drop-shadow-sm">
            HAWK LEGION
          </h1>
          <p className="mt-2 text-xs md:text-sm text-[#AA7A1E] tracking-[0.35em] font-semibold uppercase">
            &bull; SACRED ORDER. ETERNAL PURPOSE. &bull;
          </p>
        </div>

        {/* YOUR TIMEZONE Card */}
        <div className="w-full max-w-md relative animate-sunburst mb-12">
          <div
            className="relative backdrop-blur-xl bg-white/80 rounded-2xl p-7 md:p-8 card-glow"
            style={{
              border: "1px solid rgba(212, 175, 55, 0.4)",
              boxShadow: `
                0 0 0 1px rgba(212, 175, 55, 0.15),
                inset 0 0 0 1px rgba(212, 175, 55, 0.08),
                0 4px 24px rgba(212, 175, 55, 0.08),
                0 20px 64px rgba(212, 175, 55, 0.06)
              `,
            }}
          >
            {/* Corner Filigree Ornaments */}
            <div className="absolute -top-[1px] -left-[1px] w-7 h-7 rounded-tl-xl pointer-events-none" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
            <div className="absolute -top-[1px] -right-[1px] w-7 h-7 rounded-tr-xl pointer-events-none" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
            <div className="absolute -bottom-[1px] -left-[1px] w-7 h-7 rounded-bl-xl pointer-events-none" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
            <div className="absolute -bottom-[1px] -right-[1px] w-7 h-7 rounded-br-xl pointer-events-none" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            <div className="flex items-center justify-center gap-2 mb-5">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#AA7A1E] uppercase tracking-[0.25em] font-heading">
                YOUR TIMEZONE
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="group w-full text-center mb-6 focus:outline-none"
              title="Click to copy UTC offset"
            >
              <div className="text-gold-gradient text-2xl md:text-3xl font-heading font-bold tracking-wider">
                {offsetLabel}
              </div>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-[#111827]/50 group-hover:text-[#AA7A1E] transition-colors">
                <span>Click to copy</span>
                <Copy className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Live Ticking Time & Date */}
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-mono font-bold tracking-widest text-[#111827] tabular-nums" suppressHydrationWarning>
                {time}
              </div>
              <div className="mt-2 text-sm md:text-base text-[#111827]/75 font-medium" suppressHydrationWarning>
                {date}
              </div>
            </div>

            {/* My Clock Is Wrong Button */}
            <div className="mt-7 flex justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 text-xs md:text-sm font-medium text-[#111827]/80 hover:text-[#111827] transition-all shadow-sm"
              >
                <ClockIcon className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                My clock is wrong
              </button>
            </div>
          </div>
        </div>

        {/* Section Divider & Credit */}
        <div className="w-full max-w-4xl my-8 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-[#AA7A1E]/70">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <span className="font-heading font-semibold tracking-[0.15em] flex items-center gap-2">
              <span className="text-[#D4AF37]">❖</span> Provided by @nxco_1226 <span className="text-[#D4AF37]">❖</span>
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          </div>
        </div>
      </main>

      {/* Interactive Modal */}
      <TimeOverrideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        currentOffset={effectiveOffset}
        onCalculate={calculateOffset}
        onReset={resetToAuto}
        isManual={isManual}
      />
    </>
  )
}
