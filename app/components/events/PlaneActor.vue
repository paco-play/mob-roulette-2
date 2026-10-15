<script setup lang="ts">
import type { StageAnchors } from '~/types/scene'

const props = defineProps<{ phase: string; anchors: StageAnchors }>()

const style = computed(() => ({
  '--w': `${props.anchors.width}px`,
  '--floor': `${props.anchors.floorY}px`,
}))
</script>

<template>
  <div class="plane" :style="style" :data-phase="phase">
    <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden="true">
      <path class="wing" d="M2 18 L62 2 L28 20 Z" />
      <path class="belly" d="M28 20 L62 2 L34 36 Z" />
      <path class="fold" d="M28 20 L34 36" />
    </svg>
  </div>
</template>

<style scoped>
.plane {
  position: absolute;
  left: 0;
  top: 0;
  animation: glide 6.5s ease-in-out both;
  will-change: transform;
}

svg {
  display: block;
  overflow: visible;
}

.wing {
  fill: var(--paper-2);
  stroke: var(--forest);
  stroke-width: 2;
  stroke-linejoin: round;
}

.belly {
  fill: var(--sage-3);
  stroke: var(--forest);
  stroke-width: 2;
  stroke-linejoin: round;
}

.fold {
  stroke: var(--forest);
  stroke-width: 1.6;
}

@keyframes glide {
  0% {
    transform: translate(-90px, 110px) rotate(18deg);
  }
  25% {
    transform: translate(calc(var(--w) * 0.28), 260px) rotate(-14deg);
  }
  50% {
    transform: translate(calc(var(--w) * 0.52), 130px) rotate(16deg);
  }
  75% {
    transform: translate(calc(var(--w) * 0.76), calc(var(--floor) - 90px)) rotate(-10deg);
  }
  100% {
    transform: translate(calc(var(--w) + 110px), calc(var(--floor) - 30px)) rotate(14deg);
  }
}
</style>
