"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock } from "lucide-react"
import { formatOffset } from "@/lib/utils"

interface TimezoneModalProps {
  open: boolean
  onClose: () => void
  currentOffset: number
  onCalculate: (userDate: Date) => void
  onReset: () => void
  isManual: boolean
}

export default function TimezoneModal({
  open,
  onClose,
  currentOffset,
  onCalculate,
  onReset,
  isManual,
}: TimezoneModalProps) {
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [month, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, "0"))
  const [day, setDay] = useState(String(new Date().getDate()).padStart(2, "0"))
  const [hours, setHours] = useState(String(new Date().getHours()).padStart(2, "0"))
  const [minutes, setMinutes] = useState(String(new Date().getMinutes()).padStart(2, "0"))
  const [error, setError] = useState("")

  function handleSubmit() {
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
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            <div className="backdrop-blur-xl bg-white/90 border border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <h2 className="font-heading text-lg font-bold text-[#111827]">
                    Manual Time Override
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5 text-[#111827]/60" />
                </button>
              </div>

              <p className="text-sm text-[#111827]/60 mb-5 leading-relaxed">
                Enter your current local date and time. The system will
                calculate your timezone offset automatically.
              </p>

              {isManual && (
                <div className="mb-4 p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-sm text-[#111827]/70">
                  Current override: <span className="font-semibold text-[#D4AF37]">{formatOffset(currentOffset)}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#111827]/50 uppercase tracking-wider mb-1.5">
                    Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="YYYY"
                      className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/20 text-sm font-mono text-center text-[#111827] focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                      maxLength={4}
                    />
                    <input
                      type="text"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      placeholder="MM"
                      className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/20 text-sm font-mono text-center text-[#111827] focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                      maxLength={2}
                    />
                    <input
                      type="text"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      placeholder="DD"
                      className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/20 text-sm font-mono text-center text-[#111827] focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                      maxLength={2}
                    />
                  </div>
                  <div className="flex justify-between mt-1 px-1">
                    <span className="text-[10px] text-[#111827]/40 font-mono">Year</span>
                    <span className="text-[10px] text-[#111827]/40 font-mono">Month</span>
                    <span className="text-[10px] text-[#111827]/40 font-mono">Day</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111827]/50 uppercase tracking-wider mb-1.5">
                    Time (24h)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      placeholder="HH"
                      className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/20 text-sm font-mono text-center text-[#111827] focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                      maxLength={2}
                    />
                    <input
                      type="text"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      placeholder="MM"
                      className="w-full px-3 py-2 rounded-xl bg-[#FDFBF7] border border-[#D4AF37]/20 text-sm font-mono text-center text-[#111827] focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                      maxLength={2}
                    />
                  </div>
                  <div className="flex justify-between mt-1 px-1">
                    <span className="text-[10px] text-[#111827]/40 font-mono">Hours</span>
                    <span className="text-[10px] text-[#111827]/40 font-mono">Minutes</span>
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>
              )}

              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={handleSubmit}
                  className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-white font-medium text-sm hover:bg-[#AA7A1E] transition-colors"
                >
                  Calculate Offset
                </button>
                {isManual && (
                  <button
                    onClick={() => { onReset(); onClose() }}
                    className="w-full py-2.5 rounded-xl bg-black/5 hover:bg-black/10 text-sm font-medium text-[#111827]/70 transition-colors"
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
