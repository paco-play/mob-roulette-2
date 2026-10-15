import type { EventId, StageAnchors } from '~/types/scene'

interface StageEventDeps {
  anchors: () => StageAnchors | null
  wheel: ReturnType<typeof useWheel>
  panda: ReturnType<typeof usePanda>
  sfx: ReturnType<typeof useSfx>
  /** False while something more important (a spin, the panda talking) owns the stage. */
  canRun: () => boolean
}

export interface ActiveEvent {
  id: EventId
  phase: string
  /** Changes on every run so Vue re-mounts the actor and restarts its animation. */
  key: number
}

const MIN_GAP_MS = 45_000
const MAX_GAP_MS = 110_000
const ALL_EVENTS: readonly EventId[] = ['cat', 'trip', 'roomba', 'plane', 'pigeon']

/**
 * Little scripted gags on the office floor. Each one is a short timeline of phases;
 * the actor components only look at `phase` and the anchors, so all the story lives here.
 */
export function useStageEvents({ anchors, wheel, panda, sfx, canRun }: StageEventDeps) {
  const active = ref<ActiveEvent | null>(null)
  let runs = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let disposed = false

  const busy = computed(() => active.value !== null)

  async function phase(name: string, holdMs: number): Promise<void> {
    if (active.value) active.value.phase = name
    await sleep(holdMs)
  }

  const timelines: Record<EventId, () => Promise<void>> = {
    // The cat jumps on the wheel and spins it by accident; the panda complains and sets it back.
    async cat() {
      await phase('run', 1900)
      await phase('jump', 650)
      sfx.play('thud')
      panda.say('catSpin')
      panda.setMood('grumpy', 3000)
      const delta = randomInt(300, 560)
      void wheel.nudge(delta, 2800)
      await phase('ride', 3000)
      panda.say('catReset')
      panda.setMood('push', 2600)
      await phase('leave', 600)
      sfx.play('whoosh')
      await wheel.nudge(-delta, 1500)
      await sleep(1400)
    },
    // A colleague carrying coffee trips on nothing at all.
    async trip() {
      panda.say('tripWatch')
      await phase('walk', 4300)
      sfx.play('thud')
      await phase('trip', 700)
      panda.say('tripAfter')
      await phase('lying', 2400)
      await phase('rise', 800)
      await phase('leave', 3200)
    },
    async roomba() {
      panda.say('roomba')
      await phase('cross', 13_000)
    },
    async plane() {
      panda.say('plane')
      sfx.play('whoosh')
      await phase('fly', 6500)
    },
    async pigeon() {
      panda.say('pigeon')
      await phase('land', 1500)
      await phase('sit', 4200)
      await phase('fly', 1800)
    },
  }

  async function run(id: EventId): Promise<void> {
    if (active.value || !anchors()) return
    active.value = { id, phase: 'start', key: ++runs }
    try {
      // Let the actor mount at its starting mark so the first phase is a transition, not a teleport.
      await sleep(80)
      await timelines[id]()
    } finally {
      active.value = null
      panda.setMood('idle')
    }
  }

  function scheduleNext(): void {
    timer = setTimeout(async () => {
      if (disposed) return
      if (canRun() && !active.value) await run(pick(ALL_EVENTS))
      scheduleNext()
    }, randomBetween(MIN_GAP_MS, MAX_GAP_MS))
  }

  const runRandom = (): Promise<void> => run(pick(ALL_EVENTS))

  onMounted(scheduleNext)
  onBeforeUnmount(() => {
    disposed = true
    clearTimeout(timer)
  })

  return { active, busy, run, runRandom }
}
