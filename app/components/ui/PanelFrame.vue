<script setup lang="ts">
defineProps<{ tag: string; note?: string }>()
</script>

<template>
  <section class="panel">
    <p v-if="note" class="scribble note">{{ note }}</p>
    <header class="head">
      <span class="tag">{{ tag }}</span>
      <span class="dots" />
      <slot name="actions" />
    </header>
    <div class="body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.panel {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1.5px solid var(--line);
  animation: panel-in 1s var(--ease-out) both;
}

/* Hatched offset shadow, like an engraving */
.panel::before {
  content: '';
  position: absolute;
  inset: 0;
  transform: translate(9px, 9px);
  background: var(--stripes);
  border: 1.5px solid var(--line);
  z-index: -1;
  pointer-events: none;
}

.head,
.body {
  background: var(--paper-2);
}

.head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 16px;
  border-bottom: 1.5px solid var(--line);
}

.tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.dots {
  flex: 1;
  height: 8px;
  background: var(--dots);
  opacity: 0.8;
}

.body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--forest) transparent;
  scrollbar-gutter: stable;
}

.note {
  position: absolute;
  top: -27px;
  left: 14px;
  margin: 0;
  font-size: 15px;
  transform: rotate(-2deg);
  white-space: nowrap;
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(40px) rotate(0.6deg);
  }
}
</style>
