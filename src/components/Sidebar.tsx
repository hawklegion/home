"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Home, Clock, Sun, Moon, Monitor } from "lucide-react"
import { useGuildStats } from "@/hooks/useGuildStats"
import { useTheme } from "./ThemeProvider"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/timezone", label: "Timezone", icon: Clock },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const stats = useGuildStats()
  const { mode, toggle } = useTheme()

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
                  boxShadow: active ? "inset 0 0 0 1px rgba(212,175,55,0.3)" : "none",
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
          className="rounded-xl p-3 mb-2"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--surface-card-border)",
          }}
        >
          <div
            className="text-[10.5px] uppercase tracking-wider font-bold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Theme
          </div>
          <div className="flex gap-1.5">
            {(["light", "dark", "system"] as const).map(t => (
              <button
                key={t}
                onClick={mode === t ? undefined : toggle}
                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                style={{
                  background: mode === t
                    ? "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.06))"
                    : "transparent",
                  border: mode === t ? "1px solid rgba(212,175,55,0.3)" : "1px solid var(--surface-card-border)",
                  color: mode === t ? "#D4AF37" : "var(--text-secondary)",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  if (mode !== t) {
                    e.currentTarget.style.color = "var(--text-primary)"
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)"
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                  }
                }}
                onMouseLeave={e => {
                  if (mode !== t) {
                    e.currentTarget.style.color = "var(--text-secondary)"
                    e.currentTarget.style.borderColor = "var(--surface-card-border)"
                    e.currentTarget.style.background = "transparent"
                  }
                }}
              >
                {t === "light" && <Sun className="w-3.5 h-3.5" />}
                {t === "dark" && <Moon className="w-3.5 h-3.5" />}
                {t === "system" && (
                  <span className="relative w-3.5 h-3.5">
                    <Sun className="w-3.5 h-3.5 absolute top-0 left-0" style={{ clipPath: "inset(0 50% 0 0)" }} />
                    <Moon className="w-3.5 h-3.5 absolute top-0 right-0" style={{ clipPath: "inset(0 0 0 50%)" }} />
                  </span>
                )}
                {t === "light" && "Light"}
                {t === "dark" && "Dark"}
                {t === "system" && "System"}
              </button>
            ))}
          </div>
        </div>

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
            Counter
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
              <span>👥</span>
              <span>Members: {stats.members}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
              <span>🛡️</span>
              <span>Guild: {stats.guild}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-primary)" }}>
              <span>⚜️</span>
              <span>Elite: {stats.elite}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
