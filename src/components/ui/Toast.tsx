"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface ToastData {
  message: string
  id: number
}

let toastId = 0
const listeners: Set<(t: ToastData) => void> = new Set()

export function showToast(message: string) {
  const toast: ToastData = { message, id: ++toastId }
  listeners.forEach((fn) => fn(toast))
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  useEffect(() => {
    const handler = (t: ToastData) => {
      setToasts((prev) => [...prev, t])
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id))
      }, 2500)
    }
    listeners.add(handler)
    return () => { listeners.delete(handler) }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="flex items-center gap-2 backdrop-blur-xl bg-white/90 border border-[#D4AF37]/40 shadow-lg shadow-[#D4AF37]/10 rounded-xl px-4 py-3 text-sm font-medium text-[#111827]"
          >
            <Check className="w-4 h-4 text-[#D4AF37]" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
