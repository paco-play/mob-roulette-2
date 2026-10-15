<script setup lang="ts">
import type { StageAnchors } from '~/types/scene'

const props = defineProps<{ phase: string; anchors: StageAnchors }>()

const WIDTH = 110
const HEIGHT = 120

const fallX = computed(() => props.anchors.panda.x - 270)

const target = computed(() => {
  const { width } = props.anchors
  switch (props.phase) {
    case 'walk':
      return { x: fallX.value, ms: 4300 }
    case 'trip':
      return { x: fallX.value + 36, ms: 700 }
    case 'lying':
    case 'rise':
      return { x: fallX.value + 40, ms: 0 }
    case 'leave':
      return { x: width + 160, ms: 3200 }
    default:
      return { x: -170, ms: 0 }
  }
})

const style = computed(() => ({
  transform: `translate(${target.value.x - WIDTH / 2}px, ${props.anchors.floorY - HEIGHT + 6}px)`,
  transitionDuration: `${target.value.ms}ms`,
}))

const walking = computed(() => props.phase === 'walk' || props.phase === 'leave')
const cupFlying = computed(() => props.phase === 'trip' || props.phase === 'lying' || props.phase === 'rise')
const mood = computed(() => (props.phase === 'lying' ? 'sleep' : props.phase === 'trip' ? 'grumpy' : 'idle'))
</script>

<template>
  <div class="trip" :style="style">
    <div class="person" :class="[`phase-${phase}`, { walking }]">
      <RedPanda :mood="mood" variant="colleague" :style="{ width: `${WIDTH}px` }" />
      <span v-if="!cupFlying" class="mug" aria-hidden="true" />
      <span v-if="cupFlying" class="cup" aria-hidden="true" />
      <span v-if="phase === 'lying'" class="stars" aria-hidden="true">✦ ✧ ✦</span>
    </div>
  </div>
</template>

<style scoped>
.trip {
  position: absolute;
  left: 0;
  top: 0;
  transition-property: transform;
  transition-timing-function: linear;
  will-change: transform;
}

.person {
  position: relative;
  transform-origin: 50% 100%;
}

.walking {
  animation: bob 0.3s steps(1, end) infinite;
}

.phase-trip {
  animation: fall 0.7s steps(7, end) both;
}

.phase-lying {
  transform: rotate(90deg);
}

.phase-rise {
  animation: rise 0.8s steps(6, end) both;
}

/* A pixel mug in the hand, and the same mug flying when it all goes wrong */
.mug,
.cup {
  position: absolute;
  width: 14px;
  height: 14px;
  background: var(--paper-2);
  border: 3px solid var(--forest);
  box-shadow: 5px 3px 0 -2px var(--forest);
}

.mug {
  left: 90px;
  top: 74px;
}

.cup {
  left: 90px;
  top: 74px;
  animation: cup 1.2s steps(10, end) both;
}

.stars {
  position: absolute;
  left: 40px;
  top: -30px;
  font-size: 16px;
  color: var(--forest);
  animation: twinkle 0.6s steps(1, end) infinite;
}

@keyframes bob {
  50% {
    translate: 0 -3px;
  }
}

@keyframes fall {
  0% {
    transform: rotate(0);
  }
  40% {
    transform: rotate(-14deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

@keyframes rise {
  from {
    transform: rotate(90deg);
  }
  60% {
    transform: rotate(-8deg);
  }
  to {
    transform: rotate(0);
  }
}

@keyframes cup {
  0% {
    transform: translate(0, 0) rotate(0);
  }
  50% {
    transform: translate(60px, -90px) rotate(180deg);
  }
  100% {
    transform: translate(120px, 40px) rotate(360deg);
  }
}

@keyframes twinkle {
  50% {
    opacity: 0.2;
  }
}
</style>
