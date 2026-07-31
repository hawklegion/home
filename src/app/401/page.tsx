"use client"

import ArchiveStatusPage from "@/components/status/ArchiveStatusPage"

export default function UnauthorizedPage() {
  return (
    <ArchiveStatusPage
      title="LOGIN REQUIRED"
      subtitle="Authentication is required before this archive can be accessed."
      code="401"
      statusLabel="Authentication Required"
      technical="HTTP 401 · Authentication Required"
      lockScroll
    />
  )
}
