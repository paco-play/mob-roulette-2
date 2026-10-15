/** "HH:MM" -> minutes since midnight. */
export function parseClock(clock: string): number {
  const [h = '12', m = '0'] = clock.split(':')
  return Number(h) * 60 + Number(m)
}

export const minutesOfDay = (date: Date): number => date.getHours() * 60 + date.getMinutes()

export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.ceil(totalSeconds))
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export const HOUR_MS = 3_600_000
