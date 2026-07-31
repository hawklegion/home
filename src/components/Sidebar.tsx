"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Home, Clock, FileText } from "lucide-react"
import { useGuildStats } from "@/hooks/useGuildStats"
import { useTheme } from "./ThemeProvider"
import { asset } from "@/lib/asset"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/apply", label: "Apply", icon: FileText },
  { href: "/timezone", label: "Timezone", icon: Clock },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const stats = useGuildStats()
  const { mode, resolved, toggle } = useTheme()

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
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border-r"
        style={{
          width: 264,
          padding: "22px 18px",
          gap: 6,
          transform: open ? "translateX(0)" : "translateX(-105%)",
          background: "var(--surface-card)",
          borderColor: "var(--surface-card-border)",
        }}
      >
        <div className="flex items-center justify-between mb-2" style={{ padding: "4px 8px 16px" }}>
          <div className="flex items-center gap-3">
            <img
              src={asset("/logo.png")}
              alt="Hawk Legion"
              className="w-9 h-9 rounded-xl object-contain"
            />
            <span className="font-heading text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              Hawk Legion
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
          >
            <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
          </button>
        </div>

        <nav className="flex flex-col gap-1" style={{ marginTop: 4 }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  color: active ? "#D4AF37" : "var(--text-secondary)",
                  background: active
                    ? "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.06))"
                    : "transparent",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                    e.currentTarget.style.color = "var(--text-primary)"
                    e.currentTarget.style.transform = "translateX(4px)"
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent"
                    e.currentTarget.style.color = "var(--text-secondary)"
                    e.currentTarget.style.transform = "translateX(0)"
                  }
                }}
              >
                <Icon className="w-[18px] h-[18px]" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div style={{ flex: 1 }} />

        <div
          className="rounded-xl p-3 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--surface-card-border)",
          }}
        >
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-xs font-bold tracking-wider" style={{ color: "var(--text-secondary)" }}>
              {mode === "system" ? "System" : mode === "light" ? "Light" : "Dark"}
            </span>
            {mode === "system" && (
              <span className="font-heading text-[9px] tracking-wide" style={{ color: "var(--text-secondary)", opacity: 0.55 }}>
                Detected: {resolved === "dark" ? "Dark" : "Light"}
              </span>
            )}
          </div>
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10"
            title={`Current: ${mode}`}
          >
            {mode === "system" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <g stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </g>
                <g stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}>
                  <circle cx="8" cy="8" r="3" />
                  <line x1="8" y1="1.5" x2="8" y2="3.5" />
                  <line x1="2" y1="8" x2="3.5" y2="8" />
                  <line x1="3.5" y1="3.5" x2="4.5" y2="4.5" />
                  <line x1="12.5" y1="3.5" x2="11.5" y2="4.5" />
                  <line x1="1.5" y1="12.5" x2="3.5" y2="11.5" />
                </g>
              </svg>
            ) : mode === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        <div
          className="rounded-xl p-3"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--surface-card-border)",
          }}
        >
          <div
            className="flex items-center gap-2 font-heading text-[10.5px] uppercase tracking-wider font-bold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Live Counter
            <span className="w-2 h-2 rounded-full" style={{ background: "#36f59a", animation: "pulse-dot 1.6s ease-in-out infinite" }} />
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { icon: "👥", label: "Members", value: stats.members },
              { icon: "🛡️", label: "Guild", value: stats.guild },
              { icon: "⚜️", label: "Elite", value: stats.elite },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[13px] shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--surface-card-border)",
                  }}
                >
                  {icon}
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {label}
                </span>
                <span className="ml-auto text-sm font-bold tabular-nums" style={{ color: "#D4AF37" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}