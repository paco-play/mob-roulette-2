<script setup lang="ts">
import { colorById } from '~/data/colors'

const game = useGame()
const { team, round, timer, settings } = game

const editingId = ref<string | null>(null)
const editing = computed(() => (editingId.value ? team.find(editingId.value) : undefined))

const driver = computed(() => round.current.value)
const waitingIds = computed(() => new Set(round.candidates.value.map((m) => m.id)))
const rotationOn = computed(() => settings.value.rotation)

const digestionOf = (id: string): number | null => (waitingIds.value.has(id) ? round.digestion.value : null)
const hasPlayed = (id: string): boolean => rotationOn.value && round.state.value.playedIds.includes(id)

const teamSummaries = computed(() =>
  team.state.value.teams.map((t) => ({ id: t.id, name: t.name, count: t.memberIds.length })),
)

const onAdd = (name: string, avatarId: string, colorId: string): void => game.addMember(name, avatarId, colorId)
</script>

<template>
  <PanelFrame tag="Équipe">
    <TurnTimerView
      :status="timer.status.value"
      :phase="timer.phase.value"
      :minutes="settings.turnMinutes"
      :break-minutes="settings.breakMinutes"
      :label="timer.label.value"
      :progress="timer.progress.value"
      :driver-name="driver?.name ?? null"
      :driver-avatar-id="driver?.avatarId ?? null"
      :driver-color="driver ? colorById(driver.colorId).fill : null"
      @start="game.startTimer"
      @skip="timer.skipBreak"
      @set-minutes="settings.turnMinutes = $event"
      @set-break="settings.breakMinutes = $event"
      @pause="timer.pause"
      @resume="timer.resume"
      @reset="timer.reset(settings.turnMinutes)"
    />

    <MemberForm @add="onAdd" />

    <div v-if="editing" class="editor">
      <AvatarPicker
        :avatar-id="editing.avatarId"
        :color-id="editing.colorId"
        :title="editing.name"
        @update:avatar-id="team.update(editing.id, { avatarId: $event })"
        @update:color-id="team.update(editing.id, { colorId: $event })"
        @close="editingId = null"
      />
    </div>

    <ul v-if="team.active.value.length" class="list">
      <MemberRow
        v-for="member in team.active.value"
        :key="member.id"
        :name="member.name"
        :avatar-id="member.avatarId"
        :color="colorById(member.colorId).fill"
        :digestion="digestionOf(member.id)"
        :played="hasPlayed(member.id)"
        :current="member.id === driver?.id"
        @edit="editingId = member.id"
        @bench="game.benchMember(member.id)"
      />
    </ul>
    <div v-else class="empty">
      <p class="scribble">Personne dans le mob…</p>
      <p class="hint">Ajoute des gens ci-dessus, recharge une équipe sauvegardée, ou essaie avec une équipe de démo.</p>
      <button class="btn-ghost" type="button" @click="team.seedDemo()">Équipe de démo</button>
    </div>

    <FoldSection title="Banc & sauvegardés" :count="team.bench.value.length" :open="team.bench.value.length > 0">
      <ul v-if="team.bench.value.length" class="list">
        <BenchRow
          v-for="member in team.bench.value"
          :key="member.id"
          :name="member.name"
          :avatar-id="member.avatarId"
          :color="colorById(member.colorId).fill"
          @restore="game.restoreMember(member.id)"
          @forget="game.forgetMember(member.id)"
        />
      </ul>
      <p v-else class="hint pad">Ceux que tu retires du jeu restent ici, prêts à revenir en un clic.</p>
    </FoldSection>

    <FoldSection title="Équipes sauvegardées" :count="teamSummaries.length">
      <SavedTeams
        :teams="teamSummaries"
        :can-save="team.active.value.length > 0"
        @save="team.saveTeam"
        @load="game.loadTeam"
        @remove="team.deleteTeam"
      />
    </FoldSection>
  </PanelFrame>
</template>

<style scoped>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.editor {
  padding: 10px 14px;
  border-bottom: 1.5px solid var(--line);
}

.empty {
  display: grid;
  justify-items: start;
  gap: 8px;
  padding: 16px 14px 18px;
  border-bottom: 1.5px solid var(--line);
}

.empty p {
  margin: 0;
}

.hint {
  font-size: 13px;
  color: var(--ink-soft);
}

.pad {
  padding: 10px 14px 14px;
}
</style>
