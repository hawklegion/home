"use client"

import { useState, useEffect } from "react"

const STATS_URL = "https://gist.githubusercontent.com/hawklegion/e8f66fb2c82612e21c8a4743ab1f407f/raw/stats.json"

interface GuildStats {
  members: number
  guild: number
  elite: number
}

export function useGuildStats() {
  const [stats, setStats] = useState<GuildStats>({ members: 0, guild: 0, elite: 0 })

  useEffect(() => {
    let cancelled = false

    async function fetchStats() {
      try {
        const res = await fetch(STATS_URL)
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled) setStats(data)
      } catch {
        // silent
      }
    }

    fetchStats()
    const id = setInterval(fetchStats, 60_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  return stats
}
