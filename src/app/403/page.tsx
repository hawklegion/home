"use client"

import ArchiveStatusPage from "@/components/status/ArchiveStatusPage"

export default function ForbiddenPage() {
  return (
    <ArchiveStatusPage
      title="RESTRICTED ARCHIVE"
      subtitle="This archive exists, but access has been denied."
      code="403"
      statusLabel="Access Forbidden"
      technical="HTTP 403 · Access Forbidden"
    />
  )
}
