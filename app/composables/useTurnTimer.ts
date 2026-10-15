import type { TimerPhase, TimerStatus } from '~/types/game'

interface TurnTimerHandlers {
  /** The focus turn is over (a break may follow). */
  onFocusDone: (hasBreak: boolean) => void
  /** The break is over. */
  onBreakDone: () => void
}

/** Pomodoro for one turn: a focus countdown, then an optional break. Uses a deadline, so background tabs stay accurate. */
export function useTurnTimer({ onFocusDone, onBreakDone }: TurnTimerHandlers) {
  const status = ref<TimerStatus>('idle')
  const phase = ref<TimerPhase>('focus')
  const totalSeconds = ref(1500)
  const remaining = ref(1500)
  let breakMinutes = 0
  let deadline = 0
  let timer: ReturnType<typeof setInterval> | undefined

  const progress = computed(() => (totalSeconds.value ? 1 - remaining.value / totalSeconds.value : 0))
  const label = computed(() => formatDuration(remaining.value))

  function stop(): void {
    clearInterval(timer)
    timer = undefined
  }

  function run(): void {
    deadline = Date.now() + remaining.value * 1000
    status.value = 'running'
    stop()
    timer = setInterval(tick, 250)
  }

  function begin(nextPhase: TimerPhase, minutes: number): void {
    phase.value = nextPhase
    totalSeconds.value = Math.max(1, minutes * 60)
    remaining.value = totalSeconds.value
    run()
  }

  function finish(): void {
    stop()
    if (phase.value === 'focus') {
      onFocusDone(breakMinutes > 0)
      if (breakMinutes > 0) return begin('break', breakMinutes)
      status.value = 'done'
      return
    }
    status.value = 'done'
    onBreakDone()
  }

  function tick(): void {
    remaining.value = Math.max(0, (deadline - Date.now()) / 1000)
    if (remaining.value <= 0) finish()
  }

  function start(focusMinutes: number, breakAfter: number): void {
    breakMinutes = breakAfter
    begin('focus', focusMinutes)
  }

  function pause(): void {
    if (status.value !== 'running') return
    tick()
    if (status.value !== 'running') return
    stop()
    status.value = 'paused'
  }

  function resume(): void {
    if (status.value === 'paused') run()
  }

  /** Jumps over the rest of a break. */
  function skipBreak(): void {
    if (phase.value !== 'break' || (status.value !== 'running' && status.value !== 'paused')) return
    stop()
    status.value = 'done'
    remaining.value = 0
    onBreakDone()
  }

  function reset(minutes: number): void {
    stop()
    phase.value = 'focus'
    totalSeconds.value = minutes * 60
    remaining.value = totalSeconds.value
    status.value = 'idle'
  }

  onBeforeUnmount(stop)

  return { status, phase, remaining, totalSeconds, progress, label, start, pause, resume, skipBreak, reset }
}
