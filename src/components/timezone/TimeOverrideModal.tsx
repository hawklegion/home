"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock } from "lucide-react"
import { formatOffset } from "@/lib/utils"

interface TimeOverrideModalProps {
  open: boolean
  onClose: () => void
  currentOffset: number
  onCalculate: (userDate: Date) => void
  onReset: () => void
  isManual: boolean
}

export default function TimeOverrideModal({
  open,
  onClose,
  currentOffset,
  onCalculate,
  onReset,
  isManual,
}: TimeOverrideModalProps) {
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, "0"))
  const [day, setDay] = useState(String(new Date().getDate()).padStart(2, "0"))
  const [hours, setHours] = useState(String(new Date().getHours()).padStart(2, "0"))
  const [minutes, setMinutes] = useState(String(new Date().getMinutes()).padStart(2, "0"))
  const [error, setError] = useState("")

  function handleCalculate() {
    setError("")
    const y = parseInt(year)
    const m = parseInt(month) - 1
    const d = parseInt(day)
    const h = parseInt(hours)
    const min = parseInt(minutes)

    if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(h) || isNaN(min)) {
      setError("Please fill in all fields correctly.")
      return
    }

    const userDate = new Date(y, m, d, h, min)
    if (isNaN(userDate.getTime())) {
      setError("Invalid date or time.")
      return
    }

    if (userDate.getTime() > Date.now() + 86400000) {
      setError("The date cannot be in the future.")
      return
    }

    onCalculate(userDate)
    onClose()
  }

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
            <div className="backdrop-blur-xl bg-[#111827]/95 border border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/20 rounded-2xl p-7">
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
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              <p className="text-sm text-white/60 mb-6 leading-relaxed">
                Enter your current local date and time exactly as shown on your device.
                We&apos;ll use this to calculate your correct timezone.
              </p>

              {isManual && (
                <div className="mb-5 p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-sm text-white/70">
                  Current override:{" "}
                  <span className="font-semibold text-[#D4AF37]">{formatOffset(currentOffset)}</span>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-medium text-white/40 uppercase tracking-[0.2em] mb-2 font-heading">
                    Date
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="YYYY"
                      className="w-[90px] px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-center text-white focus:border-[#D4AF37]/60 transition-colors placeholder:text-white/20"
                      maxLength={4}
                    />
                    <span className="text-white/30 font-heading text-sm">/</span>
                    <input
                      type="text"
                      value={month}
                      onChange={(e) => setMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                      placeholder="MM"
                      className="w-[72px] px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-center text-white focus:border-[#D4AF37]/60 transition-colors placeholder:text-white/20"
                      maxLength={2}
                    />
                    <span className="text-white/30 font-heading text-sm">/</span>
                    <input
                      type="text"
                      value={day}
                      onChange={(e) => setDay(e.target.value.replace(/\D/g, "").slice(0, 2))}
                      placeholder="DD"
                      className="w-[72px] px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-center text-white focus:border-[#D4AF37]/60 transition-colors placeholder:text-white/20"
                      maxLength={2}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-white/40 uppercase tracking-[0.2em] mb-2 font-heading">
                    Time (24h)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => setHours(e.target.value.replace(/\D/g, "").slice(0, 2))}
                      placeholder="HH"
                      className="w-[72px] px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-center text-white focus:border-[#D4AF37]/60 transition-colors placeholder:text-white/20"
                      maxLength={2}
                    />
                    <span className="text-white/30 font-heading text-base">:</span>
                    <input
                      type="text"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value.replace(/\D/g, "").slice(0, 2))}
                      placeholder="MM"
                      className="w-[72px] px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-center text-white focus:border-[#D4AF37]/60 transition-colors placeholder:text-white/20"
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-400 font-medium">{error}</p>
              )}

              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={handleCalculate}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#AA7A1E] via-[#D4AF37] to-[#AA7A1E] text-white font-bold text-sm tracking-wider shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30 transition-shadow"
                >
                  CALCULATE TIMEZONE
                </button>
                {isManual && (
                  <button
                    onClick={() => { onReset(); onClose() }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white/50 hover:text-white/70 transition-colors"
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
