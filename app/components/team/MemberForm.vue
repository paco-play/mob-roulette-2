<script setup lang="ts">
import { AVATARS } from '~/data/avatars'
import { MEMBER_COLORS, colorById } from '~/data/colors'

const emit = defineEmits<{ add: [name: string, avatarId: string, colorId: string] }>()

const name = ref('')
const avatarId = ref(pick(AVATARS).id)
const colorId = ref(pick(MEMBER_COLORS).id)
const picking = ref(false)

function submit(): void {
  if (!name.value.trim()) return
  emit('add', name.value, avatarId.value, colorId.value)
  name.value = ''
  avatarId.value = pick(AVATARS).id
  colorId.value = pick(MEMBER_COLORS).id
  picking.value = false
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <div class="line">
      <button class="chip" type="button" :style="{ background: colorById(colorId).fill }" title="Choisir l’avatar et la couleur" @click="picking = !picking">
        <PixelAvatar :avatar-id="avatarId" />
      </button>
      <input v-model="name" class="input" type="text" maxlength="18" placeholder="Ajouter quelqu’un…" autocomplete="off" aria-label="Nom du nouveau membre" />
      <button class="btn-solid" type="submit" :disabled="!name.trim()">+</button>
    </div>
    <AvatarPicker
      v-if="picking"
      v-model:avatar-id="avatarId"
      v-model:color-id="colorId"
      title="Nouvel arrivant"
      @close="picking = false"
    />
  </form>
</template>

<style scoped>
.form {
  padding: 12px 14px;
  border-bottom: 1.5px solid var(--line);
  display: grid;
  gap: 10px;
}

.line {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chip {
  flex: none;
  width: 42px;
  height: 42px;
  padding: 6px;
  border: 1.5px solid var(--forest);
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s var(--ease-spring);
}

.chip:hover {
  transform: rotate(10deg) scale(1.08);
}

.input {
  flex: 1;
  min-width: 0;
  height: 42px;
  padding: 0 12px;
  border: 1.5px solid var(--forest);
  background: var(--paper);
  font-size: 15px;
}

.input::placeholder {
  color: var(--ink-soft);
}

.input:focus {
  outline: none;
  background: #fff;
  box-shadow: 3px 3px 0 var(--sage);
}

.btn-solid {
  width: 42px;
  height: 42px;
  padding: 0;
  font-size: 20px;
}

.btn-solid:disabled {
  opacity: 0.4;
  box-shadow: none;
}
</style>
