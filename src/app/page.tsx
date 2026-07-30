"use client"

import Header from "@/components/Header"
import SacredBackground from "@/components/ambient/SacredBackground"

export default function HomePage() {
  return (
    <>
      <Header />
      <SacredBackground />
      <main className="flex-1 flex flex-col items-center justify-center px-4 min-h-screen relative z-10 animate-fade-in-up">
        <div className="text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-[0.1em] drop-shadow-sm" style={{ color: "var(--text-primary)" }}>
            WORK IN PROGRESS
          </h1>
        </div>
      </main>
    </>
  )
}
