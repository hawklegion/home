"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Sidebar from "./Sidebar"
import { asset } from "@/lib/asset"

const BREADCRUMB_MAP: Record<string, string> = {
  "/": "Home",
  "/timezone": "Timezone",
}

const KNOWN_ROUTES = new Set(["/", "/timezone", "/401", "/403", "/500"])

const ERROR_LABEL_MAP: Record<string, string> = {
  "/401": "Error 401",
  "/403": "Error 403",
  "/500": "Error 500",
}

function crumbLabel(crumb: string): string {
  if (ERROR_LABEL_MAP[crumb]) return ERROR_LABEL_MAP[crumb]
  if (BREADCRUMB_MAP[crumb]) return BREADCRUMB_MAP[crumb]
  if (!KNOWN_ROUTES.has(crumb)) return "Error 404"
  return crumb.slice(1)
}

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map(seg => "/" + seg)
  if (crumbs.length === 0) crumbs.push("/")

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur-xl border-b border-[#D4AF37]/20 transition-all" style={{ background: "var(--surface-card)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-11 md:h-12">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col items-center justify-center w-8 h-8 rounded-lg gap-[3px] transition-all duration-200 hover:bg-white/10 cursor-pointer"
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.05)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              <span className="block w-4 h-[1.5px] rounded-full transition-all" style={{ background: "var(--text-primary)" }} />
              <span className="block w-4 h-[1.5px] rounded-full transition-all" style={{ background: "var(--text-primary)" }} />
              <span className="block w-4 h-[1.5px] rounded-full transition-all" style={{ background: "var(--text-primary)" }} />
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src={asset("/logo.png")}
                alt="Hawk Legion Logo"
                className="w-6 h-6 md:w-7 md:h-7 object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-sm"
              />
              <span className="font-heading text-xs md:text-sm font-bold tracking-[0.2em]" style={{ color: "var(--text-primary)" }}>
                HAWK LEGION
              </span>
            </Link>
            <span className="hidden sm:flex items-center gap-1 ml-2 text-xs" style={{ color: "var(--text-secondary)" }}>
              {crumbs.map((crumb, i) => (
                <span key={crumb} className="flex items-center gap-1">
                  {i > 0 && <span className="mx-0.5 opacity-50">✦</span>}
                  <Link
                    href={crumb}
                    className="transition-colors duration-200 hover:text-[#D4AF37]"
                  >
                    {crumbLabel(crumb)}
                  </Link>
                </span>
              ))}
            </span>
          </div>
          <div />
        </div>
      </header>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
