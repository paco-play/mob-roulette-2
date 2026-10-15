<script setup lang="ts">
withDefaults(defineProps<{ text: string; tilt?: number; arrow?: 'left' | 'right' | 'none' }>(), { tilt: -2, arrow: 'none' })
</script>

<template>
  <p class="note scribble" :style="{ transform: `rotate(${tilt}deg)` }">
    <svg v-if="arrow === 'left'" class="arrow" viewBox="0 0 44 18" aria-hidden="true"><path d="M42 12 C 28 2, 14 4, 3 10 M3 10 L10 4 M3 10 L11 14" /></svg>
    <span class="text">{{ text }}</span>
    <svg v-if="arrow === 'right'" class="arrow" viewBox="0 0 44 18" aria-hidden="true"><path d="M2 12 C 16 2, 30 4, 41 10 M41 10 L34 4 M41 10 L33 14" /></svg>
  </p>
</template>

<style scoped>
.note {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  animation: write 1.2s steps(24) 1.4s both;
}

.text {
  border-bottom: 1.5px solid rgb(38 57 44 / 0.5);
}

.arrow {
  width: 44px;
  fill: none;
  stroke: var(--forest);
  stroke-width: 1.6;
  stroke-linecap: round;
}

@keyframes write {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
</style>
