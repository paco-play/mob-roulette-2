<script setup lang="ts">
defineEmits<{ click: [] }>()
</script>

<template>
  <button class="logo" type="button" aria-label="Mob Roulette" @click="$emit('click')">
    <svg class="glyph" viewBox="0 0 48 48" aria-hidden="true">
      <g class="spinner">
        <circle cx="24" cy="26" r="19" fill="var(--paper-2)" stroke="var(--forest)" stroke-width="2.5" />
        <path d="M24 26 L24 7 A19 19 0 0 1 40.45 16.5 Z" fill="var(--forest)" />
        <path d="M24 26 L40.45 35.5 A19 19 0 0 1 24 45 Z" fill="var(--forest)" />
        <path d="M24 26 L7.55 35.5 A19 19 0 0 1 7.55 16.5 Z" fill="var(--forest)" />
        <path d="M24 26 L40.45 16.5 L40.45 35.5 Z" fill="var(--sage)" />
        <path d="M24 26 L24 45 L7.55 35.5 Z" fill="var(--sage)" />
        <path d="M24 26 L7.55 16.5 L24 7 Z" fill="var(--sage)" />
        <circle cx="24" cy="26" r="5" fill="var(--accent)" stroke="var(--forest)" stroke-width="2" />
      </g>
      <path d="M20 3 L28 3 L24 11 Z" fill="var(--accent)" stroke="var(--forest)" stroke-width="2" stroke-linejoin="round" />
    </svg>
    <span class="word">mob<span class="dot">·</span>roulette<sup>v2</sup></span>
  </button>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--forest);
  animation: rise 0.9s var(--ease-out) both;
}

.glyph {
  width: 46px;
  height: 46px;
  overflow: visible;
}

.spinner {
  transform-origin: 24px 26px;
  transition: transform 0.9s var(--ease-out);
}

.logo:hover .spinner {
  transform: rotate(220deg);
}

.logo:active .spinner {
  transform: rotate(-40deg);
  transition-duration: 0.15s;
}

.word {
  font-weight: 700;
  font-size: 30px;
  letter-spacing: -0.045em;
  line-height: 1;
}

.dot {
  color: var(--accent);
  margin: 0 1px;
}

sup {
  margin-left: 3px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}
</style>
