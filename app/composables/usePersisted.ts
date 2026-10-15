import type { Ref } from 'vue'

/** A ref backed by localStorage (the app is fully static, so this is the only database). */
export function usePersisted<T extends object>(key: string, fallback: T): Ref<T> {
  const state = ref(readJson(`mob-roulette:${key}`, fallback)) as Ref<T>
  watch(state, (value) => writeJson(`mob-roulette:${key}`, value), { deep: true })
  return state
}
