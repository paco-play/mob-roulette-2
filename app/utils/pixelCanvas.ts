import type { SpritePalette, SpritePath, SpriteRows } from '~/types/sprite'
import { outlineRows } from './spriteOutline'

/**
 * A tiny pixel painter. Drawing sprites as a few readable calls (ellipses, rects, lines) instead of
 * hand-typed character grids keeps them symmetrical and easy to tweak.
 */
export class PixelCanvas {
  private readonly cells: string[][]

  constructor(
    readonly width: number,
    readonly height: number,
  ) {
    this.cells = Array.from({ length: height }, () => Array<string>(width).fill('.'))
  }

  /** Mirrors an x coordinate across the vertical axis, for symmetrical faces. */
  mirrorX(x: number, w = 1): number {
    return this.width - x - w
  }

  get(x: number, y: number): string {
    return this.cells[y]?.[x] ?? '.'
  }

  set(x: number, y: number, key: string): this {
    if (x >= 0 && y >= 0 && x < this.width && y < this.height) this.cells[y]![x] = key
    return this
  }

  /** Same pixel on both sides of the axis. */
  setPair(x: number, y: number, key: string): this {
    return this.set(x, y, key).set(this.mirrorX(x), y, key)
  }

  rect(x: number, y: number, w: number, h: number, key: string): this {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, key)
    return this
  }

  rectPair(x: number, y: number, w: number, h: number, key: string): this {
    return this.rect(x, y, w, h, key).rect(this.mirrorX(x, w), y, w, h, key)
  }

  ellipse(cx: number, cy: number, rx: number, ry: number, key: string): this {
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        const dx = (x + 0.5 - cx) / rx
        const dy = (y + 0.5 - cy) / ry
        if (dx * dx + dy * dy <= 1) this.set(x, y, key)
      }
    }
    return this
  }

  ellipsePair(cx: number, cy: number, rx: number, ry: number, key: string): this {
    return this.ellipse(cx, cy, rx, ry, key).ellipse(this.width - cx, cy, rx, ry, key)
  }

  disc(cx: number, cy: number, r: number, key: string): this {
    return this.ellipse(cx, cy, r, r, key)
  }

  line(x0: number, y0: number, x1: number, y1: number, key: string): this {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
    for (let i = 0; i <= steps; i++) this.set(Math.round(x0 + ((x1 - x0) * i) / steps), Math.round(y0 + ((y1 - y0) * i) / steps), key)
    return this
  }

  /** A thick stroke along a cubic Bézier; `colorAt` can alternate colours to make rings. */
  stroke(points: readonly [number, number][], radius: number, colorAt: (progress: number) => string): this {
    const [p0, p1, p2, p3] = points as [[number, number], [number, number], [number, number], [number, number]]
    const samples = 80
    for (let i = 0; i <= samples; i++) {
      const t = i / samples
      const u = 1 - t
      const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0]
      const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]
      this.disc(x, y, radius, colorAt(t))
    }
    return this
  }

  /**
   * Cheap lighting: fur pixels with empty space above get the light tone, those with empty space
   * below get the shade tone. Gives every shape a rim light without hand-placing pixels.
   */
  shade(fur: string, light: string, dark: string): this {
    const next = this.cells.map((row) => [...row])
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.get(x, y) !== fur) continue
        if (this.get(x, y - 1) === '.') next[y]![x] = light
        else if (this.get(x, y + 1) === '.') next[y]![x] = dark
      }
    }
    next.forEach((row, y) => row.forEach((cell, x) => (this.cells[y]![x] = cell)))
    return this
  }

  rows(): SpriteRows {
    return this.cells.map((row) => row.join(''))
  }

  /** Rows with an outline pass; the result is one pixel larger on every side, so draw it at (-1, -1). */
  outlined(): SpriteRows {
    return outlineRows(this.rows())
  }
}

export function rowsToPaths(rows: SpriteRows, palette: SpritePalette): SpritePath[] {
  const byColor = new Map<string, string>()
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = palette[row[x]!]
      if (color) byColor.set(color, `${byColor.get(color) ?? ''}M${x} ${y}h1v1h-1z`)
    }
  })
  return [...byColor].map(([color, d]) => ({ color, d }))
}
