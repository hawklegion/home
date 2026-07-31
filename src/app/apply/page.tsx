"use client"

import { useState } from "react"
import Header from "@/components/Header"
import SacredBackground from "@/components/ambient/SacredBackground"
import { showToast } from "@/components/ui/Toast"
import { Crown, ShieldCheck, Check, ArrowLeft, Lock, Scroll, Info } from "lucide-react"
import { asset } from "@/lib/asset"

type Tier = "elite" | "guild"

interface InfoLine {
  text: string
  url?: string
}

interface RequirementItem {
  text: string
  info?: InfoLine[]
}

interface TierOption {
  id: Tier
  name: string
  icon: typeof Crown
  tagline: string
  requirementSubtitle?: string
  requirements: RequirementItem[]
  access: string
  note?: string
}

const TIER_LIST_INFO: InfoLine[] = [
  {
    text: "Buffers/Support characters (e.g. Salmon Sorcerer (Grade 1)) count toward meta builds — unbounds are not always required!",
  },
  {
    text: "Check out the official Tier Lists on their wiki",
    url: "https://animeexpeditions.miraheze.org/Tier_List",
  },
  {
    text: "Units below Mythic rarity (Legendary, Epic, Rare) do not count toward meta builds.",
  },
]

const TIERS: TierOption[] = [
  {
    id: "elite",
    name: "Elite Access",
    icon: Crown,
    tagline: "The inner circle. Access our private competitive strategies.",
    requirementSubtitle: "The highest and most selective requirement tier in the server",
    requirements: [
      {
        text: "At least 10 meta builds in total, including 6 DPS builds.",
        info: TIER_LIST_INFO,
      },
      { text: "You must show some images relating to your relics too." },
    ],
    access:
      "You will gain our exclusive, restricted role limited to the top 10 players of the server. Grants private access to gatekept strategies, high-level and precise forums that give you access to the best placements, auto-skip wave managements, and tournament loadouts to maintain a competitive edge on the leaderboards.",
    note: "Strictly capped at 10 restricted members",
  },
  {
    id: "guild",
    name: "Guild Member",
    icon: ShieldCheck,
    tagline: "Standard server member. Participate, play together, and join group runs (e.g. Globals).",
    requirements: [
      {
        text: "At least 5 meta builds.",
        info: TIER_LIST_INFO,
      },
      { text: "You must show some images relating to your relics too." },
    ],
    access:
      "Unlock entry to the Guild hub and exclusive member channels. Squad up for global runs with members worthy of a place in the guilds and connect with the community.\n\nGet ready for future guild features as we build up for Update 1!",
  },
]

