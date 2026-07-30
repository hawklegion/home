"use client"

import { useLiveClock } from "@/hooks/useLiveClock"

interface ClockProps {
  offsetMinutes: number
}

export default function Clock({ offsetMinutes }: ClockProps) {
  const { time, date } = useLiveClock(offsetMinutes)

  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-light tracking-widest text-[#111827] tabular-nums">
        {time}
      </div>
      <div className="mt-3 text-lg text-[#111827]/70 font-medium">
        {date}
      </div>
    </div>
  )
}
