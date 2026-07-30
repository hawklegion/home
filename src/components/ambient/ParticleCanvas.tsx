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
  shape: "circle" | "feather"
}

interface GodRay {
  x: number
  width: number
  alpha: number
  speed: number
  phase: number
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

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < 8; i++) {
      rays.push({
        x: Math.random() * canvas.width,
        width: Math.random() * 120 + 40,
        alpha: Math.random() * 0.06 + 0.02,
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      })
    }

    for (let i = 0; i < 65; i++) {
      particles.push(createParticle(canvas))
    }

    function createParticle(c: HTMLCanvasElement): Particle {
      return {
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.25 - 0.05,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.08,
        life: 0,
        maxLife: Math.random() * 400 + 200,
        shape: Math.random() > 0.7 ? "feather" : "circle",
      }
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
      while (particles.length < 75) {
        particles.push(createParticle(canvas))
      }

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.life++
        const fade = 1 - p.life / p.maxLife
        if (p.shape === "feather") {
          drawFeather(ctx, p.x, p.y, p.size, p.alpha * fade)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * fade})`
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
