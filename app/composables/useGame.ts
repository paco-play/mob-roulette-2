import type { InjectionKey } from 'vue'
import type { Banner } from '~/components/wheel/WinnerBanner.vue'
import { colorById } from '~/data/colors'
import type { PlantView, StageAnchors } from '~/types/scene'

const SPIN_MS = 5800
const DISCO_MS = 14_000
const POKE_RESET_MS = 8000
const SPRINKLER_EVERY_MS = 20_000

/**
 * The brain. It wires every feature composable together and exposes plain state and actions;
 * the components are dumb and only render what they are given.
 */
function createGame() {
  const now = useNow()
  const settings = useSettings()
  const team = useTeam()
  const round = useRound(team.active, settings, now)
  const sfx = useSfx(computed(() => settings.value.sound))
  const panda = usePanda()
  const wheel = useWheel()
  const garden = useGarden()
  const confetti = useConfetti()
  const disco = ref(false)
  /** The phone layout has no floor, so scripted gags stay off. */
  const mobile = ref(false)
  const anchors = ref<StageAnchors | null>(null)
  let pokeTimer: ReturnType<typeof setTimeout> | undefined
  let sprinklerTimer: ReturnType<typeof setInterval> | undefined

  const timer = useTurnTimer({
    onFocusDone: (hasBreak) => {
      sfx.play('chime')
      panda.say(hasBreak ? 'breakStart' : 'timerDone')
    },
    onBreakDone: () => {
      sfx.play('chimeSoft')
      panda.say('breakDone')
    },
  })

  const events = useStageEvents({
    anchors: () => anchors.value,
    wheel,
    panda,
    sfx,
    canRun: () => !mobile.value && !wheel.spinning.value && !panda.speech.value && !disco.value,
  })

  const life = useIdleLife({ panda, canTalk: () => !wheel.spinning.value && !events.busy.value })

  // The wheel keeps showing the winner's slice for a moment after the result, instead of re-slicing under the pointer.
  const shownSegments = ref(round.segments.value)
  let holdSegments = false
  /** Who just won; the wheel highlights them until the slice is released. */
  const winnerId = ref<string | null>(null)
  const winCount = ref(0)
  const banner = ref<Banner | null>(null)
  watch(round.segments, (next) => {
    if (!holdSegments) shownSegments.value = next
  })
  function releaseSegments(afterMs: number): void {
    setTimeout(() => {
      holdSegments = false
      winnerId.value = null
      shownSegments.value = round.segments.value
    }, afterMs)
  }

  const hasTeam = computed(() => team.active.value.length > 0)

  const plantViews = computed<PlantView[]>(() =>
    garden.garden.value.plants.map((plant) => ({
      id: plant.id,
      kind: plant.kind,
      growth: garden.growthRatio(plant),
      water: plant.water,
      thirsty: garden.isThirsty(plant),
      splash: garden.splashes.value[plant.id] ?? 0,
    })),
  )

  // ── The spin ────────────────────────────────────────────────────────────────

  async function spin(): Promise<void> {
    if (wheel.spinning.value || events.busy.value) return
    const pool = round.candidates.value
    if (!pool.length) {
      panda.say('lonely')
      sfx.play('boop')
      return
    }
    const segments = round.segments.value
    holdSegments = true
    shownSegments.value = segments
    const winnerIndex = randomInt(0, pool.length - 1)
    const winner = pool[winnerIndex]!
    const winnerSegment = segments[winnerIndex]!
    const guess = pool.length > 1 && chance(0.6) ? pick(pool) : null

    timer.reset(settings.value.turnMinutes)
    // Read before the pick: does the turn that starts now land on the sleepy moment?
    const itsDigestionTime = round.forecast.value.nowIsPeak
    sfx.play('whoosh')
    panda.say('spinStart')
    panda.setMood('push', 2200)
    if (guess) setTimeout(() => wheel.spinning.value && panda.say('prediction', { name: guess.name }), 2600)

    await wheel.spin({
      segmentCount: segments.length,
      targetIndex: winnerIndex,
      durationMs: SPIN_MS,
      onTick: () => sfx.play('tick'),
    })

    const completedRound = round.commit(winner.id)
    releaseSegments(3800)
    winnerId.value = winner.id
    winCount.value++
    banner.value = { key: winCount.value, name: winner.name, avatarId: winner.avatarId, color: colorById(winner.colorId).fill }
    setTimeout(() => (banner.value = null), 3000)
    sfx.play('win')
    garden.refill(1)
    const spot = anchors.value?.wheel
    if (spot) confetti.celebrate(spot.x, spot.y, spot.r)

    const risk = winnerSegment.digestion ?? 0
    const vars = { name: winner.name, pct: Math.round(risk * 100), minutes: settings.value.turnMinutes }
    panda.setMood('proud', 2400)
    if (itsDigestionTime) panda.say('pickedDigestion', vars)
    else if (!panda.reactToName(winner.name)) panda.say('picked', vars)
    if (guess) {
      const hit = guess.id === winner.id
      setTimeout(() => panda.say(hit ? 'predictionHit' : 'predictionMiss'), 4600)
    }
    if (completedRound && pool.length > 1) setTimeout(() => panda.say('newRound'), 9000)
  }

  /** The pomodoro never starts by itself: the person who was just drawn presses play when ready. */
  function startTimer(): void {
    timer.start(settings.value.turnMinutes, settings.value.breakMinutes)
    sfx.play('pop')
    panda.say('timerStart', { minutes: settings.value.turnMinutes })
  }

  // ── Team ───────────────────────────────────────────────────────────────────

  function addMember(name: string, avatarId?: string, colorId?: string): void {
    const member = team.add(name, avatarId, colorId)
    if (!member) return
    sfx.play('pop')
    if (!panda.reactToName(member.name)) panda.say('memberAdded', { name: member.name })
  }

  function benchMember(id: string): void {
    const member = team.find(id)
    if (!member) return
    team.setActive(id, false)
    panda.say('memberBenched', { name: member.name })
    sfx.play('boop')
  }

  function restoreMember(id: string): void {
    team.setActive(id, true)
    sfx.play('pop')
  }

  function loadTeam(id: string): void {
    team.loadTeam(id)
    panda.say('teamLoaded')
    sfx.play('pop')
  }

  function forgetMember(id: string): void {
    team.forget(id)
    sfx.play('boop')
  }

  // Members can disappear (forgotten) while still in the round bookkeeping.
  watch(
    () => team.state.value.members.map((m) => m.id),
    (ids) => round.prune(new Set(ids)),
  )

  // ── Panda, plants, secrets ─────────────────────────────────────────────────

  function pokePanda(): void {
    pokes.value++
    clearTimeout(pokeTimer)
    pokeTimer = setTimeout(() => (pokes.value = 0), POKE_RESET_MS)
    sfx.play(pokes.value > 4 ? 'squeak' : 'boop')
    if (pokes.value >= 20) {
      panda.say('pokeHR')
      pokes.value = 0
    } else if (pokes.value >= 6) {
      panda.setMood('grumpy', 3000)
      panda.say('pokeAngry')
    } else {
      panda.say('poke')
    }
  }
  const pokes = panda.pokes

  function waterPlant(id: string): void {
    const result = garden.water(id)
    if (result === 'watered') {
      sfx.play('splash')
      panda.say('wateredThanks')
    } else if (result === 'empty') {
      sfx.play('boop')
      panda.sayText('Le réservoir est vide. Faites tourner la roue : chaque tour remplit une goutte.')
    } else {
      sfx.play('boop')
      panda.sayText('Elle n’a pas soif. Laissez-la respirer.')
    }
  }

  function toggleSound(): void {
    settings.value.sound = !settings.value.sound
  }

  function startDisco(): void {
    if (disco.value) return
    disco.value = true
    panda.say('disco')
    panda.setMood('dance', DISCO_MS)
    sfx.play('win')
    const spot = anchors.value?.wheel
    if (spot) confetti.burst(spot.x, spot.y, true)
    setTimeout(() => (disco.value = false), DISCO_MS)
  }

  function clickLogo(): void {
    sfx.play('pop')
    panda.say('logo')
    confetti.burst(60, 50)
  }

  useKonami(startDisco)

  function onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null
    if (event.code !== 'Space' || target?.closest('input, textarea, select, button')) return
    event.preventDefault()
    void spin()
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
    sprinklerTimer = setInterval(() => {
      const watered = garden.autoWater()
      if (!watered) return
      sfx.play('splash')
      if (chance(0.4)) panda.say('wateredThirsty')
    }, SPRINKLER_EVERY_MS)
    setTimeout(() => panda.say(hasTeam.value ? 'welcome' : 'lonely'), 1600)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
    clearInterval(sprinklerTimer)
    clearTimeout(pokeTimer)
  })

  const setAnchors = (value: StageAnchors): void => {
    anchors.value = value
  }

  return {
    now,
    settings,
    team,
    round,
    panda,
    wheel,
    timer,
    garden,
    confetti,
    events,
    disco,
    asleep: life.asleep,
    anchors,
    hasTeam,
    shownSegments,
    winnerId,
    winCount,
    banner,
    mobile,
    plantViews,
    sfx,
    setAnchors,
    spin,
    startTimer,
    addMember,
    benchMember,
    restoreMember,
    forgetMember,
    loadTeam,
    pokePanda,
    waterPlant,
    toggleSound,
    startDisco,
    clickLogo,
  }
}

export type Game = ReturnType<typeof createGame>

const GAME_KEY: InjectionKey<Game> = Symbol('mob-roulette-game')

/** Called once, by the root. */
export function provideGame(): Game {
  const game = createGame()
  provide(GAME_KEY, game)
  return game
}

export function useGame(): Game {
  const game = inject(GAME_KEY)
  if (!game) throw new Error('useGame() needs provideGame() in an ancestor')
  return game
}
