import type { SpritePalette, SpritePath } from '~/types/sprite'
import { PixelCanvas, rowsToPaths } from '~/utils/pixelCanvas'

/**
 * The red panda, painted as separate layers so each can move on its own (breathing, blinking, waving).
 * Canvas is 36x40; every layer is outlined, which makes the layers read as stickers stacked on each other.
 * Keys: f fur, F fur light, s fur shade, b belly, d dark, c cream, o outline, T tongue, p blush,
 * W shirt, V shirt shade, g and G the two greens of the Nuxt logo.
 */
export const PANDA_SIZE = { width: 36, height: 40 }

export type PandaVariant = 'main' | 'colleague'

const PALETTES: Record<PandaVariant, SpritePalette> = {
  main: { f: '#7ea184', F: '#a8c8ac', s: '#628568', b: '#46634f', d: '#26392c', c: '#f3eddd', o: '#1b2a20', T: '#b9c9a6', p: '#e8b4a4', W: '#f7f4ea', V: '#d9d4c2', g: '#00dc82', G: '#00a368' },
  colleague: { f: '#a9b8a4', F: '#c8d4c4', s: '#8a9c88', b: '#6e836f', d: '#2f4737', c: '#f3eddd', o: '#1b2a20', T: '#c4cfb3', p: '#e8b4a4', W: '#f7f4ea', V: '#d9d4c2', g: '#00dc82', G: '#00a368' },
}

export type PandaPartId =
  | 'tail'
  | 'legs'
  | 'body'
  | 'shirt'
  | 'armL'
  | 'armR'
  | 'ears'
  | 'head'
  | 'eyesOpen'
  | 'eyesClosed'
  | 'eyesHappy'
  | 'brows'
  | 'mouthClosed'
  | 'mouthOpen'

const canvas = (): PixelCanvas => new PixelCanvas(PANDA_SIZE.width, PANDA_SIZE.height)

function tail(): PixelCanvas {
  return canvas()
    .stroke(
      [
        [23, 34],
        [35, 37],
        [37, 24],
        [30, 15],
      ],
      3.6,
      (t) => (t > 0.86 ? 'd' : Math.floor(t * 26) % 2 === 0 ? 'f' : 'b'),
    )
    .shade('f', 'F', 's')
}

const legs = (): PixelCanvas => canvas().rectPair(11, 35, 5, 4, 'd').rectPair(10, 37, 6, 2, 'd')

function body(): PixelCanvas {
  return canvas().ellipse(17.5, 30, 8.5, 7.5, 'f').ellipse(17.5, 32.5, 5.5, 5, 'b').shade('f', 'F', 's')
}

/** Arms are dark; the top of each one disappears into a white sleeve. */
const arm = (): PixelCanvas => canvas().rect(7, 26, 4, 8, 'd').rect(7, 25, 4, 4, 'W').rect(7, 28, 4, 1, 'V')

function armR(): PixelCanvas {
  return canvas().rect(25, 26, 4, 8, 'd').rect(25, 25, 4, 4, 'W').rect(25, 28, 4, 1, 'V')
}

function ears(): PixelCanvas {
  const c = canvas()
  // Tall enough that their base hides behind the head: no seam where they meet it. Each row is [x, width].
  const outer: ReadonlyArray<readonly [number, number]> = [[7, 2], [6, 4], [6, 5], [5, 6], [5, 7], [5, 8], [5, 8], [6, 7], [6, 7], [7, 6]]
  const inner: ReadonlyArray<readonly [number, number]> = [[7, 2], [7, 3], [7, 3], [7, 4], [8, 3]]
  outer.forEach(([x, w], i) => c.rectPair(x, 2 + i, w, 1, 'f'))
  inner.forEach(([x, w], i) => c.rectPair(x, 4 + i, w, 1, 'c'))
  return c.shade('f', 'F', 's')
}

