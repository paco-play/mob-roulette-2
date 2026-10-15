export interface SpinOptions {
  segmentCount: number
  targetIndex: number
  durationMs: number
  onTick?: () => void
}

/** Degrees per frame at which the wheel counts as "full speed" for the motion blur. */
const FULL_SPEED = 22
const WINDUP_DEGREES = 16
const WINDUP_MS = 450

/** Wheel physics: the angle is driven by hand so the pointer can click on every segment boundary. */
export function useWheel() {
  const angle = ref(0)
  const spinning = ref(false)
  /** 0..1, derived from the angular velocity. */
  const speed = ref(0)
  /** Bumped on every boundary crossing; lets the pointer flap without owning any DOM. */
  const tickCount = ref(0)
  let frame = 0

  const indexUnderPointer = (segmentCount: number): number => {
    const segment = 360 / segmentCount
    return Math.floor(mod(-angle.value, 360) / segment) % segmentCount
  }

  function animate(to: number, durationMs: number, ease: (t: number) => number, onFrame?: () => void): Promise<void> {
    const from = angle.value
    const started = performance.now()
    return new Promise((resolve) => {
      const step = (time: number): void => {
        const t = clamp((time - started) / durationMs, 0, 1)
        const previous = angle.value
        angle.value = lerp(from, to, ease(t))
        speed.value = clamp(Math.abs(angle.value - previous) / FULL_SPEED, 0, 1)
        onFrame?.()
        if (t < 1) frame = requestAnimationFrame(step)
        else resolve()
      }
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(step)
    })
  }

  /** Winds up backwards like a pitcher, then launches and lands `targetIndex` under the pointer. */
  async function spin({ segmentCount, targetIndex, durationMs, onTick }: SpinOptions): Promise<void> {
    if (spinning.value || segmentCount < 1) return
    spinning.value = true
    await animate(angle.value - WINDUP_DEGREES, WINDUP_MS, easeOutCubic)
    const segment = 360 / segmentCount
    const landing = (targetIndex + 0.5 + randomBetween(-0.32, 0.32)) * segment
    const turns = randomInt(5, 7) * 360
    const base = angle.value - mod(angle.value, 360)
    const target = base + turns + (360 - landing)
    let last = indexUnderPointer(segmentCount)
    await animate(target, durationMs, easeOutQuart, () => {
      const now = indexUnderPointer(segmentCount)
      if (now === last) return
      last = now
      tickCount.value++
      onTick?.()
    })
    angle.value = mod(angle.value, 360)
    speed.value = 0
    spinning.value = false
  }

  /** A push without a result (the cat, the panda straightening things up). */
  async function nudge(deltaDegrees: number, durationMs: number): Promise<void> {
    spinning.value = true
    await animate(angle.value + deltaDegrees, durationMs, easeOutCubic)
    speed.value = 0
    spinning.value = false
  }

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return { angle, spinning, speed, tickCount, spin, nudge }
}
