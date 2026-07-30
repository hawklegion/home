"use client"

import { useState, useEffect, useCallback } from "react"
import { useMounted } from "./useMounted"

interface LiveClockState {
  time: string
  date: string
}

export function useLiveClock(offsetMinutes: number): LiveClockState {
  const mounted = useMounted()

  const tick = useCallback(() => {
    const now = new Date()
    const local = new Date(now.getTime() + offsetMinutes * 60_000 + now.getTimezoneOffset() * 60_000)
    return {
      time: local.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
      date: local.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }
  }, [offsetMinutes])

  const [state, setState] = useState<LiveClockState>({
    time: "00:00:00",
    date: "Loading...",
  })

  useEffect(() => {
    if (!mounted) return

    setState(tick())

    const id = setInterval(() => {
      setState(tick())
    }, 1000)

    return () => clearInterval(id)
  }, [tick, mounted])

  return state
}
