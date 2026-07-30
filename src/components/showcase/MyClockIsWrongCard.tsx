"use client"

import { useState, useEffect } from "react"
import { Clock, X, Calendar, Clock3, Info, Globe, Swords, Shield, ArrowDown } from "lucide-react"
import { formatOffset } from "@/lib/utils"

interface MyClockIsWrongCardProps {
  currentOffset: number
  onCalculate: (userDate: Date) => void
  onReset: () => void
  isManual: boolean
}

export default function MyClockIsWrongCard({
  currentOffset,
  onCalculate,
  onReset,
  isManual,
}: MyClockIsWrongCardProps) {
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const [error, setError] = useState("")
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const now = new Date()
    setYear(String(now.getFullYear()))
    setMonth(String(now.getMonth() + 1).padStart(2, "0"))
    setDay(String(now.getDate()).padStart(2, "0"))
    setHours(String(now.getHours()).padStart(2, "0"))
    setMinutes(String(now.getMinutes()).padStart(2, "0"))
    setSeconds(String(now.getSeconds()).padStart(2, "0"))
  }, [])

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

    onCalculate(userDate)
  }

  return (
    <div
      className="relative backdrop-blur-xl bg-[#111827]/95 border border-[#D4AF37]/35 rounded-2xl p-6 md:p-8 text-white shadow-2xl flex flex-col justify-between"
      style={{
        boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.2), 0 20px 50px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center border border-[#D4AF37]/30">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <h3 className="font-heading text-sm md:text-base font-bold text-[#D4AF37] tracking-wider">
              MY CLOCK IS WRONG
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors ${showInfo ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-white/50 hover:text-white"}`}
              title={showInfo ? "Hide instructions" : "How to use"}
            >
              <Info className="w-4 h-4" />
            </button>
            <button
              onClick={onReset}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              title="Reset timezone"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-white/60 mb-6 leading-relaxed">
          Enter your current local date and time exactly as shown on your device. We&apos;ll use this to calculate your correct timezone.
        </p>

        {showInfo && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-[#D4AF37]/20 space-y-2">
            <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-3 font-heading text-center">
              HOW IT WORKS
            </h4>
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-white/70">You enter your current local date & time.</span>
            </div>
            <div className="flex justify-center">
              <ArrowDown className="w-3 h-3 text-[#D4AF37]/60" />
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-white/70">We compare it with global atomic time.</span>
            </div>
            <div className="flex justify-center">
              <ArrowDown className="w-3 h-3 text-[#D4AF37]/60" />
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Swords className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-white/70">We calculate your correct UTC offset.</span>
            </div>
            <div className="flex justify-center">
              <ArrowDown className="w-3 h-3 text-[#D4AF37]/60" />
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
              <span className="text-xs text-white/70">Your timezone, time & date are updated instantly.</span>
            </div>
          </div>
        )}

        {isManual && (
          <div className="mb-4 p-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs text-white/80 flex justify-between items-center">
            <span>Current override: <span className="font-bold text-[#D4AF37]">{formatOffset(currentOffset)}</span></span>
            <button onClick={onReset} className="text-[#D4AF37] hover:underline font-heading text-[10px] uppercase font-bold">Reset</button>
          </div>
        )}

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-heading">
              Date
            </label>
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="MM"
                className="w-12 bg-transparent text-center font-mono text-sm text-white focus:outline-none"
                maxLength={2}
              />
              <span className="text-white/30 font-mono">/</span>
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="DD"
                className="w-12 bg-transparent text-center font-mono text-sm text-white focus:outline-none"
                maxLength={2}
              />
              <span className="text-white/30 font-mono">/</span>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="YYYY"
                className="w-16 bg-transparent text-center font-mono text-sm text-white focus:outline-none"
                maxLength={4}
              />
              <Calendar className="w-4 h-4 text-white/40 ml-auto mr-1" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-heading">
              Time
            </label>
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="HH"
                className="w-12 bg-transparent text-center font-mono text-sm text-white focus:outline-none"
                maxLength={2}
              />
              <span className="text-white/30 font-mono">:</span>
              <input
                type="text"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="MM"
                className="w-12 bg-transparent text-center font-mono text-sm text-white focus:outline-none"
                maxLength={2}
              />
              <span className="text-white/30 font-mono">:</span>
              <input
                type="text"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="SS"
                className="w-12 bg-transparent text-center font-mono text-sm text-white focus:outline-none"
                maxLength={2}
              />
              <Clock3 className="w-4 h-4 text-white/40 ml-auto mr-1" />
            </div>
          </div>
        </div>

        {error && <p className="mt-3 text-xs text-red-400 font-medium">{error}</p>}
      </div>

      <div className="mt-6">
        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#AA7A1E] via-[#D4AF37] to-[#AA7A1E] text-white font-bold text-xs md:text-sm tracking-[0.15em] shadow-lg shadow-[#D4AF37]/20 hover:opacity-95 transition-opacity uppercase font-heading"
        >
          CALCULATE TIMEZONE
        </button>
      </div>
    </div>
  )
}
