import type { SpritePalette, SpritePath } from '~/types/sprite'
import { PixelCanvas, rowsToPaths } from '~/utils/pixelCanvas'

/**
 * A grey tabby, side view, facing right. Two running frames plus a sitting pose.
 * Keys: f fur, F light, s shade, d dark stripe, c cream, p pink nose, e eye.
 */
export const CAT_SIZE = { width: 34, height: 22 }

const PALETTE: SpritePalette = { f: '#aeb6a8', F: '#c9d0c3', s: '#8d978a', d: '#4a5a4d', c: '#f3eddd', p: '#d99a9a', e: '#1b2a20', o: '#1b2a20' }

export type CatFrame = 'run1' | 'run2' | 'sit'

function build(frame: CatFrame): PixelCanvas {
  const c = new PixelCanvas(CAT_SIZE.width, CAT_SIZE.height)
  const sitting = frame === 'sit'

  // tail first, behind the body
  if (sitting) c.stroke([[6, 18], [0, 18], [0, 8], [4, 6]], 1.7, (t) => (t > 0.9 ? 'd' : 'f'))
  else c.stroke([[7, 10], [2, 9], [0, 4], [4, 1]], 1.7, (t) => (Math.floor(t * 8) % 2 ? 'd' : 'f'))

  // legs
  if (sitting) {
    c.rect(9, 17, 4, 4, 'f').rect(19, 17, 4, 4, 'f')
  } else if (frame === 'run1') {
    c.rect(6, 14, 3, 6, 'f').line(7, 19, 3, 21, 'f').rect(9, 15, 3, 5, 's').rect(22, 14, 3, 6, 'f').line(24, 19, 28, 21, 'f').rect(19, 15, 3, 5, 's')
  } else {
    c.rect(9, 15, 3, 5, 'f').rect(12, 15, 3, 5, 's').rect(19, 15, 3, 5, 'f').rect(22, 15, 3, 5, 's')
  }

  // body and head
  if (sitting) c.ellipse(15, 14, 8, 6, 'f')
  else c.ellipse(15, 11, 10, 4.6, 'f')
  c.ellipse(26, sitting ? 7 : 7.5, 5.6, 5, 'f')
  c.set(22, sitting ? 1 : 2, 'f').set(23, sitting ? 1 : 2, 'f').set(23, sitting ? 2 : 3, 'f').set(30, sitting ? 1 : 2, 'f').set(29, sitting ? 1 : 2, 'f').set(29, sitting ? 2 : 3, 'f')
  c.shade('f', 'F', 's')

  // muzzle, eye, nose, stripes
  c.ellipse(29.5, 9.5, 2.4, 1.8, 'c').set(31, 8, 'p').set(28, 6, 'e').set(29, 6, 'e').set(28, 7, 'e')
  for (const x of [11, 14, 17, 20]) c.line(x, sitting ? 9 : 7, x, sitting ? 12 : 9, 'd')
  return c
}

const cache = new Map<CatFrame, SpritePath[]>()

/** Outlined, so the sprite is drawn at (-1, -1) of its canvas. */
export function catPaths(frame: CatFrame): SpritePath[] {
  const cached = cache.get(frame)
  if (cached) return cached
  const paths = rowsToPaths(build(frame).outlined(), PALETTE)
  cache.set(frame, paths)
  return paths
}
