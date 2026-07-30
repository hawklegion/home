"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, Plus, Minus, ChevronDown } from "lucide-react"
import { formatOffset } from "@/lib/utils"

interface TimeOverrideModalProps {
  open: boolean
  onClose: () => void
  currentOffset: number
  onAdjust: (deltaMinutes: number) => void
  onCalculate: (userDate: Date) => void
  onReset: () => void
  isManual: boolean
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export default function TimeOverrideModal({
  open,
  onClose,
  currentOffset,
  onCalculate,
  onAdjust,
  onReset,
  isManual,
}: TimeOverrideModalProps) {
  const now = new Date()
  const [liveTime, setLiveTime] = useState("")
  const [liveDate, setLiveDate] = useState("")

  const [y, setY] = useState(String(now.getFullYear()))
  const [m, setM] = useState(String(now.getMonth() + 1).padStart(2, "0"))
  const [d, setD] = useState(String(now.getDate()).padStart(2, "0"))

  const tick = useCallback(() => {
    const t = new Date(Date.now() + currentOffset * 60_000 + new Date().getTimezoneOffset() * 60_000)
    setLiveTime(t.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }))
    setLiveDate(t.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))
  }, [currentOffset])

  useEffect(() => {
    if (!open) return
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [open, tick])

  const offsetHours = Math.floor(Math.abs(currentOffset) / 60)
  const offsetMins = Math.abs(currentOffset) % 60
  const sign = currentOffset >= 0 ? "+" : "-"
  const offsetStr = `UTC ${sign}${pad(offsetHours)}:${pad(offsetMins)}`

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            <div className="backdrop-blur-xl rounded-2xl p-7 border border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/20" style={{ background: "var(--surface-card)" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h2 className="font-heading text-base font-bold text-[#D4AF37] tracking-wider">
                    MY CLOCK IS WRONG
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                </button>
              </div>

              <div className="text-center mb-6 p-4 rounded-xl" style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)" }}>
                <div className="text-3xl font-mono font-bold tracking-widest tabular-nums" style={{ color: "var(--text-primary)" }}>
                  {liveTime}
                </div>
                <div className="mt-1 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  {liveDate}
                </div>
                <div className="mt-2 text-[10px] font-heading font-bold uppercase tracking-wider text-[#D4AF37]">
                  {offsetStr}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 font-heading" style={{ color: "var(--text-secondary)" }}>
                  Adjust offset
                </label>
                <div className="flex items-center gap-2">
                  <button onClick={() => onAdjust(-60)} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl border text-sm font-bold transition-all hover:bg-[#D4AF37]/10" style={{ borderColor: "var(--input-border)", color: "var(--text-primary)" }}>
                    <Minus className="w-3.5 h-3.5" /> 1h
                  </button>
                  <button onClick={() => onAdjust(-30)} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl border text-sm font-bold transition-all hover:bg-[#D4AF37]/10" style={{ borderColor: "var(--input-border)", color: "var(--text-primary)" }}>
                    <Minus className="w-3.5 h-3.5" /> 30m
                  </button>
                  <button onClick={() => onAdjust(30)} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl border text-sm font-bold transition-all hover:bg-[#D4AF37]/10" style={{ borderColor: "var(--input-border)", color: "var(--text-primary)" }}>
                    <Plus className="w-3.5 h-3.5" /> 30m
                  </button>
                  <button onClick={() => onAdjust(60)} className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl border text-sm font-bold transition-all hover:bg-[#D4AF37]/10" style={{ borderColor: "var(--input-border)", color: "var(--text-primary)" }}>
                    <Plus className="w-3.5 h-3.5" /> 1h
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 font-heading" style={{ color: "var(--text-secondary)" }}>
                  Date
                </label>
                <div className="flex items-center gap-2 rounded-xl p-2 border" style={{ background: "var(--input-bg)", borderColor: "var(--input-border)" }}>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={y}
                      onChange={e => setY(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="YYYY"
                      className="w-full bg-transparent text-center font-mono text-sm focus:outline-none"
                      style={{ color: "var(--text-primary)" }}
                      maxLength={4}
                    />
                  </div>
                  <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>/</span>
                  <div className="relative flex-1">
                    <select
                      value={m}
                      onChange={e => setM(e.target.value)}
                      className="w-full appearance-none bg-transparent text-center font-mono text-sm focus:outline-none cursor-pointer"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={pad(i + 1)}>{pad(i + 1)}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: "var(--text-secondary)" }} />
                  </div>
                  <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>/</span>
                  <div className="relative flex-1">
                    <select
                      value={d}
                      onChange={e => setD(e.target.value)}
                      className="w-full appearance-none bg-transparent text-center font-mono text-sm focus:outline-none cursor-pointer"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={pad(i + 1)}>{pad(i + 1)}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: "var(--text-secondary)" }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    const userDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d))
                    if (!isNaN(userDate.getTime()) && userDate.getTime() <= Date.now() + 86400000) {
                      onCalculate(userDate)
                    }
                    onClose()
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#AA7A1E] via-[#D4AF37] to-[#AA7A1E] text-white font-bold text-sm tracking-wider shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30 transition-shadow"
                >
                  CALCULATE FROM DATE
                </button>
                {isManual && (
                  <button
                    onClick={() => { onReset(); onClose() }}
                    className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Reset to Automatic Detection
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
