/** A pixel sprite: rows of characters, each character a palette key ('.' is transparent). */
export type SpriteRows = readonly string[]

export type SpritePalette = Readonly<Record<string, string>>

export interface Avatar {
  id: string
  label: string
  kind: 'human' | 'animal'
  rows: SpriteRows
  palette: SpritePalette
}

export interface SpritePath {
  color: string
  d: string
}
