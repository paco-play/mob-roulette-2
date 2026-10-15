export interface MemberColor {
  id: string
  label: string
  /** Pale tone used on the wheel. */
  fill: string
}

export const MEMBER_COLORS: readonly MemberColor[] = [
  { id: 'mint', label: 'Menthe', fill: '#cfe3c8' },
  { id: 'butter', label: 'Beurre', fill: '#f2e3a6' },
  { id: 'peach', label: 'Pêche', fill: '#f4c9b0' },
  { id: 'rose', label: 'Rose', fill: '#efc1c6' },
  { id: 'lilac', label: 'Lilas', fill: '#d6c9e8' },
  { id: 'sky', label: 'Ciel', fill: '#bcd8e6' },
  { id: 'sage', label: 'Sauge', fill: '#b9c9a6' },
  { id: 'sand', label: 'Sable', fill: '#e6d7b4' },
  { id: 'aqua', label: 'Lagon', fill: '#b7e0d6' },
  { id: 'apricot', label: 'Abricot', fill: '#f7d7a3' },
  { id: 'mauve', label: 'Mauve', fill: '#e2bfd7' },
  { id: 'fog', label: 'Brume', fill: '#cfd6d8' },
]

export const colorById = (id: string): MemberColor => MEMBER_COLORS.find((c) => c.id === id) ?? MEMBER_COLORS[0]!
