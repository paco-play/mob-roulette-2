<template>
  <span class="burst" aria-hidden="true" />
</template>

<style scoped>
/* Rays that flash behind the wheel when someone is picked */
.burst {
  position: absolute;
  inset: -22%;
  border-radius: 50%;
  pointer-events: none;
  background: repeating-conic-gradient(from 0deg, rgb(157 176 142 / 0.55) 0 6deg, transparent 6deg 18deg);
  -webkit-mask-image: radial-gradient(circle, transparent 38%, #000 40%, transparent 70%);
  mask-image: radial-gradient(circle, transparent 38%, #000 40%, transparent 70%);
  animation: burst 2.2s var(--ease-out) both;
}

@keyframes burst {
  0% {
    opacity: 0;
    transform: scale(0.6) rotate(0);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1.15) rotate(40deg);
  }
}
</style>
