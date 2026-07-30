import { FOOTER_TEXT } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center py-5">
      <span className="text-sm text-[#111827]/40 font-medium transition-colors duration-300 hover:text-[#D4AF37]/80 cursor-default">
        {FOOTER_TEXT}
      </span>
    </footer>
  )
}
