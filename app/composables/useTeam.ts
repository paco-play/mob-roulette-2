import type { Member, SavedTeam } from '~/types/team'
import { AVATARS } from '~/data/avatars'
import { MEMBER_COLORS } from '~/data/colors'

interface TeamState {
  members: Member[]
  teams: SavedTeam[]
}

const DEMO_NAMES = ['Léa', 'Marc', 'Aya', 'Tom', 'Yuki']

/** The roster: who is in the game, who waits on the bench, and the named line-ups saved for later. */
export function useTeam() {
  const state = usePersisted<TeamState>('team', { members: [], teams: [] })

  const active = computed(() => state.value.members.filter((m) => m.active))
  const bench = computed(() => state.value.members.filter((m) => !m.active))

  function unusedPick<T extends { id: string }>(pool: readonly T[], usedIds: ReadonlySet<string>): T {
    const free = pool.filter((item) => !usedIds.has(item.id))
    return pick(free.length ? free : pool)
  }

  function add(name: string, avatarId?: string, colorId?: string): Member | null {
    const clean = name.trim().slice(0, 18)
    if (!clean) return null
    const member: Member = {
      id: uid(),
      name: clean,
      avatarId: avatarId ?? unusedPick(AVATARS, new Set(state.value.members.map((m) => m.avatarId))).id,
      colorId: colorId ?? unusedPick(MEMBER_COLORS, new Set(active.value.map((m) => m.colorId))).id,
      active: true,
    }
    state.value.members.push(member)
    return member
  }

  const find = (id: string): Member | undefined => state.value.members.find((m) => m.id === id)

  function update(id: string, patch: Partial<Pick<Member, 'name' | 'avatarId' | 'colorId'>>): void {
    const member = find(id)
    if (member) Object.assign(member, patch)
  }

  function setActive(id: string, value: boolean): void {
    const member = find(id)
    if (member) member.active = value
  }

  /** Forgets a member for good, including inside saved teams. */
  function forget(id: string): void {
    state.value.members = state.value.members.filter((m) => m.id !== id)
    state.value.teams.forEach((team) => (team.memberIds = team.memberIds.filter((m) => m !== id)))
  }

  function saveTeam(name: string): void {
    const clean = name.trim().slice(0, 24)
    if (!clean || !active.value.length) return
    const memberIds = active.value.map((m) => m.id)
    const existing = state.value.teams.find((t) => t.name.toLowerCase() === clean.toLowerCase())
    if (existing) existing.memberIds = memberIds
    else state.value.teams.push({ id: uid(), name: clean, memberIds })
  }

  /** Puts exactly this team's members in the game and the rest on the bench. */
  function loadTeam(id: string): void {
    const team = state.value.teams.find((t) => t.id === id)
    if (!team) return
    state.value.members.forEach((m) => (m.active = team.memberIds.includes(m.id)))
  }

  const deleteTeam = (id: string): void => {
    state.value.teams = state.value.teams.filter((t) => t.id !== id)
  }

  function seedDemo(): void {
    DEMO_NAMES.forEach((name) => add(name))
  }

  return { state, active, bench, add, update, setActive, forget, find, saveTeam, loadTeam, deleteTeam, seedDemo }
}
