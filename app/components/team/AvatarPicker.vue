<script setup lang="ts">
import { MEMBER_COLORS, colorById } from '~/data/colors'
import { AVATARS } from '~/data/avatars'

const props = defineProps<{ avatarId: string; colorId: string; title: string }>()

defineEmits<{ 'update:avatarId': [id: string]; 'update:colorId': [id: string]; close: [] }>()

const humans = AVATARS.filter((a) => a.kind === 'human')
const animals = AVATARS.filter((a) => a.kind === 'animal')
const currentColor = computed(() => colorById(props.colorId).fill)
</script>

<template>
  <div class="picker" role="dialog" :aria-label="title">
    <header>
      <span class="tag">{{ title }}</span>
      <button class="btn-ghost" type="button" @click="$emit('close')">Ok</button>
    </header>

    <p class="label">Humains</p>
    <div class="grid">
      <button
        v-for="avatar in humans"
        :key="avatar.id"
        type="button"
        class="cell"
        :class="{ on: avatar.id === avatarId }"
        :style="{ background: currentColor }"
        :title="avatar.label"
        @click="$emit('update:avatarId', avatar.id)"
      >
        <PixelAvatar :avatar-id="avatar.id" />
      </button>
    </div>

    <p class="label">Animaux</p>
    <div class="grid">
      <button
        v-for="avatar in animals"
        :key="avatar.id"
        type="button"
        class="cell"
        :class="{ on: avatar.id === avatarId }"
        :style="{ background: currentColor }"
        :title="avatar.label"
        @click="$emit('update:avatarId', avatar.id)"
      >
        <PixelAvatar :avatar-id="avatar.id" />
      </button>
    </div>

    <p class="label">Couleur sur la roue</p>
    <div class="colors">
      <button
        v-for="color in MEMBER_COLORS"
        :key="color.id"
        type="button"
        class="swatch"
        :class="{ on: color.id === colorId }"
        :style="{ background: color.fill }"
        :aria-label="color.label"
        :title="color.label"
        @click="$emit('update:colorId', color.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.picker {
  max-height: 340px;
  overflow-y: auto;
  padding: 12px 14px 16px;
  border: 1.5px solid var(--forest);
  background: var(--paper-2);
  box-shadow: 5px 5px 0 var(--sage);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tag,
.label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.tag {
  font-weight: 700;
}

.label {
  margin: 12px 0 6px;
  color: var(--ink-soft);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(42px, 1fr));
  gap: 6px;
}

.cell {
  aspect-ratio: 1;
  padding: 3px;
  border: 1.5px solid rgb(38 57 44 / 0.35);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.cell:hover {
  border-color: var(--forest);
}

.cell.on {
  border-color: var(--forest);
  box-shadow: 0 0 0 2px var(--accent);
}

.colors {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.swatch {
  width: 26px;
  height: 26px;
  border: 1.5px solid var(--forest);
  border-radius: 50%;
}


.swatch.on {
  box-shadow:
    0 0 0 2px var(--paper-2),
    0 0 0 4px var(--accent);
}

</style>
