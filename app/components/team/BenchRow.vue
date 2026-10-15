<script setup lang="ts">
defineProps<{ name: string; avatarId: string; color: string }>()
defineEmits<{ restore: []; forget: [] }>()
</script>

<template>
  <li class="row">
    <span class="face" :style="{ background: color }"><PixelAvatar :avatar-id="avatarId" /></span>
    <span class="name">{{ name }}</span>
    <button class="btn-ghost" type="button" @click="$emit('restore')">Rejouer</button>
    <button class="forget" type="button" :aria-label="`Oublier ${name} pour de bon`" title="Oublier pour de bon" @click="$emit('forget')">×</button>
  </li>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border-bottom: 1px dashed rgb(38 57 44 / 0.28);
}

.face {
  flex: none;
  width: 30px;
  height: 30px;
  padding: 4px;
  border: 1.5px solid var(--forest);
  border-radius: 50%;
  overflow: hidden;
  filter: saturate(0.5);
  opacity: 0.8;
}

.name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--ink-soft);
}

.forget {
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: none;
  font-size: 20px;
  line-height: 1;
  color: var(--ink-soft);
}

.forget:hover {
  color: var(--danger);
}
</style>
