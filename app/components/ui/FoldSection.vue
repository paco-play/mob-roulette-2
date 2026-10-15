<script setup lang="ts">
defineProps<{ title: string; count?: number; open?: boolean }>()
</script>

<template>
  <details class="fold" :open="open">
    <summary>
      <span class="title">{{ title }}</span>
      <span v-if="count !== undefined" class="count">{{ count }}</span>
      <span class="chevron" aria-hidden="true" />
    </summary>
    <div class="content">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.fold {
  border-bottom: 1.5px solid var(--line);
}

summary {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  list-style: none;
  user-select: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary:hover {
  background: var(--stripes), var(--sage-3);
}

.title {
  flex: 1;
}

.count {
  min-width: 20px;
  padding: 1px 6px;
  background: var(--forest);
  color: var(--paper-2);
  text-align: center;
}

.chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--forest);
  border-bottom: 2px solid var(--forest);
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.3s var(--ease-spring);
}

details[open] .chevron {
  transform: rotate(225deg);
}
</style>
