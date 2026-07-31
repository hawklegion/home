"use client"

import ArchiveStatusPage from "@/components/status/ArchiveStatusPage"

export default function InternalErrorPage() {
  return (
    <ArchiveStatusPage
      title="Server Error"
      subtitle="An unexpected internal error interrupted access to this archive."
      code="500"
      statusLabel="Something went wrong"
      technical="HTTP 500 · Internal Server Error"
      showRefresh
    />
  )
}
