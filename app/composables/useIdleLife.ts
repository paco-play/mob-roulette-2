const CHATTER_MIN_MS = 28_000
const CHATTER_MAX_MS = 58_000
const SLEEP_AFTER_MS = 150_000
const FRIDAY = 5

interface IdleLifeDeps {
  panda: ReturnType<typeof usePanda>
  /** False while a spin or a scripted event owns the stage. */
  canTalk: () => boolean
}

/** Makes the panda feel alive: random chatter, a Friday warning, and naps when nobody touches anything. */
export function useIdleLife({ panda, canTalk }: IdleLifeDeps) {
  let lastActivity = Date.now()
  let chatterTimer: ReturnType<typeof setTimeout> | undefined
  let napTimer: ReturnType<typeof setInterval> | undefined
  const asleep = ref(false)

  function wake(): void {
    lastActivity = Date.now()
    if (!asleep.value) return
    asleep.value = false
    panda.setMood('idle')
    panda.say('wake')
  }

  function scheduleChatter(): void {
    chatterTimer = setTimeout(() => {
      if (!asleep.value && canTalk() && !panda.speech.value) {
        const isFriday = new Date().getDay() === FRIDAY
        panda.say(isFriday && chance(0.25) ? 'friday' : 'idle')
      }
      scheduleChatter()
    }, randomBetween(CHATTER_MIN_MS, CHATTER_MAX_MS))
  }

  function checkNap(): void {
    if (asleep.value || !canTalk() || Date.now() - lastActivity < SLEEP_AFTER_MS) return
    asleep.value = true
    panda.setMood('sleep')
    panda.say('sleepy')
  }

  const events = ['pointerdown', 'keydown', 'pointermove'] as const

  onMounted(() => {
    events.forEach((name) => window.addEventListener(name, wake, { passive: true }))
    scheduleChatter()
    napTimer = setInterval(checkNap, 5000)
  })

  onBeforeUnmount(() => {
    events.forEach((name) => window.removeEventListener(name, wake))
    clearTimeout(chatterTimer)
    clearInterval(napTimer)
  })

  return { asleep }
}