function head(): PixelCanvas {
  const c = canvas().ellipse(17.5, 15, 11.6, 9.4, 'f').shade('f', 'F', 's')
  // white cheeks with little tufts, and a small muzzle
  c.ellipsePair(9.6, 19.6, 4.6, 2.8, 'c')
  c.setPair(4, 20, 'c').setPair(5, 22, 'c').setPair(7, 23, 'c').setPair(5, 21, 'c')
  // light patch on the forehead
  c.rect(11, 8, 3, 1, 'F').rect(10, 9, 2, 1, 'F')
  c.ellipse(17.5, 19.6, 3.2, 2.5, 'c')
  // white eyebrow spots
  c.rectPair(10, 11, 3, 1, 'c')
  // small nose and tear marks running from the eyes
  c.rect(17, 17, 2, 1, 'd')
  // a touch of blush on the cheeks
  c.rectPair(7, 20, 2, 1, 'p')
  c.setPair(10, 17, 'd').setPair(9, 18, 'd').setPair(9, 19, 'b')
  return c
}

/** A plain white t-shirt with the Nuxt logo (two green peaks) on the chest. */
function shirt(): PixelCanvas {
  const c = canvas().rect(11, 25, 14, 11, 'W').rect(12, 35, 12, 1, 'V')
  c.set(11, 35, '.').set(24, 35, '.')
  // A small logo, centred and high on the chest. Small peak behind, darker; big peak in front.
  c.rect(19, 28, 2, 1, 'G').rect(18, 29, 4, 1, 'G')
  c.rect(15, 27, 2, 1, 'g').rect(14, 28, 4, 1, 'g').rect(13, 29, 6, 1, 'g')
  return c
}

const eyesOpen = (): PixelCanvas => canvas().rectPair(10, 13, 3, 3, 'd').set(10, 13, 'c').set(23, 13, 'c')
const eyesClosed = (): PixelCanvas => canvas().rectPair(10, 15, 3, 1, 'd')
const eyesHappy = (): PixelCanvas => canvas().setPair(10, 16, 'd').setPair(11, 15, 'd').setPair(12, 16, 'd')
const brows = (): PixelCanvas => canvas().setPair(9, 10, 'd').setPair(10, 10, 'd').setPair(11, 11, 'd').setPair(12, 11, 'd')
/** A small ω under the nose: the classic cute critter mouth. */
const mouthClosed = (): PixelCanvas => canvas().setPair(17, 18, 'd').setPair(16, 19, 'd').setPair(15, 18, 'd')
const mouthOpen = (): PixelCanvas => canvas().setPair(17, 18, 'd').rect(16, 19, 4, 2, 'd').rect(17, 21, 2, 1, 'd').rect(17, 20, 2, 1, 'T')

export interface PandaPart {
  id: PandaPartId
  paths: SpritePath[]
}

const BUILDERS: Record<PandaPartId, () => PixelCanvas> = {
  tail,
  legs,
  body,
  shirt,
  armL: arm,
  armR,
  ears,
  head,
  eyesOpen,
  eyesClosed,
  eyesHappy,
  brows,
  mouthClosed,
  mouthOpen,
}

/** Back to front. The face parts have no outline of their own: they sit inside the head's. */
const FLAT: ReadonlySet<PandaPartId> = new Set(['eyesOpen', 'eyesClosed', 'eyesHappy', 'brows', 'mouthClosed', 'mouthOpen'])
const ORDER: readonly PandaPartId[] = ['tail', 'legs', 'body', 'shirt', 'armL', 'armR', 'ears', 'head', 'eyesOpen', 'eyesClosed', 'eyesHappy', 'brows', 'mouthClosed', 'mouthOpen']

const cache = new Map<PandaVariant, PandaPart[]>()

export function pandaParts(variant: PandaVariant): PandaPart[] {
  const cached = cache.get(variant)
  if (cached) return cached
  const palette = PALETTES[variant]
  const parts = ORDER.map((id) => {
    const canvasForPart = BUILDERS[id]()
    // Outlined rows grow by one pixel on each side, so they are drawn at (-1, -1) by the view.
    const rows = FLAT.has(id) ? canvasForPart.rows().map((row) => `.${row}.`) : canvasForPart.outlined()
    const padded = FLAT.has(id) ? ['.'.repeat(PANDA_SIZE.width + 2), ...rows, '.'.repeat(PANDA_SIZE.width + 2)] : rows
    return { id, paths: rowsToPaths(padded, palette) }
  })
  cache.set(variant, parts)
  return parts
}
