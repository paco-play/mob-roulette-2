<script setup lang="ts">
import type { StageAnchors } from '~/types/scene'

const props = defineProps<{ phase: string; anchors: StageAnchors }>()

const style = computed(() => ({
  '--from': '-120px',
  '--to': `${props.anchors.width + 120}px`,
  '--y': `${props.anchors.floorY + 22}px`,
  animationPlayState: props.phase === 'cross' ? 'running' : 'paused',
}))
</script>

<template>
  <div class="roomba" :style="style">
    <svg width="88" height="30" viewBox="0 0 88 30" aria-hidden="true">
      <path class="shell" d="M4 28 Q4 8 44 8 Q84 8 84 28 Z" />
      <circle class="led" cx="44" cy="18" r="3.5" />
      <path class="bumper" d="M8 24 H80" />
      <path class="note" d="M30 8 L34 -4 L50 -2 L46 9 Z" />
    </svg>
    <span class="beep" aria-hidden="true">bip</span>
  </div>
</template>

<style scoped>
.roomba {
  position: absolute;
  left: 0;
  top: var(--y);
  animation: cross 13s linear both;
  will-change: transform;
}

svg {
  display: block;
  overflow: visible;
  animation: wobble 0.7s ease-in-out infinite alternate;
  transform-origin: 50% 100%;
}

.shell {
  fill: var(--forest-3);
  stroke: var(--forest);
  stroke-width: 2.6;
  stroke-linejoin: round;
}

.bumper {
  stroke: var(--forest);
  stroke-width: 2.2;
  stroke-linecap: round;
}

.led {
  fill: var(--accent);
  stroke: var(--forest);
  stroke-width: 1.6;
  animation: led 1.1s steps(1) infinite;
}

.note {
  fill: #f2e3a6;
  stroke: var(--forest);
  stroke-width: 1.6;
  stroke-linejoin: round;
}

.beep {
  position: absolute;
  left: 30px;
  top: -34px;
  font-family: var(--font-hand);
  font-size: 14px;
  color: var(--forest);
  animation: beep 2.4s ease-out infinite;
  opacity: 0;
}

@keyframes cross {
  from {
    transform: translateX(var(--from));
  }
  to {
    transform: translateX(var(--to));
  }
}

@keyframes wobble {
  to {
    transform: rotate(-1.4deg);
  }
}

@keyframes led {
  50% {
    fill: var(--sage);
  }
}

@keyframes beep {
  0%,
  60% {
    opacity: 0;
    transform: translateY(6px);
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-8px);
  }
}
</style>
