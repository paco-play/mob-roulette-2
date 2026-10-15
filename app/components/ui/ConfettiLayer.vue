<script setup lang="ts">
import type { ConfettiBurst } from '~/composables/useConfetti'

defineProps<{ bursts: readonly ConfettiBurst[] }>()

const GREENS = ['#9db08e', '#3c5a45', '#c4cfb3', '#cf5f2e', '#f2e3a6', '#26392c']
const RAINBOW = ['#e0575b', '#f2b134', '#6bbf6a', '#4aa3d8', '#a064d0', '#f27eb0']
const PARTICLES = 70

/** Cheap deterministic noise, so a burst keeps its shape across re-renders. */
const noise = (seed: number): number => {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function particleStyle(burst: ConfettiBurst, index: number): Record<string, string> {
  const seed = burst.id * 100 + index
  const angle = noise(seed) * Math.PI * 2
  const distance = 120 + noise(seed + 1) * 380
  const palette = burst.rainbow ? RAINBOW : GREENS
  return {
    '--dx': `${Math.cos(angle) * distance}px`,
    '--dy': `${Math.sin(angle) * distance - 60}px`,
    '--rot': `${noise(seed + 2) * 900 - 450}deg`,
    '--delay': `${noise(seed + 3) * 0.12}s`,
    background: palette[index % palette.length]!,
    width: `${6 + noise(seed + 4) * 7}px`,
    height: `${9 + noise(seed + 5) * 9}px`,
    borderRadius: index % 3 === 0 ? '50% 0' : '1px',
  }
}
</script>

<template>
  <div class="layer" aria-hidden="true">
    <div v-for="burst in bursts" :key="burst.id" class="burst" :style="{ left: `${burst.x}px`, top: `${burst.y}px` }">
      <i v-for="n in PARTICLES" :key="n" :style="particleStyle(burst, n)" />
    </div>
  </div>
</template>

<style scoped>
.layer {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  overflow: hidden;
}

.burst {
  position: absolute;
}

i {
  position: absolute;
  left: 0;
  top: 0;
  animation: fly 2.3s cubic-bezier(0.1, 0.7, 0.3, 1) var(--delay) both;
}

@keyframes fly {
  0% {
    transform: translate(0, 0) rotate(0) scale(0.4);
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx), calc(var(--dy) + 260px)) rotate(var(--rot)) scale(1);
    opacity: 0;
  }
}
</style>
