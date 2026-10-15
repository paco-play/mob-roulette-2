<script setup lang="ts">
export interface TeamSummary {
  id: string
  name: string
  count: number
}

defineProps<{ teams: readonly TeamSummary[]; canSave: boolean }>()
const emit = defineEmits<{ save: [name: string]; load: [id: string]; remove: [id: string] }>()

const name = ref('')

function save(): void {
  if (!name.value.trim()) return
  emit('save', name.value)
  name.value = ''
}
</script>

<template>
  <div class="teams">
    <form class="save" @submit.prevent="save">
      <input v-model="name" type="text" maxlength="24" placeholder="Nom de l’équipe…" :disabled="!canSave" aria-label="Nom de l’équipe à sauvegarder" />
      <button class="btn-ghost" type="submit" :disabled="!canSave || !name.trim()">Sauver</button>
    </form>
    <ul v-if="teams.length">
      <li v-for="team in teams" :key="team.id">
        <button class="load" type="button" @click="$emit('load', team.id)">
          <span class="team-name">{{ team.name }}</span>
          <span class="count">{{ team.count }} pers.</span>
        </button>
        <button class="del" type="button" :aria-label="`Supprimer l’équipe ${team.name}`" @click="$emit('remove', team.id)">×</button>
      </li>
    </ul>
    <p v-else class="empty">Sauvegarde ton équipe actuelle pour la recharger en un clic.</p>
  </div>
</template>

<style scoped>
.teams {
  padding: 10px 14px 14px;
  display: grid;
  gap: 10px;
}

.save {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  min-width: 0;
  height: 32px;
  padding: 0 10px;
  border: 1.5px solid var(--forest);
  background: var(--paper);
  font-size: 14px;
}

input:focus {
  outline: none;
  background: #fff;
}

ul {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  gap: 6px;
}

.load {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 10px;
  border: 1.5px solid var(--forest);
  background: var(--sage-3);
  text-align: left;
  transition:
    transform 0.2s var(--ease-spring),
    background 0.2s;
}

.load:hover {
  transform: translateX(3px);
  background: var(--sage-2);
}

.team-name {
  font-weight: 700;
  letter-spacing: -0.02em;
}

.count {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.del {
  width: 30px;
  border: 1.5px solid var(--line);
  background: none;
  font-size: 18px;
  line-height: 1;
}

.del:hover {
  background: #f3c9bd;
}

.empty {
  margin: 0;
  font-size: 13px;
  color: var(--ink-soft);
}

button:disabled {
  opacity: 0.45;
}
</style>