export default function ApplyPage() {
  const [selected, setSelected] = useState<Tier | null>(null)
  const [expandedReq, setExpandedReq] = useState<number | null>(null)
  const tier = TIERS.find(t => t.id === selected) ?? null

  return (
    <>
      <Header />
      <SacredBackground />

      <main className="flex-1 flex flex-col items-center px-4 pt-14 pb-6 relative z-10" style={{ minHeight: "100%" }}>
        <div className="w-full max-w-3xl flex flex-col items-center text-center animate-fade-in-up" style={{ margin: "auto" }}>
          <img
            src={asset("/logo.png")}
            alt="Hawk Legion Sacred Emblem"
            className="w-20 h-20 md:w-24 md:h-24 object-contain mb-3 relative z-10"
          />

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full border border-[#D4AF37]/50 font-heading text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: "#D4AF37", background: "rgba(212,175,55,0.08)" }}>
              Dev Build
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-[0.15em] drop-shadow-sm" style={{ color: "var(--text-primary)" }}>
            APPLY TO HAWK LEGION
          </h1>
          <p className="mt-3 text-sm md:text-base font-medium leading-relaxed max-w-md" style={{ color: "var(--text-secondary)" }}>
            {selected
              ? "Verify your requirements below. The application will be submitted via Discord verification."
              : "Choose the tier you wish to apply for. Each tier has different requirements and privileges."}
          </p>

          {!selected ? (
            <div className="w-full grid sm:grid-cols-2 gap-4 mt-9">
              {TIERS.map(({ id, name, icon: Icon, tagline }) => (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className="group relative text-left backdrop-blur-xl rounded-2xl p-7 card-hover-lift transition-all duration-300 cursor-pointer hover:border-[#D4AF37]/70 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--surface-card-border)",
                    boxShadow: "0 4px 24px var(--shadow-card), 0 20px 64px var(--shadow-card)",
                  }}
                >
                  <div className="absolute -top-[1px] -left-[1px] w-6 h-6 rounded-tl-xl pointer-events-none transition-colors duration-300 group-hover:border-[#D4AF37]" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
                  <div className="absolute -top-[1px] -right-[1px] w-6 h-6 rounded-tr-xl pointer-events-none transition-colors duration-300 group-hover:border-[#D4AF37]" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
                  <div className="absolute -bottom-[1px] -left-[1px] w-6 h-6 rounded-bl-xl pointer-events-none transition-colors duration-300 group-hover:border-[#D4AF37]" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
                  <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 rounded-br-xl pointer-events-none transition-colors duration-300 group-hover:border-[#D4AF37]" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />

                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.35)" }}>
                      <Icon className="w-5 h-5 text-[#D4AF37]" />
                    </span>
                    <span className="font-heading text-sm md:text-base font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-primary)" }}>
                      {name}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {tagline}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 font-heading text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-[#D4AF37]" style={{ color: "#AA7A1E" }}>
                    <Scroll className="w-3.5 h-3.5" />
                    View Requirements and apply!
                  </span>
                </button>
              ))}
            </div>
          ) : (
            tier && (
              <div className="w-full max-w-2xl mt-9 text-left animate-fade-in-up">
                <div
                  className="relative backdrop-blur-xl rounded-2xl p-7 md:p-9"
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--surface-card-border)",
                    boxShadow: "0 4px 24px var(--shadow-card), 0 20px 64px var(--shadow-card)",
                  }}
                >
                  <div className="absolute -top-[1px] -left-[1px] w-7 h-7 rounded-tl-xl pointer-events-none" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
                  <div className="absolute -top-[1px] -right-[1px] w-7 h-7 rounded-tr-xl pointer-events-none" style={{ borderTop: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
                  <div className="absolute -bottom-[1px] -left-[1px] w-7 h-7 rounded-bl-xl pointer-events-none" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderLeft: "2px solid rgba(212, 175, 55, 0.6)" }} />
                  <div className="absolute -bottom-[1px] -right-[1px] w-7 h-7 rounded-br-xl pointer-events-none" style={{ borderBottom: "2px solid rgba(212, 175, 55, 0.6)", borderRight: "2px solid rgba(212, 175, 55, 0.6)" }} />
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer hover:text-[#D4AF37]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to tier selection
                  </button>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.35)" }}>
                      <tier.icon className="w-6 h-6 text-[#D4AF37]" />
                    </span>
                    <div>
                      <h2 className="font-heading text-lg md:text-xl font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-primary)" }}>
                        {tier.name}
                      </h2>
                      {tier.note && (
                        <p className="mt-0.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#AA7A1E" }}>
                          <Lock className="w-3 h-3 inline-block mr-1" />
                          {tier.note}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: "#AA7A1E" }}>
                      Requirements ({tier.name})
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
                  </div>
                  {tier.requirementSubtitle && (
                    <p className="mt-2 text-[9px] md:text-[10px] font-semibold italic tracking-[0.2em] leading-relaxed" style={{ color: "#AA7A1E" }}>
                      {tier.requirementSubtitle}
                    </p>
                  )}
                  <ul className="mt-4 flex flex-col gap-3">
                    {tier.requirements.map((req, i) => (
                      <li key={req.text}>
                        {req.info ? (
                          <div className="flex flex-col">
                            <button
                              onClick={() => setExpandedReq(expandedReq === i ? null : i)}
                              aria-expanded={expandedReq === i}
                              className="group flex items-center justify-between gap-3 w-full text-left text-sm md:text-base font-medium leading-relaxed cursor-pointer"
                              style={{ color: "var(--text-primary)" }}
                            >
                              <span className="flex items-start gap-3">
                                <span className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.4)" }}>
                                  <Check className="w-3 h-3 text-[#D4AF37]" />
                                </span>
                                {req.text}
                              </span>
                              <span
                                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all duration-300"
                                style={{
                                  background: expandedReq === i ? "rgba(212,175,55,0.18)" : "rgba(212,175,55,0.08)",
                                  border: expandedReq === i ? "1px solid rgba(212,175,55,0.7)" : "1px solid rgba(212,175,55,0.35)",
                                }}
                              >
                                <Info className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300" style={{ transform: expandedReq === i ? "rotate(180deg)" : "none" }} />
                              </span>
                            </button>
                            {expandedReq === i && (
                              <div className="mt-3 ml-8 pl-4 border-l border-[#D4AF37]/30 flex flex-col animate-fade-in-up">
                                {req.info.map((line, j) => (
                                  line.url ? (
                                    <a
                                      key={j}
                                      href={line.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-5 mt-0.5 text-[9px] md:text-[10px] font-semibold italic tracking-[0.2em] leading-relaxed transition-colors duration-200 hover:text-[#D4AF37]"
                                      style={{ color: "#AA7A1E" }}
                                    >
                                      {line.text}
                                    </a>
                                  ) : (
                                    <div
                                      key={j}
                                      className={`flex items-start gap-2 leading-relaxed ${j > 0 ? "mt-3" : ""}`}
                                      style={{ color: "var(--text-secondary)" }}
                                    >
                                      <span className="text-[#D4AF37] text-xs mt-0.5 shrink-0">•</span>
                                      <span className="text-xs md:text-sm font-medium">{line.text}</span>
                                    </div>
                                  )
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-start gap-3 text-sm md:text-base font-medium leading-relaxed" style={{ color: "var(--text-primary)" }}>
                            <span className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.4)" }}>
                              <Check className="w-3 h-3 text-[#D4AF37]" />
                            </span>
                            {req.text}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: "#AA7A1E" }}>
                      Access
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
                  </div>
                  <p className="mt-3 text-sm md:text-base font-medium leading-relaxed whitespace-pre-line" style={{ color: "var(--text-secondary)" }}>
                    {tier.access}
                  </p>

                  <button
                    onClick={() => showToast("Application submission is coming soon — will be handled via Discord verification.")}
                    className="mt-8 w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-[#D4AF37]/40 font-heading text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/10 hover:shadow-[0_0_28px_rgba(212,175,55,0.18)] cursor-pointer"
                    style={{ background: "rgba(212,175,55,0.06)", color: "var(--text-primary)" }}
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </>
  )
}
