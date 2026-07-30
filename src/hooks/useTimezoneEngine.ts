"use client"

import { useState, useCallback, useEffect } from "react"
import { formatOffset } from "@/lib/utils"
import { useMounted } from "./useMounted"

const STORAGE_KEY = "hawklegion-tz-override"

export function useTimezoneEngine() {
  const mounted = useMounted()
  const [manualOffset, setManualOffset] = useState<number | null>(null)
  const [autoOffset, setAutoOffset] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!mounted) return

    setAutoOffset(-new Date().getTimezoneOffset())

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = Number(stored)
      if (!isNaN(parsed)) {
        setManualOffset(parsed)
      }
    }
  }, [mounted])

  const effectiveOffset = manualOffset ?? autoOffset
  const offsetLabel = formatOffset(effectiveOffset)
  const isManual = manualOffset !== null

  const adjustOffset = useCallback((deltaMinutes: number) => {
    setManualOffset(prev => {
      const base = prev ?? autoOffset
      const next = Math.round(base + deltaMinutes)
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }, [autoOffset])

  const calculateOffset = useCallback((userDate: Date) => {
    const now = Date.now()
    const diffMs = userDate.getTime() - now
    const rawMinutes = diffMs / 60000
    const diffMinutes = Math.round(rawMinutes / 30) * 30
    setManualOffset(diffMinutes)
    localStorage.setItem(STORAGE_KEY, String(diffMinutes))
  }, [])

  const resetToAuto = useCallback(() => {
    setManualOffset(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    effectiveOffset,
    offsetLabel,
    isManual,
    modalOpen,
    setModalOpen,
    adjustOffset,
    calculateOffset,
    resetToAuto,
  } as const
}
