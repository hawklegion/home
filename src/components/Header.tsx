"use client"

import { useState } from "react"
import Link from "next/link"
import Sidebar from "./Sidebar"

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl border-b border-[#D4AF37]/20 transition-all" style={{ background: "var(--surface-card)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-11 md:h-12">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Hawk Legion Logo"
              className="w-6 h-6 md:w-7 md:h-7 object-contain transition-transform group-hover:scale-105 drop-shadow-sm"
            />
            <span className="font-heading text-xs md:text-sm font-bold tracking-[0.2em]" style={{ color: "var(--text-primary)" }}>
              HAWK LEGION
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center justify-center w-8 h-8 rounded-lg gap-[3px] transition-colors hover:bg-white/10 cursor-pointer"
          >
            <span className="block w-4 h-[1.5px] rounded-full transition-all" style={{ background: "var(--text-primary)" }} />
            <span className="block w-4 h-[1.5px] rounded-full transition-all" style={{ background: "var(--text-primary)" }} />
            <span className="block w-4 h-[1.5px] rounded-full transition-all" style={{ background: "var(--text-primary)" }} />
          </button>
        </div>
      </header>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
