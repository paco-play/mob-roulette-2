import type { Ref } from 'vue'
import type { GameSettings, RoundState, TurnRecord } from '~/types/game'
import type { Member, WheelSegment } from '~/types/team'
import { colorById } from '~/data/colors'

const HISTORY_LIMIT = 60

/** Who plays next: the rotation pool, the wheel segments and the post-lunch risk shown on each of them. */
export function useRound(active: Ref<Member[]>, settings: Ref<GameSettings>, now: Ref<number>) {
  const state = usePersisted<RoundState>('round', { playedIds: [], currentId: null, history: [] })

  const candidates = computed(() => {
    if (!settings.value.rotation) return active.value
    const waiting = active.value.filter((m) => !state.value.playedIds.includes(m.id))
    return waiting.length ? waiting : active.value
  })

  const forecast = computed(() =>
    digestionForecast({
      nowMinutes: minutesOfDay(new Date(now.value)),
      poolSize: candidates.value.length,
      turnMinutes: settings.value.turnMinutes,
      breakMinutes: settings.value.breakMinutes,
      lunch: settings.value.lunch,
    }),
  )
  const digestion = computed(() => forecast.value.chance)

  const segments = computed<WheelSegment[]>(() =>
    candidates.value.map((m) => ({
      id: m.id,
      name: m.name,
      avatarId: m.avatarId,
      color: colorById(m.colorId).fill,
      digestion: digestion.value,
    })),
  )

  const current = computed(() => active.value.find((m) => m.id === state.value.currentId) ?? null)

  /** Records the winner. Returns true when this pick completed the round. */
  function commit(memberId: string): boolean {
    const record: TurnRecord = { memberId, at: Date.now() }
    state.value.currentId = memberId
    state.value.history = [record, ...state.value.history].slice(0, HISTORY_LIMIT)
    if (!settings.value.rotation) return false
    const played = new Set([...state.value.playedIds, memberId])
    const everyone = active.value.every((m) => played.has(m.id))
    state.value.playedIds = everyone ? [] : [...played]
    return everyone
  }

  /** Drops ids of members that no longer exist. */
  function prune(validIds: ReadonlySet<string>): void {
    state.value.playedIds = state.value.playedIds.filter((id) => validIds.has(id))
    if (state.value.currentId && !validIds.has(state.value.currentId)) state.value.currentId = null
  }

  return { state, candidates, segments, current, digestion, forecast, commit, prune }
}
