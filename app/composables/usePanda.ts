import type { PandaMood, Speech } from '~/types/scene'
import { NAME_EASTER_EGGS, QUOTES, type QuoteTopic } from '~/data/quotes'

export type SpeechVars = Partial<Record<'name' | 'pct' | 'minutes', string | number>>

const MIN_BUBBLE_MS = 3200
const MS_PER_CHAR = 55

/** The red panda's voice and mood. Owns the speech bubble and never repeats itself twice in a row. */
export function usePanda() {
  const speech = ref<Speech | null>(null)
  const mood = ref<PandaMood>('idle')
  const pokes = ref(0)
  const lastByTopic = new Map<QuoteTopic, string>()
  let speechId = 0
  let hideTimer: ReturnType<typeof setTimeout> | undefined
  let moodTimer: ReturnType<typeof setTimeout> | undefined

  const fill = (template: string, vars: SpeechVars): string =>
    template.replace(/\{(name|pct|minutes)\}/g, (_, key: keyof SpeechVars) => String(vars[key] ?? ''))

  function sayText(text: string, extraMs = 0): void {
    clearTimeout(hideTimer)
    speech.value = { id: ++speechId, text }
    hideTimer = setTimeout(() => (speech.value = null), Math.max(MIN_BUBBLE_MS, text.length * MS_PER_CHAR) + extraMs)
    // Talking is the resting expression while the bubble is up.
    if (mood.value === 'idle') mood.value = 'talk'
    clearTimeout(moodTimer)
    moodTimer = setTimeout(() => {
      if (mood.value === 'talk') mood.value = 'idle'
    }, Math.min(text.length * 45, 4000))
  }

  function say(topic: QuoteTopic, vars: SpeechVars = {}): void {
    const text = pickFresh(QUOTES[topic], lastByTopic.get(topic))
    lastByTopic.set(topic, text)
    sayText(fill(text, vars))
  }

  /** The panda raises an eyebrow at certain names. Returns true when it commented. */
  function reactToName(name: string): boolean {
    const lower = name.toLowerCase()
    const egg = NAME_EASTER_EGGS.find(([needle]) => lower.includes(needle))
    if (!egg) return false
    sayText(egg[1])
    return true
  }

  function setMood(next: PandaMood, durationMs?: number): void {
    mood.value = next
    clearTimeout(moodTimer)
    if (durationMs) moodTimer = setTimeout(() => (mood.value = 'idle'), durationMs)
  }

  function shush(): void {
    clearTimeout(hideTimer)
    speech.value = null
  }

  onBeforeUnmount(() => {
    clearTimeout(hideTimer)
    clearTimeout(moodTimer)
  })

  return { speech, mood, pokes, say, sayText, reactToName, setMood, shush }
}
