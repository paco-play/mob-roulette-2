import type { PlantKind } from '~/types/scene'

export const PLANT_KINDS: readonly PlantKind[] = ['monstera', 'palm', 'snake', 'bush', 'fern']

/** Hours of hydrated time needed to reach full size: about five weeks. */
export const GROWTH_MAX_HOURS = 24 * 35

/** A full watering lasts this long before the plant is dry. */
export const WATER_LASTS_HOURS = 72
