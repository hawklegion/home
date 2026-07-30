"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { useGuildStats } from "@/hooks/useGuildStats"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const stats = useGuildStats()

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  return (
    <>
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border-l"
        style={{
          width: 264,
          padding: "22px 18px",
          gap: 6,
          transform: open ? "translateX(0)" : "translateX(105%)",
          background: "var(--surface-card)",
          borderColor: "var(--surface-card-border)",
        }}
      >
        <div className="flex items-center justify-between mb-2" style={{ padding: "4px 8px 16px" }}>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Hawk Legion"
              className="w-9 h-9 rounded-xl object-contain"
              style={{ boxShadow: "0 0 20px rgba(212,175,55,0.4)" }}
            />
            <span className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Hawk Legion
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
          </button>
        </div>

        <nav className="flex flex-col gap-1" style={{ marginTop: 4 }}>
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </Link>
          <Link
            href="/timezone"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Timezone
          </Link>
        </nav>

        <div style={{ flex: 1 }} />

        <div
          className="rounded-xl p-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--surface-card-border)",
          }}
        >
          <div
            className="text-[10.5px] uppercase tracking-wider font-bold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Status
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#36f59a", boxShadow: "0 0 10px #36f59a" }} />
              Members: {stats.members}
            </div>
            <div className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#D4AF37", boxShadow: "0 0 10px rgba(212,175,55,0.6)" }} />
              Guild: {stats.guild}
            </div>
            <div className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#9b5cff", boxShadow: "0 0 10px rgba(155,92,255,0.5)" }} />
              Elite: {stats.elite}
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-2.5 mt-3 rounded-xl p-2.5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--surface-card-border)",
          }}
        >
          <img
            src="/logo.png"
            alt=""
            className="w-9 h-9 rounded-full object-cover"
            style={{ border: "2px solid rgba(212,175,55,0.5)", boxShadow: "0 0 12px rgba(212,175,55,0.3)" }}
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>Hawk Legion</div>
            <div className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>@hawklegion</div>
          </div>
        </div>
      </div>
    </>
  )
}
