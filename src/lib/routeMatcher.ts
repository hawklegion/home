import { KNOWN_ROUTES } from "./constants"

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

export function findClosestRoute(input: string): { route: string; label: string } | null {
  const clean = input.replace(/^\/+/, "/").toLowerCase()
  let best: { route: string; label: string; distance: number } | null = null

  for (const [route, label] of Object.entries(KNOWN_ROUTES)) {
    const dist = levenshtein(clean, route.toLowerCase())
    if (!best || dist < best.distance) {
      best = { route, label, distance: dist }
    }
  }

  if (best && best.distance <= 3) {
    return { route: best.route, label: best.label }
  }

  return null
}
