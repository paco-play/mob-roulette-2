export type PandaMood = 'idle' | 'talk' | 'push' | 'grumpy' | 'dance' | 'sleep' | 'water' | 'proud'

export interface Speech {
  id: number
  text: string
}

export interface StageAnchors {
  width: number
  floorY: number
  wheel: { x: number; y: number; r: number }
  panda: { x: number; y: number }
}

export type EventId = 'cat' | 'trip' | 'roomba' | 'plane' | 'pigeon'

export interface PlantState {
  id: string
  kind: PlantKind
  /** Hours of hydrated growth, 0..GROWTH_MAX_HOURS. */
  growthHours: number
  /** Timestamp of the last time the water level was settled. */
  settledAt: number
  /** 0..1 */
  water: number
}

export type PlantKind = 'monstera' | 'palm' | 'snake' | 'bush' | 'fern'

/** What a plant looks like right now, already derived from time and water. */
export interface PlantView {
  id: string
  kind: PlantKind
  growth: number
  water: number
  thirsty: boolean
  splash: number
}
