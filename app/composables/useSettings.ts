import type { GameSettings } from '~/types/game'

export const DEFAULT_SETTINGS: GameSettings = {
  turnMinutes: 25,
  breakMinutes: 5,
  lunch: '12:00',
  rotation: true,
  sound: true,
}

export function useSettings() {
  return usePersisted<GameSettings>('settings', { ...DEFAULT_SETTINGS })
}
