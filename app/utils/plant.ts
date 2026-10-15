import type { PlantKind } from '~/types/scene'

export interface Leaf {
  /** Degrees from vertical, positive leans right. */
  angle: number
  length: number
  width: number
  shade: 0 | 1 | 2
}

interface KindShape {
  maxLeaves: number
  spread: number
  length: number
  width: number
}

const SHAPES: Record<PlantKind, KindShape> = {
  monstera: { maxLeaves: 8, spread: 62, length: 78, width: 0.62 },
  palm: { maxLeaves: 9, spread: 78, length: 96, width: 0.17 },
  snake: { maxLeaves: 7, spread: 24, length: 108, width: 0.2 },
  bush: { maxLeaves: 12, spread: 80, length: 50, width: 0.8 },
  fern: { maxLeaves: 12, spread: 84, length: 84, width: 0.13 },
}

/** Deterministic leaf layout: same plant, same silhouette, more leaves as it grows. */
export function plantLeaves(kind: PlantKind, growth: number): Leaf[] {
  const shape = SHAPES[kind]
  const count = 3 + Math.round(clamp(growth, 0, 1) * (shape.maxLeaves - 3))
  const size = 0.4 + 0.6 * Math.sqrt(clamp(growth, 0, 1))
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1)
    const wobble = Math.sin(i * 2.7) * 6
    return {
      angle: (t - 0.5) * 2 * shape.spread + wobble,
      length: shape.length * size * (0.78 + 0.22 * Math.cos((t - 0.5) * Math.PI)),
      width: shape.width,
      shade: (i % 3) as 0 | 1 | 2,
    }
  })
}

/** A leaf pointing up from the origin. */
export function leafPath(length: number, widthRatio: number): string {
  const w = (length * widthRatio) / 2
  return `M0 0 C ${w * 1.3} ${-length * 0.25} ${w * 1.1} ${-length * 0.75} 0 ${-length} C ${-w * 1.1} ${-length * 0.75} ${-w * 1.3} ${-length * 0.25} 0 0 Z`
}
