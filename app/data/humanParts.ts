import type { SpriteRows } from '~/types/sprite'

/**
 * 12x12 human bust. k skin, d skin shade, e eyes, c blush, m mouth, S shirt.
 * Hair H (J for its highlight), glasses G, hat C and beard B are layered on top.
 */
export const HUMAN_BASE: SpriteRows = [
  '............',
  '............',
  '....kkkk....',
  '...kkkkkk...',
  '...kkkkkk...',
  '...kekkek...',
  '...kekkek...',
  '...ckmmkc...',
  '....kkkk....',
  '.....dd.....',
  '..SSSddSSS..',
  '.SSSSSSSSSS.',
]

const BLANK = '............'

export type HairStyle = 'short' | 'long' | 'bun' | 'afro' | 'bald' | 'mohawk' | 'pigtails' | 'bob' | 'spiky'
export type Extra = 'none' | 'glasses' | 'beard' | 'cap' | 'beanie' | 'stache'

/** Pads a partial layer down to 12 rows. */
const layer = (...rows: string[]): SpriteRows => [...rows, ...Array<string>(12 - rows.length).fill(BLANK)]

export const HAIR: Record<HairStyle, SpriteRows> = {
  short: layer(BLANK, '....HHHH....', '...HJJHHH...', '...HHHHHH...', '...HkkkkH...'),
  long: layer(BLANK, '....HHHH....', '..HHJJHHHH..', '..HHHHHHHH..', '..HHkkkkHH..', '..HH....HH..', '..HH....HH..', '..HH....HH..'),
  bun: layer('.....HH.....', '....HJHH....', '....HHHH....', '...HJHHHH...', '...HkkkkH...'),
  afro: layer('...HHHHHH...', '..HJJHHHHH..', '.HHJHHHHHHH.', '.HHHHHHHHHH.', '.HHHkkkkHHH.', '..HH....HH..'),
  bald: layer(BLANK, BLANK, '.....JJ.....'),
  mohawk: layer('.....HH.....', '.....JH.....', '.....HH.....', '.....HH.....'),
  pigtails: layer(BLANK, '....HHHH....', '..H.HJJH.H..', '.HH.HHHH.HH.', '.HH.HkkH.HH.', '.HH......HH.', '..H......H..'),
  bob: layer(BLANK, '....HHHH....', '..HHJJHHHH..', '..HHHHHHHH..', '..HHkkkkHH..', '..HH....HH..', '..HH....HH..'),
  spiky: layer('..H..HH..H..', '..HH.HH.HH..', '...HJHHHH...', '...HHHHHH...', '...HkkkkH...'),
}

export const EXTRAS: Record<Extra, SpriteRows> = {
  none: layer(),
  glasses: layer(BLANK, BLANK, BLANK, BLANK, BLANK, '...GGGGGG...', '...GeGGeG...'),
  beard: layer(BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, '...BBmmBB...', '....BBBB....'),
  stache: layer(BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, '....BBBB....'),
  cap: layer(BLANK, BLANK, '...CCCCCC...', '..CCCCCCCC..', '..CCCCCCCCC.'),
  beanie: layer(BLANK, '.....CC.....', '...CCCCCC...', '..CCCCCCCC..', '..CCCCCCCC..'),
}
