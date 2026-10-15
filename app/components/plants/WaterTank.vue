<script setup lang="ts">
const props = defineProps<{ level: number; capacity: number }>()

const ratio = computed(() => clamp(props.level / props.capacity, 0, 1))
const fillHeight = computed(() => 56 * ratio.value)
</script>

<template>
  <div class="tank" :title="`Réserve d'eau : ${level}/${capacity}. Chaque tour de roue la remplit d'une goutte.`">
    <svg viewBox="0 0 80 120" aria-hidden="true">
      <path class="cap" d="M28 6 H52 V14 H28 Z" />
      <path class="jar" d="M24 14 H56 V22 Q66 26 66 38 V92 Q66 100 58 100 H22 Q14 100 14 92 V38 Q14 26 24 22 Z" />
      <clipPath id="tank-clip">
        <path d="M17 38 Q17 29 26 26 H54 Q63 29 63 38 V92 Q63 97 58 97 H22 Q17 97 17 92 Z" />
      </clipPath>
      <g clip-path="url(#tank-clip)">
        <rect class="water" x="10" :y="97 - fillHeight" width="60" :height="fillHeight + 4" />
        <path class="wave" :transform="`translate(0 ${97 - fillHeight})`" d="M10 0 q10 -5 20 0 t20 0 t20 0 t20 0" />
      </g>
      <path class="shine" d="M22 34 V60" />
    </svg>
    <span class="count">{{ level }}</span>
  </div>
</template>

<style scoped>
.tank {
  position: relative;
  width: 62px;
}

svg {
  display: block;
  width: 100%;
  overflow: visible;
}

.jar {
  fill: rgb(223 229 210 / 0.55);
  stroke: var(--forest);
  stroke-width: 3;
  stroke-linejoin: round;
}

.cap {
  fill: var(--forest);
}

.water {
  fill: #8fc0d8;
  opacity: 0.85;
  transition: y 0.8s var(--ease-out);
}

.wave {
  fill: none;
  stroke: #e9f3f6;
  stroke-width: 2;
  animation: slosh 3s ease-in-out infinite alternate;
}

@keyframes slosh {
  to {
    transform: translateX(-8px);
  }
}

.shine {
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  opacity: 0.6;
}

.count {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -20%);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 15px;
  color: var(--forest);
}
</style>
