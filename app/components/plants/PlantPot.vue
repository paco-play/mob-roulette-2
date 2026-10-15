<script setup lang="ts">
import type { PlantKind } from '~/types/scene'

const props = defineProps<{
  kind: PlantKind
  /** 0..1 */
  growth: number
  /** 0..1 */
  water: number
  thirsty: boolean
  /** Changes whenever the plant is watered, to replay the drops. */
  splash: number
  label: string
}>()

defineEmits<{ water: [] }>()

const FRESH = ['#7da06a', '#5f8a56', '#93b383']
const DRY = ['#b9b886', '#a9a874', '#c6c595']

const leaves = computed(() => {
  const palette = props.thirsty ? DRY : FRESH
  return plantLeaves(props.kind, props.growth).map((leaf, i) => ({
    key: i,
    path: leafPath(leaf.length, leaf.width),
    fill: palette[leaf.shade]!,
    angle: leaf.angle + (props.thirsty ? Math.sign(leaf.angle || 1) * 16 : 0),
  }))
})

const percent = computed(() => Math.round(props.growth * 100))
const tooltip = computed(() => `${props.label} · ${percent.value} % de sa taille · eau ${Math.round(props.water * 100)} %${props.thirsty ? ' (a soif)' : ''} · cliquer pour arroser`)
</script>

<template>
  <button class="plant" type="button" :title="tooltip" :aria-label="`Arroser : ${tooltip}`" @click="$emit('water')">
    <svg viewBox="0 0 160 220" aria-hidden="true">
      <g class="foliage" transform="translate(80 176)">
        <g class="sway">
          <g v-for="leaf in leaves" :key="leaf.key" :transform="`rotate(${leaf.angle})`">
            <path :d="leaf.path" :fill="leaf.fill" stroke="var(--forest)" stroke-width="2" stroke-linejoin="round" />
            <path :d="`M0 0 L0 ${-(kind === 'bush' ? 38 : 70) * (0.4 + growth * 0.6)}`" class="rib" />
          </g>
        </g>
      </g>
      <path class="pot" d="M44 172 H116 L108 214 H52 Z" />
      <rect class="rim" x="38" y="164" width="84" height="14" rx="3" />
      <!-- Water gauge on the front of the pot -->
      <rect class="gauge" x="56" y="188" width="48" height="10" rx="3" />
      <rect class="gauge-fill" :class="{ low: thirsty }" x="58" y="190" :width="44 * water" height="6" rx="2" />
    </svg>

    <svg v-if="thirsty" class="drop-hint" viewBox="0 0 20 26" aria-hidden="true">
      <path d="M10 2 C 16 11, 18 14, 18 17 A8 8 0 0 1 2 17 C 2 14, 4 11, 10 2 Z" />
    </svg>

    <span v-if="splash" :key="splash" class="rain" aria-hidden="true">
      <i v-for="n in 7" :key="n" :style="{ '--x': `${n * 13 - 4}%`, '--d': `${n * 0.07}s` }" />
    </span>
  </button>
</template>

<style scoped>
.plant {
  position: relative;
  display: block;
  padding: 0;
  border: 0;
  background: none;
  width: 100%;
  transform-origin: 50% 100%;
}

svg {
  display: block;
  width: 100%;
  overflow: visible;
}

.pot {
  fill: #ded6b8;
  stroke: var(--forest);
  stroke-width: 2.5;
  stroke-linejoin: round;
}

.rim {
  fill: #ece6cf;
  stroke: var(--forest);
  stroke-width: 2.5;
}

.gauge {
  fill: var(--paper-2);
  stroke: var(--forest);
  stroke-width: 2;
}

.gauge-fill {
  fill: #8fc0d8;
  transition: width 0.8s var(--ease-out);
}

.gauge-fill.low {
  fill: var(--accent-soft);
}

.rib {
  stroke: var(--forest);
  stroke-opacity: 0.45;
  stroke-width: 1.4;
  stroke-linecap: round;
}

.sway {
  animation: sway 6s ease-in-out infinite;
  transform-origin: 0 0;
}

@keyframes sway {
  50% {
    transform: rotate(1.6deg);
  }
}

.drop-hint {
  position: absolute;
  top: -4px;
  left: 50%;
  width: 18px;
  fill: #8fc0d8;
  stroke: var(--forest);
  stroke-width: 1.6;
  animation: bob 1.4s ease-in-out infinite;
}

@keyframes bob {
  50% {
    transform: translateY(-5px);
  }
}

.rain {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.rain i {
  position: absolute;
  left: var(--x);
  top: 0;
  width: 5px;
  height: 11px;
  border-radius: 50% 50% 50% 50% / 70% 70% 30% 30%;
  background: #8fc0d8;
  animation: fall 0.9s ease-in var(--d) both;
}

@keyframes fall {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  to {
    transform: translateY(120px);
    opacity: 0;
  }
}
</style>
