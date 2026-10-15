<script setup lang="ts">
defineProps<{
  name: string
  avatarId: string
  color: string
  /** Post-lunch risk, only for people still waiting in the rotation. */
  digestion: number | null
  played: boolean
  current: boolean
}>()

defineEmits<{ edit: []; bench: [] }>()
</script>

<template>
  <li class="row" :class="{ played, current }">
    <button class="face" type="button" :style="{ background: color }" title="Changer d’avatar ou de couleur" @click="$emit('edit')">
      <PixelAvatar :avatar-id="avatarId" />
    </button>
    <span class="name">{{ name }}</span>
    <DigestionBadge :chance="played ? null : digestion" />
    <span v-if="current" class="tag keyboard">en cours</span>
    <span v-else-if="played" class="tag">passé</span>
    <button class="out" type="button" :aria-label="`Mettre ${name} sur le banc`" title="Mettre sur le banc (il reste sauvegardé)" @click="$emit('bench')">
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4 L12 12 M12 4 L4 12" /></svg>
    </button>
  </li>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 14px;
  border-bottom: 1px dashed rgb(38 57 44 / 0.28);
}

.face {
  flex: none;
  width: 36px;
  height: 36px;
  padding: 5px;
  border: 1.5px solid var(--forest);
  border-radius: 50%;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.face:hover {
  box-shadow: 0 0 0 2px var(--accent);
}

.name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.02em;
}

.tag {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.keyboard {
  padding: 2px 6px;
  background: var(--forest);
  color: var(--paper-2);
}

.played .name,
.played .face {
  opacity: 0.5;
}

.current {
  background: var(--stripes), var(--sage-3);
}

.out {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1.5px solid transparent;
  background: none;
  opacity: 0.5;
  transition:
    opacity 0.2s,
    border-color 0.2s;
}

.row:hover .out,
.out:focus-visible {
  opacity: 1;
  border-color: var(--line);
}

.out svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--forest);
  stroke-width: 1.8;
  stroke-linecap: round;
}

</style>
