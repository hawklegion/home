"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Home, MessageCircle, RefreshCw } from "lucide-react"
import Header from "@/components/Header"
import SacredBackground from "@/components/ambient/SacredBackground"
import { asset } from "@/lib/asset"

const DISCORD_URL = "https://discord.gg/yxQSdrUkCz"

interface ArchiveStatusPageProps {
  title: string
  subtitle: string
  code?: string
  statusLabel?: string
  technical?: string
  showEmblem?: boolean
  lockScroll?: boolean
  showRefresh?: boolean
}

export default function ArchiveStatusPage({
  title,
  subtitle,
  code,
  statusLabel,
  technical,
  showEmblem = false,
  lockScroll = false,
  showRefresh = false,
}: ArchiveStatusPageProps) {
  useEffect(() => {
    if (!lockScroll) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [lockScroll])
  return (
    <>
      <Header />
      <SacredBackground />

      <main
        className="flex-1 flex flex-col items-center justify-center px-4 pt-14 pb-6 relative z-10 overflow-hidden"
        style={{ minHeight: "100dvh" }}
      >
        <div className="flex flex-col items-center text-center max-w-2xl animate-fade-in-up">
          {showEmblem && (
            <img
              src={asset("/logo.png")}
              alt="Hawk Legion Sacred Emblem"
              className="w-24 h-24 md:w-28 md:h-28 object-contain mb-4 relative z-10"
            />
          )}

          <div className="flex items-center justify-center gap-3 w-full mb-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <span className="text-[#D4AF37] text-[10px]">❖</span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          </div>

          <h1
            className="font-heading text-3xl md:text-5xl font-bold tracking-[0.12em] md:tracking-[0.15em] leading-tight drop-shadow-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h1>

          <p
            className="mt-5 text-sm md:text-base font-medium leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </p>

          {code && (
            <div
              className="mt-9 w-full max-w-[280px] animate-fade-in-up"
              style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}
            >
              <div
                className="relative backdrop-blur-xl rounded-2xl px-8 py-7 card-hover-lift"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-card-border)",
                  boxShadow: "0 4px 24px var(--shadow-card), 0 20px 64px var(--shadow-card)",
                }}
              >
                <div className="absolute -top-[1px] -left-[1px] w-6 h-6 rounded-tl-xl pointer-events-none" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
                <div className="absolute -top-[1px] -right-[1px] w-6 h-6 rounded-tr-xl pointer-events-none" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
                <div className="absolute -bottom-[1px] -left-[1px] w-6 h-6 rounded-bl-xl pointer-events-none" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
                <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 rounded-br-xl pointer-events-none" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                <span className="block font-heading text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: "#AA7A1E" }}>
                  Status
                </span>
                <div className="mt-3 text-gold-gradient font-heading text-5xl md:text-6xl font-bold tracking-widest leading-none">
                  {code}
                </div>
                <div
                  className="mt-3 font-heading text-xs md:text-sm font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "var(--text-primary)" }}
                >
                  {statusLabel}
                </div>

                {technical && (
                  <>
                    <div className="mt-5 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
                    <div
                      className="mt-3 text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {technical}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
          >
            <Link
              href="/"
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl border border-[#D4AF37]/40 font-heading text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/10 hover:shadow-[0_0_28px_rgba(212,175,55,0.18)]"
              style={{ background: "var(--surface-card)", color: "var(--text-primary)" }}
            >
              <Home className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:-translate-x-0.5" />
              Return Home
            </Link>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl border border-[#D4AF37]/40 font-heading text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/10 hover:shadow-[0_0_28px_rgba(212,175,55,0.18)]"
              style={{ background: "var(--surface-card)", color: "var(--text-primary)" }}
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" />
              Join Discord
            </a>
            {showRefresh && (
              <button
                onClick={() => window.location.reload()}
                className="group flex items-center gap-2.5 px-6 py-3 rounded-xl border border-[#D4AF37]/40 font-heading text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/10 hover:shadow-[0_0_28px_rgba(212,175,55,0.18)]"
                style={{ background: "var(--surface-card)", color: "var(--text-primary)" }}
              >
                <RefreshCw className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:rotate-180" />
                Refresh
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
