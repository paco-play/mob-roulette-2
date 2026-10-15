<script setup lang="ts">
/** Drafting-table pointer readout. It owns its listener and writes text directly: no reactive state, no renders. */
const xEl = ref<HTMLElement | null>(null)
const yEl = ref<HTMLElement | null>(null)
let frame = 0
let x = 0
let y = 0

const paint = (): void => {
  frame = 0
  if (xEl.value) xEl.value.textContent = x.toFixed(2)
  if (yEl.value) yEl.value.textContent = y.toFixed(2)
}
const onMove = (event: PointerEvent): void => {
  x = event.clientX
  y = event.clientY
  if (!frame) frame = requestAnimationFrame(paint)
}

onMounted(() => window.addEventListener('pointermove', onMove, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <p class="coords" aria-hidden="true">
    <span>X <span ref="xEl">0.00</span></span>
    <span>Y <span ref="yEl">0.00</span></span>
  </p>
</template>

<style scoped>
.coords {
  display: flex;
  flex-direction: column;
  min-width: 92px;
  margin: 0;
  font-family: var(--font-hand);
  font-size: 12px;
  line-height: 1.15;
  color: var(--forest);
  font-variant-numeric: tabular-nums;
}
</style>
