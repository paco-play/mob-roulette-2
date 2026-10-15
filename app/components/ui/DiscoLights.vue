<script setup lang="ts">
defineProps<{ active: boolean }>()
</script>

<template>
  <Transition name="fade">
    <div v-if="active" class="disco" aria-hidden="true" />
  </Transition>
</template>

<style scoped>
/* Opacity and rotation only, so it stays on the compositor */
.disco {
  position: fixed;
  inset: -30%;
  z-index: 60;
  pointer-events: none;
  background: conic-gradient(from 0deg at 50% 50%, #ff5f7e55, #ffd25f55, #6bff9e55, #5fd8ff55, #b05fff55, #ff5f7e55);
  animation: spin-colors 5s linear infinite;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin-colors {
  to {
    transform: rotate(360deg);
  }
}
</style>
