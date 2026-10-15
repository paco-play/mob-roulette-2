import { parseClock } from './time'

/** How long lunch lasts; nobody takes a turn during it. */
export const LUNCH_MINUTES = 90
/** The sleepy moment, counted from the start of lunch: 12:00 lunch means 14:00. */
export const DIGESTION_AFTER_LUNCH = 120
/** Below this, the warning stays hidden. */
export const WARNING_THRESHOLD = 0.5

export interface DigestionInput {
  /** Minutes since midnight, now. */
  nowMinutes: number
  /** Number of people still waiting for their turn (the one drawn now included). */
  poolSize: number
  turnMinutes: number
  breakMinutes: number
  lunch: string
}

export interface DigestionForecast {
  /** Chance (0..1) for each waiting person to be the one who plays at the sleepy moment. */
  chance: number
  /** True when the turn that starts right now covers the sleepy moment. */
  nowIsPeak: boolean
  /** Sleepy moment, in minutes since midnight. */
  peak: number
}

/**
 * Lays the remaining turns on the clock (turn, break, turn, break…, skipping lunch) and looks at
 * which one covers the sleepy moment. One turn at most does, and any of the waiting people can be
 * the one who gets it: with 2 people left and one slot at 14:00, each has 50 %.
 */
export function digestionForecast({ nowMinutes, poolSize, turnMinutes, breakMinutes, lunch }: DigestionInput): DigestionForecast {
  const lunchStart = parseClock(lunch)
  const lunchEnd = lunchStart + LUNCH_MINUTES
  const peak = lunchStart + DIGESTION_AFTER_LUNCH
  let cursor = nowMinutes
  let hits = 0
  let nowIsPeak = false

  for (let slot = 0; slot < poolSize; slot++) {
    if (cursor >= lunchStart && cursor < lunchEnd) cursor = lunchEnd
    const end = cursor + turnMinutes
    if (peak >= cursor && peak < end) {
      hits++
      if (slot === 0) nowIsPeak = true
    }
    cursor = end + breakMinutes
  }
  return { chance: poolSize > 0 ? hits / poolSize : 0, nowIsPeak, peak }
}

/** Warning intensity used by the UI: 0 hidden (under 50 %), 2 pulsing, 3 certain. */
export function warningLevel(chance: number | null): 0 | 2 | 3 {
  if (chance === null || chance < WARNING_THRESHOLD) return 0
  return chance >= 1 ? 3 : 2
}
