const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useKonami(onComplete: () => void) {
  let index = 0
  const onKey = (event: KeyboardEvent): void => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
    index = key === SEQUENCE[index] ? index + 1 : key === SEQUENCE[0] ? 1 : 0
    if (index === SEQUENCE.length) {
      index = 0
      onComplete()
    }
  }
  onMounted(() => window.addEventListener('keydown', onKey))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
}
