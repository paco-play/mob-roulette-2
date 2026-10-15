<script setup lang="ts">
import type { StageAnchors } from '~/types/scene'

const props = defineProps<{ phase: string; anchors: StageAnchors }>()

const WIDTH = 70

const target = computed(() => {
  const { wheel, width } = props.anchors
  const perch = { x: wheel.x + wheel.r * 0.22, y: wheel.y - wheel.r - 4 }
  switch (props.phase) {
    case 'land':
    case 'sit':
      return { ...perch, ms: props.phase === 'land' ? 1400 : 0 }
    case 'fly':
      return { x: -140, y: perch.y - 280, ms: 1700 }
    default:
      return { x: width + 140, y: perch.y - 260, ms: 0 }
  }
})

const style = computed(() => ({
  transform: `translate(${target.value.x - WIDTH / 2}px, ${target.value.y - 56}px)`,
  transitionDuration: `${target.value.ms}ms`,
}))
</script>

<template>
  <div class="pigeon" :style="style">
    <svg :class="`phase-${phase}`" :width="WIDTH" height="60" viewBox="0 0 70 60" aria-hidden="true">
      <path class="tail" d="M10 36 L0 44 L16 42 Z" />
      <ellipse class="body" cx="32" cy="36" rx="22" ry="14" />
      <path class="wing" d="M16 34 Q32 20 44 34 Q30 46 16 34 Z" />
      <circle class="head" cx="52" cy="24" r="9" />
      <path class="beak" d="M60 23 L68 26 L60 28 Z" />
      <circle class="eye" cx="55" cy="22" r="1.8" />
      <path class="leg" d="M28 50 V58 M36 50 V58" />
    </svg>
  </div>
</template>

<style scoped>
.pigeon {
  position: absolute;
  left: 0;
  top: 0;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.2, 0.7, 0.3, 1);
  will-change: transform;
}

svg {
  display: block;
  overflow: visible;
}

.body,
.head,
.tail,
.wing {
  fill: #a9b2ad;
  stroke: var(--forest);
  stroke-width: 2.4;
  stroke-linejoin: round;
}

.wing {
  fill: #8d9a94;
  transform-origin: 30px 34px;
}

.head {
  fill: #7f9b92;
}

.beak {
  fill: var(--accent);
  stroke: var(--forest);
  stroke-width: 1.6;
  stroke-linejoin: round;
}

.eye {
  fill: var(--forest);
}

.leg {
  stroke: var(--accent);
  stroke-width: 2.4;
  stroke-linecap: round;
}

.phase-land .wing,
.phase-fly .wing {
  animation: flap 0.16s ease-in-out infinite alternate;
}

.phase-sit .head {
  animation: peck 1s ease-in-out infinite;
  transform-origin: 42px 34px;
}

@keyframes flap {
  to {
    transform: rotate(-38deg) scaleY(1.3);
  }
}

@keyframes peck {
  0%,
  60%,
  100% {
    transform: rotate(0);
  }
  75% {
    transform: rotate(26deg) translate(2px, 2px);
  }
}
</style>
