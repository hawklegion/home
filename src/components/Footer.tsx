import { FOOTER_TEXT } from "@/lib/constants"

const DM_URL = "https://discord.com/users/1488246057782612139"

export default function Footer() {
  return (
    <footer className="relative z-10 flex justify-center px-4 py-6 mt-auto">
      <a
        href={DM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 text-[10px] md:text-xs w-full max-w-md cursor-pointer"
        title="Contact me on Discord"
      >
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        <span className="font-heading font-semibold tracking-[0.15em] flex items-center gap-1.5 whitespace-nowrap" style={{ color: "#AA7A1E" }}>
          <span style={{ color: "#D4AF37" }}>❖</span> {FOOTER_TEXT} <span style={{ color: "#D4AF37" }}>❖</span>
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </a>
    </footer>
  )
}
