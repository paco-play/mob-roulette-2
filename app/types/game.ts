export interface GameSettings {
  /** Length of one turn, in minutes. */
  turnMinutes: number
  /** Length of the break after a turn, in minutes (0 for none). */
  breakMinutes: number
  /** Lunch time, as "HH:MM". */
  lunch: string
  /** Everyone plays once before anyone plays twice. */
  rotation: boolean
  sound: boolean
}

export interface TurnRecord {
  memberId: string
  at: number
}

export interface RoundState {
  /** Members who already played in the current round. */
  playedIds: string[]
  currentId: string | null
  history: TurnRecord[]
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'done'

export type TimerPhase = 'focus' | 'break'
