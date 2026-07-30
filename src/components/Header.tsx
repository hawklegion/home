"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b border-[#D4AF37]/20 transition-all" style={{ background: "var(--surface-card)" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14 md:h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Hawk Legion Logo"
            className="w-7 h-7 md:w-8 md:h-8 object-contain transition-transform group-hover:scale-105 drop-shadow-sm"
          />
          <span className="font-heading text-sm md:text-base font-bold tracking-[0.2em]" style={{ color: "var(--text-primary)" }}>
            HAWK LEGION
          </span>
        </Link>
        <Link
          href="/timezone"
          className="flex items-center gap-2 text-[#AA7A1E] hover:text-[#D4AF37] transition-colors"
        >
          <span className="text-[#D4AF37] text-xs">❖</span>
          <span className="font-heading text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
            TIMEZONE
          </span>
        </Link>
      </div>
    </header>
  )
}
