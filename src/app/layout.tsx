import type { Metadata } from "next"
import { Cinzel, Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import ToastContainer from "@/components/ui/Toast"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Hawk Legion — Sacred Utilities",
  description: "Elite utilities crafted by the sacred order of Hawk Legion.",
  metadataBase: new URL("https://hawklegion.github.io"),
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Hawk Legion — Sacred Utilities",
    description: "Elite utilities crafted by the sacred order of Hawk Legion.",
    images: [{ url: "/icon.svg", width: 512, height: 512 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col text-[#111827]" suppressHydrationWarning>
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/background.png"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.65) 65%, rgba(255,255,255,0.15) 100%)",
            }}
          />
        </div>
        <main className="flex-1 flex flex-col z-10 relative">
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  )
}
