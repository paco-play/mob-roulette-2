export interface ConfettiBurst {
  id: number
  x: number
  y: number
  /** Leaf-green palette by default; disco mode swaps in a rainbow. */
  rainbow: boolean
}

const BURST_LIFETIME_MS = 3000

/** Fire-and-forget confetti: a list of bursts that remove themselves. */
export function useConfetti() {
  const bursts = ref<ConfettiBurst[]>([])
  let nextId = 0

  function burst(x: number, y: number, rainbow = false): void {
    const id = ++nextId
    bursts.value = [...bursts.value, { id, x, y, rainbow }]
    setTimeout(() => (bursts.value = bursts.value.filter((b) => b.id !== id)), BURST_LIFETIME_MS)
  }

  /** A full celebration: a big central burst, then two more from the sides of the wheel. */
  function celebrate(x: number, y: number, radius: number): void {
    burst(x, y)
    setTimeout(() => burst(x - radius * 0.8, y - radius * 0.2), 220)
    setTimeout(() => burst(x + radius * 0.8, y - radius * 0.2), 380)
    setTimeout(() => burst(x, y - radius * 0.6), 620)
  }

  return { bursts, burst, celebrate }
}
