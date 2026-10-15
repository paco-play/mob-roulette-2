<script setup lang="ts">
const props = defineProps<{ chance: number | null }>()

const level = computed(() => warningLevel(props.chance))
const percent = computed(() => Math.round((props.chance ?? 0) * 100))
</script>

<template>
  <span v-if="level" class="badge" :class="`level-${level}`" :title="`${percent} % de chances de passer pendant la digestion`">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2.2 L18.4 17 H1.6 Z" stroke-linejoin="round" />
      <path class="mark" d="M10 7.6 V12.2 M10 14.2 V14.4" />
    </svg>
    <span class="pct">{{ percent }}%</span>
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: var(--warn);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  transform-origin: 50% 60%;
}

svg {
  width: 17px;
  height: 17px;
  fill: #f6dba0;
  stroke: currentColor;
  stroke-width: 1.7;
}

.mark {
  fill: none;
  stroke: var(--forest);
  stroke-width: 2;
  stroke-linecap: round;
}

.level-1 {
  opacity: 0.8;
}

.level-2 {
  animation: pulse 2.6s ease-in-out infinite;
}

.level-3 {
  color: var(--danger);
  animation: pulse 1.1s ease-in-out infinite;
}

.level-3 svg {
  fill: #f4b9a6;
}

@keyframes pulse {
  50% {
    transform: scale(1.14);
  }
}
</style>
