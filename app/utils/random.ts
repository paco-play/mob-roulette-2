export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

export const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min)

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T
}

/** Pick without immediately repeating the previous pick. */
export function pickFresh<T>(items: readonly T[], previous: T | undefined): T {
  if (items.length < 2) return items[0] as T
  let next = pick(items)
  while (next === previous) next = pick(items)
  return next
}

export const chance = (probability: number): boolean => Math.random() < probability

export const uid = (): string => Math.random().toString(36).slice(2, 10)
