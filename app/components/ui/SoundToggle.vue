<script setup lang="ts">
defineProps<{ on: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <button class="sound" type="button" :aria-pressed="on" :title="on ? 'Couper les bruitages' : 'Activer les bruitages'" @click="$emit('toggle')">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path class="cone" d="M3 8 H6 L11 4 V16 L6 12 H3 Z" />
      <path v-if="on" class="wave" d="M14 7 Q17 10 14 13 M16.5 4.5 Q21 10 16.5 15.5" />
      <path v-else class="wave" d="M14 7 L19 13 M19 7 L14 13" />
    </svg>
    <span>{{ on ? 'sons' : 'muet' }}</span>
  </button>
</template>

<style scoped>
.sound {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border: 1.5px solid var(--forest);
  background: transparent;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.sound:hover {
  background: var(--sage-3);
}

svg {
  width: 16px;
  height: 16px;
}

.cone {
  fill: var(--forest);
}

.wave {
  fill: none;
  stroke: var(--forest);
  stroke-width: 1.8;
  stroke-linecap: round;
}
</style>
