const toRgb = (hex: string): [number, number, number] => {
  const value = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)) as [number, number, number]
}

const toHex = (channels: readonly number[]): string =>
  `#${channels.map((c) => Math.round(clamp(c, 0, 255)).toString(16).padStart(2, '0')).join('')}`

/** Linear blend: t = 0 gives `from`, t = 1 gives `to`. */
export function mix(from: string, to: string, t: number): string {
  const a = toRgb(from)
  const b = toRgb(to)
  return toHex(a.map((channel, i) => channel + (b[i]! - channel) * t))
}

export const lighten = (hex: string, t: number): string => mix(hex, '#ffffff', t)

export const darken = (hex: string, t: number): string => mix(hex, '#000000', t)
