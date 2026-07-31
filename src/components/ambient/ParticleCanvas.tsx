"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
  phase: number
  shape: "circle" | "feather"
}

interface GodRay {
  x: number
  width: number
  alpha: number
  speed: number
  phase: number
}

function mulberry32(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []
    const rays: GodRay[] = []
    let time = 0

    const seed = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0
    const rand = mulberry32(seed)
    const targetCount = 60 + Math.floor(rand() * 26)

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const rayCount = 6 + Math.floor(rand() * 5)
    for (let i = 0; i < rayCount; i++) {
      rays.push({
        x: rand() * canvas.width,
        width: rand() * 120 + 40,
        alpha: rand() * 0.05 + 0.015,
        speed: rand() * 0.003 + 0.001,
        phase: rand() * Math.PI * 2,
      })
    }

    function createParticle(c: HTMLCanvasElement, staggerLife: boolean): Particle {
      return {
        x: rand() * c.width,
        y: rand() * c.height,
        vx: (rand() - 0.5) * 0.35,
        vy: -rand() * 0.25 - 0.05,
        size: rand() * 2.5 + 0.5,
        alpha: rand() * 0.16 + 0.04,
        life: staggerLife ? rand() * 350 : 0,
        maxLife: rand() * 400 + 200,
        phase: rand() * Math.PI * 2,
        shape: rand() > 0.7 ? "feather" : "circle",
      }
    }

    for (let i = 0; i < targetCount; i++) {
      particles.push(createParticle(canvas, true))
    }

    function drawFeather(c: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) {
      c.save()
      c.translate(x, y)
      c.globalAlpha = alpha * 0.5
      c.rotate(Math.sin(time * 0.001 + x) * 0.3)
      c.beginPath()
      c.moveTo(0, -size * 3)
      c.quadraticCurveTo(size * 2, -size, 0, size)
      c.quadraticCurveTo(-size * 2, -size, 0, -size * 3)
      c.fillStyle = "#D4AF37"
      c.fill()
      c.restore()
    }

    function draw() {
      if (!canvas || !ctx) return
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // God rays
      for (const ray of rays) {
        const sway = Math.sin(time * ray.speed + ray.phase) * 30
        const gradient = ctx.createLinearGradient(ray.x + sway, 0, ray.x + ray.width + sway, 0)
        gradient.addColorStop(0, "rgba(212, 175, 55, 0)")
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${ray.alpha})`)
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)")
        ctx.fillStyle = gradient
        ctx.fillRect(ray.x + sway - ray.width / 2, 0, ray.width, canvas.height * 0.6)
      }

      // Particles
      particles = particles.filter((p) => p.life < p.maxLife)
      while (particles.length < targetCount) {
        particles.push(createParticle(canvas, false))
      }

      for (const p of particles) {
        p.x += p.vx + Math.sin(time * 0.002 + p.phase) * 0.06
        p.y += p.vy
        p.life++

        const fadeIn = Math.min(p.life / 25, 1)
        const fadeOut = 1 - p.life / p.maxLife
        const alpha = p.alpha * fadeIn * fadeOut
        if (alpha <= 0.004) continue

        if (p.shape === "feather") {
          drawFeather(ctx, p.x, p.y, p.size, alpha)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
