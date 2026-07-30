"use client"

import { useMemo } from "react"
import { useMounted } from "@/hooks/useMounted"

interface Dust {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  driftX: number
  opacity: number
}

interface Feather {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  rotation: number
  driftX: number
}

const DUST_COUNT = 35
const FEATHER_COUNT = 7

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

export default function SacredBackground() {
  const mounted = useMounted()

  const dust = useMemo<Dust[]>(() => {
    const rand = seededRandom(42)
    return Array.from({ length: DUST_COUNT }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 2.5 + 0.8,
      duration: rand() * 18 + 10,
      delay: rand() * 12,
      driftX: rand() * 30 - 15,
      opacity: rand() * 0.25 + 0.06,
    }))
  }, [])

  const feathers = useMemo<Feather[]>(() => {
    const rand = seededRandom(42)
    return Array.from({ length: FEATHER_COUNT }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 18 + 14,
      duration: rand() * 30 + 20,
      delay: rand() * 18,
      rotation: rand() * 360,
      driftX: rand() * 40 - 20,
    }))
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 75% 35% at 50% 12%, rgba(212, 175, 55, 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 45% 25% at 50% 8%, rgba(255, 255, 255, 0.5) 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 50% 22%, rgba(244, 224, 165, 0.12) 0%, transparent 55%)
          `,
        }}
      />

      {mounted && dust.map((p) => (
        <div
          key={`dust-${p.id}`}
          className="absolute rounded-full bg-[#D4AF37] animate-dust-float"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {mounted && feathers.map((f) => (
        <div
          key={`feather-${f.id}`}
          className="absolute animate-feather-float"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: f.size,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="#D4AF37"
            aria-hidden="true"
          >
            <path d="M12 2C9 6 7 10 6 14C5 17 4 19 3 21L6 19C8 17 10 14 11 10C12 7 13 4 12 2Z" />
            <path d="M12 2C15 6 17 10 18 14C19 17 20 19 21 21L18 19C16 17 14 14 13 10C12 7 11 4 12 2Z" />
          </svg>
        </div>
      ))}

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/3"
        style={{
          background: "linear-gradient(180deg, rgba(212, 175, 55, 0.08) 0%, transparent 100%)",
        }}
      />
    </div>
  )
}
