<script setup lang="ts">
import { catPaths } from '~/data/catSprite'
import type { StageAnchors } from '~/types/scene'

const props = defineProps<{ phase: string; anchors: StageAnchors }>()

const CAT_WIDTH = 126
const CAT_HEIGHT = 84
/** The outlined sprite has two transparent rows under the paws. */
const FOOT_INSET = 7

const frames = { run1: catPaths('run1'), run2: catPaths('run2'), sit: catPaths('sit') }

const target = computed(() => {
  const { wheel, floorY, width } = props.anchors
  switch (props.phase) {
    case 'run':
      return { x: wheel.x - wheel.r - 40, y: floorY, ms: 1800 }
    case 'jump':
      return { x: wheel.x + wheel.r * 0.08, y: wheel.y - wheel.r + 6, ms: 600 }
    case 'ride':
      return { x: wheel.x + wheel.r * 0.08, y: wheel.y - wheel.r + 6, ms: 0 }
    case 'leave':
      return { x: width + 160, y: floorY, ms: 1900 }
    default:
      return { x: -160, y: floorY, ms: 0 }
  }
})

const running = computed(() => props.phase === 'run' || props.phase === 'leave')
const sitting = computed(() => props.phase === 'ride')

const style = computed(() => ({
  transform: `translate(${target.value.x - CAT_WIDTH / 2}px, ${target.value.y - CAT_HEIGHT + FOOT_INSET}px)`,
  transitionDuration: `${target.value.ms}ms`,
  transitionTimingFunction: props.phase === 'jump' ? 'cubic-bezier(0.3, 1.4, 0.5, 1)' : props.phase === 'leave' ? 'cubic-bezier(0.5, 0, 0.9, 0.6)' : 'linear',
}))
</script>

<template>
  <div class="cat" :class="`phase-${phase}`" :style="style">
    <svg :width="CAT_WIDTH" :height="CAT_HEIGHT" viewBox="0 0 36 24" shape-rendering="crispEdges" aria-hidden="true">
      <g class="hop">
        <g class="frame run1" :class="{ on: !sitting }"><path v-for="p in frames.run1" :key="p.color" :d="p.d" :fill="p.color" /></g>
        <g class="frame run2" :class="{ on: !sitting }"><path v-for="p in frames.run2" :key="p.color" :d="p.d" :fill="p.color" /></g>
        <g class="frame sit" :class="{ on: sitting }"><path v-for="p in frames.sit" :key="p.color" :d="p.d" :fill="p.color" /></g>
      </g>
    </svg>
    <span v-if="running" class="dust" aria-hidden="true" />
  </div>
</template>

<style scoped>
.cat {
  position: absolute;
  left: 0;
  top: 0;
  transition-property: transform;
  will-change: transform;
}

svg {
  display: block;
  overflow: visible;
}

.frame {
  opacity: 0;
}

.frame.on.run1 {
  opacity: 1;
}

.frame.on.sit {
  opacity: 1;
}

/* Two stepped frames while running, plus a one pixel gallop bounce */
.phase-run .frame.run1,
.phase-leave .frame.run1 {
  animation: frame-a 0.24s steps(1, end) infinite;
}

.phase-run .frame.run2,
.phase-leave .frame.run2 {
  animation: frame-b 0.24s steps(1, end) infinite;
}

.phase-run .hop,
.phase-leave .hop {
  animation: gallop 0.24s steps(1, end) infinite;
}

.phase-jump .frame.run2 {
  opacity: 1;
}

.phase-jump .frame.run1 {
  opacity: 0;
}

.phase-jump .hop {
  animation: jump 0.6s steps(6, end) both;
}

.phase-ride .hop {
  animation: purr 0.8s steps(1, end) infinite;
}

.dust {
  position: absolute;
  left: -6px;
  bottom: 4px;
  width: 8px;
  height: 8px;
  background: var(--sage-2);
  box-shadow:
    -12px 4px 0 -1px var(--sage-2),
    -22px 0 0 -2px var(--sage-2);
  animation: puff 0.48s steps(3, end) infinite;
}

@keyframes frame-a {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

@keyframes frame-b {
  0%,
  49% {
    opacity: 0;
  }
  50%,
  100% {
    opacity: 1;
  }
}

@keyframes gallop {
  50% {
    transform: translateY(-1px);
  }
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes purr {
  50% {
    transform: translateY(0.5px);
  }
}

@keyframes puff {
  to {
    opacity: 0;
    transform: translateX(-10px);
  }
}
</style>
