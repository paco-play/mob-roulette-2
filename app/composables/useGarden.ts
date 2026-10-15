import type { PlantState } from '~/types/scene'
import { GROWTH_MAX_HOURS, PLANT_KINDS, WATER_LASTS_HOURS } from '~/data/plants'

interface GardenState {
  plants: PlantState[]
  /** Water earned by working (one unit per turn drawn). The sprinkler and manual watering both draw from it. */
  tank: number
}

export const TANK_CAPACITY = 8
const THIRSTY_BELOW = 0.3

function seedGarden(): GardenState {
  const now = Date.now()
  return {
    tank: 3,
    plants: PLANT_KINDS.map((kind, index) => ({
      id: kind,
      kind,
      growthHours: GROWTH_MAX_HOURS * (0.08 + index * 0.04),
      settledAt: now,
      water: 0.7,
    })),
  }
}

/** Plants grow only while hydrated and take about five weeks to mature, so they reward long-term use. */
export function useGarden() {
  const garden = usePersisted<GardenState>('garden', seedGarden())
  /** Bumped per plant when it gets water, so the view can play a splash. */
  const splashes = ref<Record<string, number>>({})

  function settle(plant: PlantState, at = Date.now()): void {
    const elapsedHours = Math.max(0, (at - plant.settledAt) / HOUR_MS)
    const hydratedHours = Math.min(elapsedHours, plant.water * WATER_LASTS_HOURS)
    plant.growthHours = Math.min(GROWTH_MAX_HOURS, plant.growthHours + hydratedHours)
    plant.water = Math.max(0, plant.water - elapsedHours / WATER_LASTS_HOURS)
    plant.settledAt = at
  }

  const settleAll = (): void => garden.value.plants.forEach((plant) => settle(plant))

  function water(id: string): 'watered' | 'empty' | 'full' {
    const plant = garden.value.plants.find((p) => p.id === id)
    if (!plant) return 'full'
    settle(plant)
    if (plant.water > 0.9) return 'full'
    if (garden.value.tank < 1) return 'empty'
    garden.value.tank--
    plant.water = 1
    splashes.value = { ...splashes.value, [id]: (splashes.value[id] ?? 0) + 1 }
    return 'watered'
  }

  /** The sprinkler: waters the driest plant if it is thirsty. Returns its id when it did. */
  function autoWater(): string | null {
    settleAll()
    const driest = [...garden.value.plants].sort((a, b) => a.water - b.water)[0]
    if (!driest || driest.water > THIRSTY_BELOW || garden.value.tank < 1) return null
    return water(driest.id) === 'watered' ? driest.id : null
  }

  const refill = (units = 1): void => {
    garden.value.tank = Math.min(TANK_CAPACITY, garden.value.tank + units)
  }

  const isThirsty = (plant: PlantState): boolean => plant.water < THIRSTY_BELOW
  const growthRatio = (plant: PlantState): number => plant.growthHours / GROWTH_MAX_HOURS

  onMounted(settleAll)
  let timer: ReturnType<typeof setInterval> | undefined
  onMounted(() => (timer = setInterval(settleAll, 60_000)))
  onBeforeUnmount(() => clearInterval(timer))

  return { garden, splashes, water, autoWater, refill, isThirsty, growthRatio }
}
