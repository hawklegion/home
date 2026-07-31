import type { Metadata } from "next"
import { Cinzel, Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import ToastContainer from "@/components/ui/Toast"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { asset } from "@/lib/asset"

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
  title: "Hawk Legion — Darkness Leads the Blind.",
  description: "Elite guild crafted by the sacred order of Hawk Legion.",
  metadataBase: new URL("https://hawklegion.github.io/home"),
  icons: {
    icon: asset("/logo.png"),
  },
  openGraph: {
    title: "Hawk Legion — Darkness Leads the Blind.",
    description: "Elite guild crafted by the sacred order of Hawk Legion.",
    images: [{ url: asset("/logo.png"), width: 512, height: 512 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("hawklegion-theme")||"dark";if(t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans h-dvh overflow-hidden flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={asset("/background.png")}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "center" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, var(--overlay-stop-1) 0%, var(--overlay-stop-2) 65%, var(--overlay-stop-3) 100%)",
              }}
            />
          </div>
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col z-10 relative">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  )
}
