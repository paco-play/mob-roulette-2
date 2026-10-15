<script setup lang="ts">
import type { WheelSegment } from '~/types/team'

defineProps<{
  segments: readonly WheelSegment[]
  angle: number
  spinning: boolean
  /** 0..1, how fast the wheel is turning right now. */
  speed: number
  /** Changes on every boundary crossing; makes the pointer flap. */
  tick: number
  winnerId: string | null
  /** Changes on every result; replays the sunburst. */
  winCount: number
  disco: boolean
}>()

defineEmits<{ spin: [] }>()
</script>

<template>
  <div class="wheel" :class="{ spinning, disco, empty: !segments.length, winning: !!winnerId }">
    <SunBurst v-if="winCount" :key="winCount" />
    <span class="shadow" aria-hidden="true" />
    <span class="plate" aria-hidden="true" />

    <div class="disc-wrap" :style="{ transform: `rotate(${angle}deg)` }">
      <WheelDisc :key="segments.length" class="disc-in" :segments="segments" :winner-id="winnerId" />
    </div>
    <span class="blur" :style="{ opacity: speed * 0.55 }" aria-hidden="true" />

    <svg class="rim" viewBox="0 0 500 500" aria-hidden="true">
      <circle cx="250" cy="250" r="243" fill="none" stroke="var(--forest)" stroke-width="13" />
      <circle cx="250" cy="250" r="249" fill="none" stroke="var(--forest)" stroke-width="1.5" />
      <circle class="bulbs" cx="250" cy="250" r="243" fill="none" stroke="var(--paper-2)" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 16.4" />
    </svg>

    <div :key="tick" class="pointer" :class="{ flap: spinning }" :style="{ '--kick': `${8 + speed * 16}deg` }" aria-hidden="true">
      <svg viewBox="0 0 40 52">
        <path d="M20 50 L4 14 Q20 -4 36 14 Z" fill="var(--accent)" stroke="var(--forest)" stroke-width="3" stroke-linejoin="round" />
        <circle cx="20" cy="17" r="4.5" fill="var(--paper-2)" stroke="var(--forest)" stroke-width="2" />
      </svg>
    </div>

    <button class="hub" type="button" :disabled="spinning" :aria-label="spinning ? 'La roue tourne' : 'Lancer la roue'" @click="$emit('spin')">
      <span class="hub-label">{{ spinning ? '···' : 'GO' }}</span>
    </button>
  </div>
</template>

<style scoped>
.wheel {
  position: relative;
  width: var(--wheel, 520px);
  aspect-ratio: 1;
  animation: wheel-in 1.1s var(--ease-spring) 0.3s both;
}

/* Solid paper behind the slices, so dimmed slices fade to paper and not to the wall */
.plate {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--paper-2);
}

/* A flat offset shadow: far cheaper to paint than a filter on a rotating element */
.shadow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transform: translate(10px, 12px);
  background: rgb(38 57 44 / 0.16);
}

.disc-wrap {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  will-change: transform;
}

.disc-in {
  animation: slices-in 0.5s var(--ease-out) both;
}

/* Fake motion blur: a faint conic smear whose opacity follows the wheel speed */
.blur {
  position: absolute;
  inset: 3%;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  background: conic-gradient(from 0deg, transparent, rgb(255 255 255 / 0.55), transparent 25%, rgb(255 255 255 / 0.55) 50%, transparent 75%, rgb(255 255 255 / 0.55));
}

.rim {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.bulbs {
  transform-origin: 250px 250px;
}

.spinning .bulbs {
  animation: chase 1.4s linear infinite;
}

.winning:not(.spinning) .bulbs {
  animation: chase 4s linear infinite;
}

.pointer {
  position: absolute;
  left: 50%;
  top: -2.2%;
  width: 8%;
  transform: translateX(-50%);
  transform-origin: 50% 25%;
  pointer-events: none;
  z-index: 3;
}

.pointer svg {
  display: block;
  width: 100%;
}

.pointer.flap {
  animation: flap 0.14s ease-out;
}

.hub {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 19%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  display: grid;
  place-content: center;
  border: 3px solid var(--forest);
  border-radius: 50%;
  background: var(--accent);
  color: var(--paper-2);
  box-shadow:
    0 0 0 6px var(--paper-2),
    0 0 0 8px var(--forest);
  transition:
    transform 0.25s var(--ease-spring),
    background 0.2s;
  z-index: 4;
}

.hub:hover:not(:disabled) {
  transform: translate(-50%, -50%) scale(1.07);
}

.hub:active:not(:disabled) {
  transform: translate(-50%, -50%) scale(0.93);
}

.hub:disabled {
  background: var(--sage);
  cursor: progress;
}

.hub-label {
  font-weight: 700;
  font-size: clamp(18px, 2.4vw, 30px);
  letter-spacing: -0.02em;
  line-height: 1;
}

.hub-hint {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.8;
}

@keyframes chase {
  to {
    transform: rotate(18deg);
  }
}

@keyframes flap {
  from {
    transform: translateX(-50%) rotate(calc(var(--kick) * -1));
  }
  to {
    transform: translateX(-50%) rotate(0);
  }
}

@keyframes slices-in {
  from {
    opacity: 0;
    transform: scale(0.94);
  }
}

@keyframes wheel-in {
  from {
    opacity: 0;
    transform: scale(0.6) rotate(-40deg);
  }
}
</style>
