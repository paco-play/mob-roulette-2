import type { SpriteRows } from '~/types/sprite'

/** Palette key used for the outline. */
export const OUTLINE_KEY = 'o'

/** Sprites are drawn on a 12 grid; the outline pass pads it by one pixel on every side. */
export const SPRITE_SIZE = 14

/**
 * Adds a one pixel outline around every filled pixel. Outlines are what make small pixel art read as
 * a clean sticker instead of a handful of coloured squares.
 */
export function outlineRows(rows: SpriteRows): SpriteRows {
  const height = rows.length
  const width = Math.max(...rows.map((row) => row.length))
  const filled = (x: number, y: number): boolean => {
    const cell = rows[y]?.[x]
    return cell !== undefined && cell !== '.'
  }
  const out: string[] = []
  for (let y = -1; y <= height; y++) {
    let line = ''
    for (let x = -1; x <= width; x++) {
      if (filled(x, y)) line += rows[y]![x]
      else if (filled(x - 1, y) || filled(x + 1, y) || filled(x, y - 1) || filled(x, y + 1)) line += OUTLINE_KEY
      else line += '.'
    }
    out.push(line)
  }
  return out
}
