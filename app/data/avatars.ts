import type { Avatar, SpritePalette, SpriteRows } from '~/types/sprite'
import { ANIMAL_AVATARS } from './animalAvatars'
import { OUTLINE_KEY, outlineRows } from '~/utils/spriteOutline'
import { EXTRAS, HAIR, HUMAN_BASE, type Extra, type HairStyle } from './humanParts'

interface HumanSpec {
  id: string
  label: string
  skin: string
  hair: HairStyle
  hairColor: string
  shirt: string
  extra?: Extra
  extraColor?: string
}

const OUTLINE = '#233328'

const SKINS = ['#f6d5b8', '#e8b98f', '#c98f63', '#9a6a46', '#6b4a33'] as const
const INK = '#2b2118'

/** Stacks the layers on the base. A '.' never overwrites what is below. */
function compose(layers: readonly SpriteRows[]): SpriteRows {
  const out = HUMAN_BASE.map((row) => row.split(''))
  for (const layer of layers) {
    layer.forEach((row, y) => {
      row.split('').forEach((cell, x) => {
        if (cell !== '.' && out[y]) out[y][x] = cell
      })
    })
  }
  return out.map((row) => row.join(''))
}

function human(spec: HumanSpec): Avatar {
  const palette: SpritePalette = {
    k: spec.skin,
    d: darken(spec.skin, 0.14),
    c: mix(spec.skin, '#e0605a', 0.4),
    e: INK,
    m: '#a8574a',
    [OUTLINE_KEY]: OUTLINE,
    J: lighten(spec.hairColor, 0.28),
    S: spec.shirt,
    H: spec.hairColor,
    G: INK,
    B: spec.extraColor ?? spec.hairColor,
    C: spec.extraColor ?? '#3c5a45',
  }
  const extra = spec.extra ?? 'none'
  // Hats replace the hair; every other extra sits on top of it.
  const layers = extra === 'cap' || extra === 'beanie' ? [HAIR.bald, EXTRAS[extra]] : [HAIR[spec.hair], EXTRAS[extra]]
  return { id: spec.id, label: spec.label, kind: 'human', rows: outlineRows(compose(layers)), palette }
}

const HUMAN_SPECS: readonly HumanSpec[] = [
  { id: 'h-lea', label: 'Léa', skin: SKINS[0], hair: 'long', hairColor: '#7a4a2a', shirt: '#7fa08a' },
  { id: 'h-marc', label: 'Marc', skin: SKINS[1], hair: 'short', hairColor: '#2e2a26', shirt: '#4d6d8a', extra: 'glasses' },
  { id: 'h-aya', label: 'Aya', skin: SKINS[3], hair: 'afro', hairColor: '#1f1a17', shirt: '#d98a5b' },
  { id: 'h-tom', label: 'Tom', skin: SKINS[0], hair: 'short', hairColor: '#c9843a', shirt: '#8a6fa8', extra: 'beard' },
  { id: 'h-yuki', label: 'Yuki', skin: SKINS[1], hair: 'bob', hairColor: '#1f1a17', shirt: '#c96a73' },
  { id: 'h-omar', label: 'Omar', skin: SKINS[2], hair: 'short', hairColor: '#241d19', shirt: '#5e8c7d', extra: 'beard' },
  { id: 'h-nina', label: 'Nina', skin: SKINS[0], hair: 'bun', hairColor: '#b5532f', shirt: '#4f6d52', extra: 'glasses' },
  { id: 'h-sam', label: 'Sam', skin: SKINS[4], hair: 'bald', hairColor: '#241d19', shirt: '#e0b050', extra: 'stache', extraColor: '#241d19' },
  { id: 'h-chloe', label: 'Chloé', skin: SKINS[1], hair: 'pigtails', hairColor: '#3a2a22', shirt: '#6aa0b8' },
  { id: 'h-ravi', label: 'Ravi', skin: SKINS[2], hair: 'short', hairColor: '#17120f', shirt: '#b8603a', extra: 'glasses' },
  { id: 'h-jade', label: 'Jade', skin: SKINS[3], hair: 'bun', hairColor: '#17120f', shirt: '#e3a6a0' },
  { id: 'h-hugo', label: 'Hugo', skin: SKINS[0], hair: 'bald', hairColor: '#2e2a26', shirt: '#3c5a45', extra: 'beard', extraColor: '#8a5a2b' },
  { id: 'h-mei', label: 'Mei', skin: SKINS[1], hair: 'long', hairColor: '#17120f', shirt: '#9d8cc4' },
  { id: 'h-leo', label: 'Léo', skin: SKINS[0], hair: 'spiky', hairColor: '#cf5f2e', shirt: '#2f3b45' },
  { id: 'h-zoe', label: 'Zoé', skin: SKINS[2], hair: 'afro', hairColor: '#3a2a22', shirt: '#7aa6c2', extra: 'glasses' },
  { id: 'h-paul', label: 'Paul', skin: SKINS[0], hair: 'short', hairColor: '#8a8a86', shirt: '#6e7f5a', extra: 'stache', extraColor: '#8a8a86' },
  { id: 'h-ines', label: 'Inès', skin: SKINS[4], hair: 'long', hairColor: '#17120f', shirt: '#e0c070' },
  { id: 'h-theo', label: 'Théo', skin: SKINS[1], hair: 'short', hairColor: '#5a3a24', shirt: '#cf8a5a', extra: 'cap', extraColor: '#3c5a45' },
  { id: 'h-sofia', label: 'Sofia', skin: SKINS[2], hair: 'bob', hairColor: '#7a3a2a', shirt: '#6f9a8a' },
  { id: 'h-kim', label: 'Kim', skin: SKINS[0], hair: 'short', hairColor: '#1f1a17', shirt: '#b0b8c0', extra: 'beanie', extraColor: '#c9684a' },
  { id: 'h-maya', label: 'Maya', skin: SKINS[3], hair: 'pigtails', hairColor: '#17120f', shirt: '#d4a0c4' },
  { id: 'h-noah', label: 'Noah', skin: SKINS[1], hair: 'long', hairColor: '#c9a050', shirt: '#4d6d8a', extra: 'beard' },
]

const animal = (avatar: Avatar): Avatar => ({
  ...avatar,
  rows: outlineRows(avatar.rows),
  palette: { ...avatar.palette, [OUTLINE_KEY]: OUTLINE },
})

export const AVATARS: readonly Avatar[] = [...HUMAN_SPECS.map(human), ...ANIMAL_AVATARS.map(animal)]

const BY_ID = new Map(AVATARS.map((avatar) => [avatar.id, avatar]))

export const avatarById = (id: string): Avatar => BY_ID.get(id) ?? AVATARS[0]!
