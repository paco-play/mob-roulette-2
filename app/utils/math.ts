export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value))

export const lerp = (from: number, to: number, t: number): number => from + (to - from) * t

export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4)

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

/** Positive modulo. */
export const mod = (value: number, divisor: number): number => ((value % divisor) + divisor) % divisor

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
