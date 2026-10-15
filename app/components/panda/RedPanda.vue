<script setup lang="ts">
import { pandaParts, type PandaPartId, type PandaVariant } from '~/data/pandaSprite'
import type { PandaMood } from '~/types/scene'

const props = withDefaults(defineProps<{ mood: PandaMood; variant?: PandaVariant }>(), { variant: 'main' })
defineEmits<{ poke: [] }>()

const root = ref<HTMLElement | null>(null)
const { watchPointer } = usePandaGaze()
onMounted(() => props.variant === 'main' && watchPointer(root))

const parts = computed(() => Object.fromEntries(pandaParts(props.variant).map((part) => [part.id, part.paths])) as Record<PandaPartId, ReturnType<typeof pandaParts>[number]['paths']>)
</script>

<template>
  <button ref="root" class="panda" :class="[`mood-${mood}`, `variant-${variant}`]" type="button" tabindex="-1" aria-label="Le panda roux" @click="$emit('poke')">
    <svg viewBox="0 0 38 42" shape-rendering="crispEdges" aria-hidden="true">
      <ellipse class="shadow" cx="19" cy="40.6" rx="13" ry="1.4" />

      <g class="tail"><path v-for="p in parts.tail" :key="p.color" :d="p.d" :fill="p.color" /></g>
      <g class="legs"><path v-for="p in parts.legs" :key="p.color" :d="p.d" :fill="p.color" /></g>

      <g class="torso">
        <g><path v-for="p in parts.body" :key="p.color" :d="p.d" :fill="p.color" /></g>
        <g><path v-for="p in parts.shirt" :key="p.color" :d="p.d" :fill="p.color" /></g>
        <g class="arm arm-l"><path v-for="p in parts.armL" :key="p.color" :d="p.d" :fill="p.color" /></g>
        <g class="arm arm-r"><path v-for="p in parts.armR" :key="p.color" :d="p.d" :fill="p.color" /></g>
      </g>

      <g class="head">
        <g><path v-for="p in parts.ears" :key="p.color" :d="p.d" :fill="p.color" /></g>
        <g><path v-for="p in parts.head" :key="p.color" :d="p.d" :fill="p.color" /></g>
        <g class="face">
          <g class="eyes eyes-open"><path v-for="p in parts.eyesOpen" :key="p.color" :d="p.d" :fill="p.color" /></g>
          <g class="eyes eyes-closed"><path v-for="p in parts.eyesClosed" :key="p.color" :d="p.d" :fill="p.color" /></g>
          <g class="eyes eyes-happy"><path v-for="p in parts.eyesHappy" :key="p.color" :d="p.d" :fill="p.color" /></g>
          <g class="brows"><path v-for="p in parts.brows" :key="p.color" :d="p.d" :fill="p.color" /></g>
          <g class="mouth mouth-closed"><path v-for="p in parts.mouthClosed" :key="p.color" :d="p.d" :fill="p.color" /></g>
          <g class="mouth mouth-open"><path v-for="p in parts.mouthOpen" :key="p.color" :d="p.d" :fill="p.color" /></g>
        </g>
      </g>

      <g class="zzz z1"><path d="M0 0h4v1h-4z M2 1h1v1h-1z M1 2h1v1h-1z M0 3h4v1h-4z" /></g>
      <g class="zzz z2"><path d="M0 0h5v1h-5z M3 1h1v1h-1z M2 2h1v1h-1z M1 3h1v1h-1z M0 4h5v1h-5z" /></g>
    </svg>
  </button>
</template>

<style scoped>
/*
 * Pixel animation rules: nothing rotates or scales (that would smear the pixels).
 * Everything moves by whole pixels, on a stepped timer, like frames of a sprite sheet.
 */
.panda {
  --lx: 0;
  --ly: 0;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  -webkit-tap-highlight-color: transparent;
}

svg {
  display: block;
  width: 100%;
  overflow: visible;
}

