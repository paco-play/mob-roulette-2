import type { SpritePath } from '~/types/sprite'
import { PixelCanvas, rowsToPaths } from '~/utils/pixelCanvas'

/** The "Me gusta" rage face, in 32x32 pixels. k ink, w paper. */
export const ME_GUSTA_SIZE = 32

function paint(): PixelCanvas {
  const c = new PixelCanvas(ME_GUSTA_SIZE, ME_GUSTA_SIZE)
  // round head with a one pixel outline
  c.disc(16, 16, 15.6, 'k').disc(16, 16, 14, 'w')
  // two heavy brows, the shorter one just under the first
  c.rect(8, 8, 17, 1, 'k').rect(13, 10, 9, 1, 'k')
  // left eye: a thick lid, a box, a tiny pupil
  c.rect(7, 12, 9, 2, 'k').rect(8, 14, 1, 4, 'k').rect(8, 17, 7, 1, 'k').rect(14, 14, 1, 4, 'k').rect(11, 15, 1, 1, 'k')
  // right eye, with the dark bag underneath
  c.rect(19, 12, 8, 2, 'k').rect(20, 14, 1, 4, 'k').rect(26, 14, 1, 4, 'k').rect(21, 15, 1, 1, 'k').rect(22, 16, 5, 3, 'k')
  // long, flat nose
  c.rect(16, 13, 1, 7, 'k').rect(14, 20, 5, 1, 'k')
  // the grumpy mouth: a thick moustache line with a lip below
  c.rect(11, 21, 11, 2, 'k').rect(8, 22, 4, 1, 'k').rect(21, 22, 4, 1, 'k').rect(13, 24, 7, 1, 'k')
  // cheek creases and chin dots
  c.rect(3, 20, 5, 1, 'k').rect(25, 20, 4, 1, 'k').set(14, 27, 'k').set(17, 27, 'k').set(16, 28, 'k')
  return c
}

let cached: SpritePath[] | null = null

export function meGustaPaths(): SpritePath[] {
  cached ??= rowsToPaths(paint().rows(), { k: '#26392c', w: '#ffffff' })
  return cached
}
