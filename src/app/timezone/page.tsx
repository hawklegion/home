"use client"

import Header from "@/components/Header"
import SacredBackground from "@/components/ambient/SacredBackground"
import { useTimezoneEngine } from "@/hooks/useTimezoneEngine"
import { useLiveClock } from "@/hooks/useLiveClock"
import TimeOverrideModal from "@/components/timezone/TimeOverrideModal"
import { showToast } from "@/components/ui/Toast"
import { Compass, Copy, Clock as ClockIcon } from "lucide-react"
import { asset } from "@/lib/asset"

export default function TimezonePage() {
  const {
    effectiveOffset,
    offsetLabel,
    isManual,
    modalOpen,
    setModalOpen,
    adjustOffset,
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

      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-14 pb-4 relative z-10 max-w-7xl mx-auto w-full overflow-hidden" style={{ height: "100dvh" }}>
        <div className="flex flex-col items-center animate-fade-in-up text-center">
          <div className="relative mb-2">
            <img
              src={asset("/logo.png")}
              alt="Hawk Legion Sacred Emblem"
              className="w-24 h-24 md:w-28 md:h-28 object-contain relative z-10"
            />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-[0.2em] drop-shadow-sm" style={{ color: "var(--text-primary)" }}>
            HAWK LEGION
          </h1>
          <p className="mt-1 text-[10px] md:text-xs text-[#AA7A1E] tracking-[0.35em] font-semibold uppercase">
            {process.env.NODE_ENV === "development"
              ? "\u2022 Darkness leads the Blind. \u2022"
              : "\u2022 SACRED ORDER. ETERNAL PURPOSE. \u2022"}
          </p>
        </div>

        <div className="w-full max-w-md relative animate-fade-in-up mt-4 mb-3" style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}>
          <div
            className="relative backdrop-blur-xl rounded-2xl p-7 md:p-8 card-hover-lift"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--surface-card-border)",
              boxShadow: "0 4px 24px var(--shadow-card), 0 20px 64px var(--shadow-card)",
            }}
          >
            <div className="absolute -top-[1px] -left-[1px] w-7 h-7 rounded-tl-xl pointer-events-none" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
            <div className="absolute -top-[1px] -right-[1px] w-7 h-7 rounded-tr-xl pointer-events-none" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
            <div className="absolute -bottom-[1px] -left-[1px] w-7 h-7 rounded-bl-xl pointer-events-none" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
            <div className="absolute -bottom-[1px] -right-[1px] w-7 h-7 rounded-br-xl pointer-events-none" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            <div className="flex items-center justify-center gap-2 mb-5">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] font-heading" style={{ color: "var(--text-primary)" }}>
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
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs transition-colors group-hover:text-[#AA7A1E]" style={{ color: "var(--text-secondary)" }}>
                <span>Click to copy</span>
                <Copy className="w-3.5 h-3.5" />
              </div>
            </button>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-mono font-bold tracking-widest tabular-nums" style={{ color: "var(--text-primary)" }} suppressHydrationWarning>
                {time}
              </div>
              <div className="mt-2 text-sm md:text-base font-medium" style={{ color: "var(--text-secondary)" }} suppressHydrationWarning>
                {date}
              </div>
            </div>

            <div className="mt-7 flex justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 text-xs md:text-sm font-medium transition-all shadow-sm"
                style={{ background: "var(--surface-card)", color: "var(--text-primary)" }}
              >
                <ClockIcon className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                My clock is wrong
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md text-center animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
          <div className="flex items-center justify-center gap-3 text-[10px] md:text-xs">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <span className="font-heading font-semibold tracking-[0.15em] flex items-center gap-1.5" style={{ color: "#AA7A1E" }}>
              <span style={{ color: "#D4AF37" }}>❖</span> Provided by @nxco_1226 <span style={{ color: "#D4AF37" }}>❖</span>
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          </div>
        </div>
      </main>

      <TimeOverrideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        currentOffset={effectiveOffset}
        onAdjust={adjustOffset}
        onCalculate={calculateOffset}
        onReset={resetToAuto}
        isManual={isManual}
      />
    </>
  )
}
