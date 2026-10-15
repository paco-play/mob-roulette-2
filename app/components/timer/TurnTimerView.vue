<script setup lang="ts">
import type { TimerPhase, TimerStatus } from '~/types/game'

const props = defineProps<{
  status: TimerStatus
  phase: TimerPhase
  label: string
  /** 0..1 elapsed */
  progress: number
  driverName: string | null
  driverAvatarId: string | null
  driverColor: string | null
  minutes: number
  breakMinutes: number
}>()

defineEmits<{ start: []; pause: []; resume: []; reset: []; skip: []; setMinutes: [value: number]; setBreak: [value: number] }>()

const FOCUS_OPTIONS = [20, 25, 30]
const BREAK_OPTIONS = [5, 10]

const RING_RADIUS = 34
const circumference = 2 * Math.PI * RING_RADIUS
const dashOffset = computed(() => circumference * props.progress)

const onBreak = computed(() => props.phase === 'break' && props.status !== 'idle')
const role = computed(() => {
  if (onBreak.value) return props.status === 'done' ? 'Pause terminée' : 'Pause'
  return props.driverName ? 'Au clavier' : 'Personne au clavier'
})
const idle = computed(() => props.status === 'idle' || props.status === 'done')
</script>

<template>
  <div class="wrap">
    <div class="timer" :class="[`is-${status}`, { empty: !driverName, 'on-break': onBreak }]">
      <div class="ring">
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" :r="RING_RADIUS" class="track" />
          <circle cx="40" cy="40" :r="RING_RADIUS" class="progress" :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" />
        </svg>
        <div class="face" :style="{ background: driverColor ?? 'var(--sage-3)' }">
          <PixelAvatar v-if="driverAvatarId" :avatar-id="driverAvatarId" />
          <span v-else class="q">?</span>
        </div>
      </div>
      <div class="info">
        <p class="role">{{ role }}</p>
        <p class="name">{{ driverName ?? 'Lance la roue' }}</p>
        <div class="clock-row">
          <p class="clock">{{ label }}</p>
          <button v-if="onBreak && (status === 'running' || status === 'paused')" class="link" type="button" @click="$emit('skip')">passer la pause</button>
          <button v-else-if="driverName && (status === 'running' || status === 'paused')" class="link" type="button" @click="$emit('reset')">reset</button>
        </div>
      </div>
      <div class="action">
        <button v-if="driverName && idle" class="btn-go" type="button" @click="$emit('start')">
          <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1 L9 5 L2 9 Z" /></svg>
          <span>{{ status === 'idle' ? 'Démarrer' : 'Relancer' }}</span>
        </button>
        <button v-else-if="status === 'running'" class="btn-go" type="button" @click="$emit('pause')">
          <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1 H4 V9 H2 Z M6 1 H8 V9 H6 Z" /></svg>
          <span>Pause</span>
        </button>
        <button v-else-if="status === 'paused'" class="btn-go" type="button" @click="$emit('resume')">
          <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1 L9 5 L2 9 Z" /></svg>
          <span>Reprendre</span>
        </button>
      </div>
    </div>

    <div class="chips">
      <span class="chips-label">Tour</span>
      <button v-for="m in FOCUS_OPTIONS" :key="m" class="chip" :class="{ on: m === minutes }" type="button" @click="$emit('setMinutes', m)">{{ m }}</button>
      <span class="chips-label gap">Pause</span>
      <button v-for="m in BREAK_OPTIONS" :key="m" class="chip" :class="{ on: m === breakMinutes }" type="button" @click="$emit('setBreak', m)">{{ m }}</button>
      <span class="unit">min</span>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  border-bottom: 1.5px solid var(--line);
}

.timer {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 4px 14px;
  align-items: center;
  padding: 14px 16px 12px;
}

.ring {
  position: relative;
  width: 78px;
  height: 78px;
}

/* Only the progress ring turns; the avatar svg inside .face must stay upright */
.ring > svg {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}

.track {
  fill: none;
  stroke: var(--sage-2);
  stroke-width: 5;
}

.progress {
  fill: none;
  stroke: var(--forest);
  stroke-width: 5;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s linear;
}

.on-break .progress {
  stroke: var(--sage);
}

.face {
  position: absolute;
  inset: 11px;
  overflow: hidden;
  border: 1.5px solid var(--forest);
  border-radius: 50%;
  padding: 7px;
  display: grid;
  place-items: center;
}

.q {
  font-weight: 700;
  font-size: 26px;
  color: var(--forest-3);
}

.info {
  min-width: 0;
}

p {
  margin: 0;
}

.role {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.on-break .role {
  color: var(--forest-3);
}

.name {
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--forest);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.clock {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.action {
  align-self: center;
}

.clock-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.link {
  padding: 0;
  border: 0;
  background: none;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.link:hover {
  color: var(--forest);
}

/* The main action: solid forest, an offset shadow, and a light sweep on hover */
.btn-go {
  position: relative;
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  overflow: hidden;
  padding: 6px 12px 6px 10px;
  border: 1.5px solid var(--forest);
  background: var(--forest);
  color: var(--paper-2);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 var(--sage);
  transition:
    transform 0.25s var(--ease-spring),
    box-shadow 0.25s var(--ease-spring),
    background 0.2s;
}

.btn-go svg {
  width: 10px;
  height: 10px;
  fill: currentColor;
  transition: transform 0.3s var(--ease-spring);
}

.btn-go::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgb(255 255 255 / 0.28) 50%, transparent 70%);
  transform: translateX(-120%);
}

.btn-go:hover {
  background: var(--forest-3);
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--sage);
}

.btn-go:hover svg {
  transform: translateX(2px) scale(1.15);
}

.btn-go:hover::after {
  transform: translateX(120%);
  transition: transform 0.7s var(--ease-out);
}

.btn-go:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--sage);
  transition-duration: 0.08s;
}

.btn-go:focus-visible {
  outline: 2px dashed var(--accent);
  outline-offset: 3px;
}

.chips {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px 12px;
}

.chips-label,
.unit {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.gap {
  margin-left: 10px;
}

.chip {
  min-width: 32px;
  padding: 3px 7px;
  border: 1.5px solid var(--forest);
  background: transparent;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  transition: background 0.15s;
}

.chip:hover {
  background: var(--sage-3);
}

.chip.on {
  background: var(--forest);
  color: var(--paper-2);
}
</style>
