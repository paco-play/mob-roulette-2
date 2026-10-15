export interface Point {
  x: number
  y: number
}

/** Angles are in degrees, clockwise, 0 at the top. */
export function polar(cx: number, cy: number, radius: number, degrees: number): Point {
  const rad = ((degrees - 90) * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

export function wedgePath(cx: number, cy: number, radius: number, from: number, to: number): string {
  if (to - from >= 359.99) {
    return `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius} Z`
  }
  const start = polar(cx, cy, radius, from)
  const end = polar(cx, cy, radius, to)
  const large = to - from > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)} Z`
}
