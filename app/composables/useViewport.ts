export const MOBILE_QUERY = '(max-width: 980px)'

export function useViewport() {
  const isMobile = ref(false)
  onMounted(() => {
    const query = window.matchMedia(MOBILE_QUERY)
    const update = (): void => {
      isMobile.value = query.matches
    }
    update()
    query.addEventListener('change', update)
    onBeforeUnmount(() => query.removeEventListener('change', update))
  })
  return { isMobile }
}
