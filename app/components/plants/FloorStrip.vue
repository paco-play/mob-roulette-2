<script setup lang="ts">
import type { PlantKind, PlantView } from '~/types/scene'

defineProps<{ plants: readonly PlantView[]; tank: number; capacity: number }>()
defineEmits<{ water: [id: string] }>()

/** Where each plant stands, left to right. The middle is left free for the wheel and the panda. */
const SLOTS = ['70.5%', '77%', '83.5%', '89.5%', '95.5%']
const LABELS: Record<PlantKind, string> = {
  monstera: 'Monstera',
  palm: 'Palmier',
  snake: 'Langue-de-belle-mère',
  bush: 'Buis',
  fern: 'Fougère',
}
</script>

<template>
  <footer class="floor">
    <div class="boards" aria-hidden="true" />
    <span class="rug" aria-hidden="true" />
    <div class="tank-slot"><WaterTank :level="tank" :capacity="capacity" /></div>
    <div v-for="(plant, i) in plants" :key="plant.id" class="slot" :style="{ left: SLOTS[i % SLOTS.length] }">
      <PlantPot
        :kind="plant.kind"
        :growth="plant.growth"
        :water="plant.water"
        :thirsty="plant.thirsty"
        :splash="plant.splash"
        :label="LABELS[plant.kind]"
        @water="$emit('water', plant.id)"
      />
    </div>
  </footer>
</template>

<style scoped>
.floor {
  position: relative;
  height: var(--floor-h);
}

/* Floorboards: a line where feet touch the ground, then wood grain going toward the viewer */
.boards {
  position: absolute;
  inset: 0;
  border-top: 2px solid var(--forest);
  background:
    linear-gradient(var(--forest), var(--forest)) 0 var(--floor-line) / 100% 1.5px no-repeat,
    repeating-linear-gradient(90deg, transparent 0 118px, rgb(38 57 44 / 0.18) 118px 119.5px) 0 var(--floor-line) / 100% 100% no-repeat,
    var(--stripes),
    var(--sage-3);
}

/* Under the wheel and the panda, and under the plants: it is part of the floor, so it comes first */
.rug {
  position: absolute;
  left: calc(32px + (100% - 96px - var(--board-w)) / 2);
  top: calc(var(--floor-line) - 40px);
  width: min(calc((100% - 96px - var(--board-w)) * 0.8), 800px);
  height: 78px;
  transform: translateX(-50%);
  border: 2px solid var(--forest);
  border-radius: 50%;
  /* Fully opaque, so the floor line can't show through it */
  background: var(--stripes), var(--sage-2);
  box-shadow: 0 0 0 0 transparent;
}

.tank-slot {
  position: absolute;
  left: 1.2%;
  bottom: calc(var(--floor-h) - var(--floor-line) - 12px);
}

.slot {
  position: absolute;
  bottom: calc(var(--floor-h) - var(--floor-line) - 4px);
  width: clamp(84px, 7.4vw, 118px);
  transform: translateX(-50%);
}

.slot :deep(.plant) {
  /* feet of the pot sit on the floor line */
  margin-bottom: 0;
}
</style>
