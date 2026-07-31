"use client"

import ArchiveStatusPage from "@/components/status/ArchiveStatusPage"

export default function NotFound() {
  return (
    <ArchiveStatusPage
      title="LOST IN THE ARCHIVES"
      subtitle="This archive either never existed or has already vanished."
      code="404"
      statusLabel="Archive Missing"
      technical="HTTP 404 · Page Not Found"
    />
  )
}
