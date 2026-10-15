<script setup lang="ts">
const props = defineProps<{ now: number; lunch: string }>()

const CENTER = 60
const DIAL_RADIUS = 52

const date = computed(() => new Date(props.now))
const minuteAngle = computed(() => date.value.getMinutes() * 6 + date.value.getSeconds() * 0.1)
const hourAngle = computed(() => (date.value.getHours() % 12) * 30 + date.value.getMinutes() * 0.5)

/** Lunch is drawn as an arc, and the sleepy moment as a dot on the dial. */
const toAngle = (minutes: number): number => ((minutes % 720) / 720) * 360
const arcRadius = DIAL_RADIUS - 6
const slump = computed(() => {
  const lunchAt = parseClock(props.lunch)
  const a = polar(CENTER, CENTER, arcRadius, toAngle(lunchAt))
  const b = polar(CENTER, CENTER, arcRadius, toAngle(lunchAt + LUNCH_MINUTES))
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${arcRadius} ${arcRadius} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
})
const peak = computed(() => polar(CENTER, CENTER, arcRadius, toAngle(parseClock(props.lunch) + DIGESTION_AFTER_LUNCH)))

const ticks = Array.from({ length: 12 }, (_, i) => ({
  a: polar(CENTER, CENTER, DIAL_RADIUS - 2, i * 30),
  b: polar(CENTER, CENTER, DIAL_RADIUS - (i % 3 === 0 ? 10 : 6), i * 30),
}))
</script>

<template>
  <svg class="clock" viewBox="0 0 120 120" role="img" aria-label="Horloge murale : le déjeuner en arc, la digestion en point orange">
    <circle cx="60" cy="60" r="56" class="face" />
    <path :d="slump" class="slump" />
    <circle :cx="peak.x" :cy="peak.y" r="4.2" class="peak" />
    <line v-for="(tick, i) in ticks" :key="i" :x1="tick.a.x" :y1="tick.a.y" :x2="tick.b.x" :y2="tick.b.y" class="tick" />
    <line x1="60" y1="60" x2="60" y2="34" class="hand hour" :transform="`rotate(${hourAngle} 60 60)`" />
    <line x1="60" y1="60" x2="60" y2="20" class="hand minute" :transform="`rotate(${minuteAngle} 60 60)`" />
    <circle cx="60" cy="60" r="4" class="pin" />
  </svg>
</template>

<style scoped>
.clock {
  display: block;
  width: 100%;
}

.face {
  fill: var(--paper-2);
  stroke: var(--forest);
  stroke-width: 4;
}

.slump {
  fill: none;
  stroke: var(--sage);
  stroke-width: 5;
  stroke-linecap: round;
}

.peak {
  fill: var(--accent);
  stroke: var(--forest);
  stroke-width: 1.6;
}

.tick {
  stroke: var(--forest);
  stroke-width: 2;
  stroke-linecap: round;
}

.hand {
  stroke: var(--forest);
  stroke-linecap: round;
}

.hour {
  stroke-width: 4.5;
}

.minute {
  stroke-width: 3;
}

.pin {
  fill: var(--accent);
  stroke: var(--forest);
  stroke-width: 2;
}
</style>
