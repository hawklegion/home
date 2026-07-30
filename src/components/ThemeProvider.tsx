"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

type ThemeMode = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

interface ThemeContextValue {
  mode: ThemeMode
  resolved: ResolvedTheme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "hawklegion-theme"

function getStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "system"
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark" || stored === "system") return stored
  return "system"
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(mode: ThemeMode) {
  const resolved = mode === "system" ? getSystemTheme() : mode
  document.documentElement.classList.toggle("dark", resolved === "dark")
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("system")
  const [resolved, setResolved] = useState<ResolvedTheme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = getStoredMode()
    setMode(stored)
    const r = stored === "system" ? getSystemTheme() : stored
    setResolved(r)
    applyTheme(stored)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (mode === "system") {
        const r = getSystemTheme()
        setResolved(r)
        applyTheme("system")
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [mode, mounted])

  const toggle = useCallback(() => {
    setMode(prev => {
      const next: ThemeMode = prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
      localStorage.setItem(STORAGE_KEY, next)
      applyTheme(next)
      const r = next === "system" ? getSystemTheme() : next
      setResolved(r)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ mode, resolved, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
