import type { Avatar, SpritePath } from '~/types/sprite'

const cache = new Map<string, SpritePath[]>()

/** Turns a character grid into one SVG path per colour (a few DOM nodes instead of one per pixel). */
export function spritePaths(avatar: Avatar): SpritePath[] {
  const cached = cache.get(avatar.id)
  if (cached) return cached
  const byColor = new Map<string, string>()
  avatar.rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = avatar.palette[row[x]!]
      if (!color) continue
      byColor.set(color, `${byColor.get(color) ?? ''}M${x} ${y}h1v1h-1z`)
    }
  })
  const paths = [...byColor].map(([color, d]) => ({ color, d }))
  cache.set(avatar.id, paths)
  return paths
}