.shadow {
  fill: rgb(38 57 44 / 0.2);
}

.zzz {
  opacity: 0;
  fill: var(--forest);
}

.z1 {
  transform: translate(26px, 7px);
}

.z2 {
  transform: translate(30px, 1px);
}

/* Face layers: only the ones the mood asks for are visible */
.eyes-closed,
.eyes-happy,
.brows,
.mouth-open {
  opacity: 0;
}

.face {
  transform: translate(calc(var(--lx) * 1px), calc(var(--ly) * 1px));
}

/* Idle */
.torso {
  animation: breathe 2.4s steps(1, end) infinite;
}

.head {
  animation: breathe 2.4s steps(1, end) infinite;
}

.tail {
  animation: tail 1.2s steps(1, end) infinite;
}

.variant-main:not(.mood-sleep) .eyes-open {
  animation: blink-open 5s steps(1, end) infinite;
}

.variant-main:not(.mood-sleep) .eyes-closed {
  animation: blink-closed 5s steps(1, end) infinite;
}

/* Talking: two mouth frames */
.mood-talk .mouth-closed,
.mood-dance .mouth-closed {
  animation: frame-b 0.32s steps(1, end) infinite;
}

.mood-talk .mouth-open,
.mood-dance .mouth-open {
  animation: frame-a 0.32s steps(1, end) infinite;
}

/* Pushing the wheel with the left arm */
.arm-l,
.arm-r {
  transition: transform 0.12s steps(2, end);
}

.mood-push .arm-l {
  transform: translate(-4px, -5px);
}

.mood-push .head {
  animation: none;
  transform: translateX(-1px);
}

/* Grumpy: brows and a tiny shake */
.mood-grumpy .brows {
  opacity: 1;
}

.mood-grumpy .head {
  animation: shake 0.2s steps(1, end) infinite;
}

/* Proud: happy eyes, arms up */
.mood-proud .eyes-open,
.mood-dance .eyes-open {
  animation: none;
  opacity: 0;
}

.mood-proud .eyes-happy,
.mood-dance .eyes-happy {
  opacity: 1;
}

.mood-proud .arm-l,
.mood-proud .arm-r {
  transform: translateY(-5px);
}

/* Dance: bounce and alternating arms */
.mood-dance .torso,
.mood-dance .head {
  animation: bounce 0.4s steps(1, end) infinite;
}

.mood-dance .arm-l {
  animation: arm-up 0.4s steps(1, end) infinite;
}

.mood-dance .arm-r {
  animation: arm-up 0.4s steps(1, end) infinite reverse;
}

.mood-dance .tail {
  animation-duration: 0.4s;
}

/* Sleep */
.mood-sleep .eyes-open {
  animation: none;
  opacity: 0;
}

.mood-sleep .eyes-closed {
  animation: none;
  opacity: 1;
}

.mood-sleep .head {
  animation: none;
  transform: translateY(2px);
}

.mood-sleep .z1 {
  animation: zzz 3s steps(6, end) infinite;
}

.mood-sleep .z2 {
  animation: zzz 3s steps(6, end) 1.2s infinite;
}

@keyframes breathe {
  50% {
    transform: translateY(1px);
  }
}

@keyframes tail {
  50% {
    transform: translate(1px, -1px);
  }
}

@keyframes blink-open {
  0%,
  94% {
    opacity: 1;
  }
  96%,
  100% {
    opacity: 0;
  }
}

@keyframes blink-closed {
  0%,
  94% {
    opacity: 0;
  }
  96%,
  100% {
    opacity: 1;
  }
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

@keyframes shake {
  50% {
    transform: translateX(1px);
  }
}

@keyframes bounce {
  50% {
    transform: translateY(-2px);
  }
}

@keyframes arm-up {
  50% {
    transform: translateY(-9px);
  }
}

@keyframes zzz {
  0% {
    opacity: 0;
    translate: 0 3px;
  }
  30%,
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    translate: 3px -4px;
  }
}
</style>
