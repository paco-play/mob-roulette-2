import type { Ref } from 'vue'

/**
 * Makes an element's eyes follow the pointer by writing two CSS variables straight to the DOM.
 * Nothing reactive is involved, so a moving mouse never triggers a Vue render.
 */
export function usePandaGaze() {
  function watchPointer(target: Ref<HTMLElement | null>): void {
    const element = target.value
    if (!element) return
    let rect = element.getBoundingClientRect()
    let frame = 0
    let x = 0
    let y = 0

    const refreshRect = (): void => {
      rect = element.getBoundingClientRect()
    }
    const apply = (): void => {
      frame = 0
      const dx = clamp((x - (rect.left + rect.width / 2)) / 420, -1, 1)
      const dy = clamp((y - (rect.top + rect.height * 0.38)) / 320, -1, 1)
      element.style.setProperty('--lx', String(Math.round(dx * 1.4)))
      element.style.setProperty('--ly', String(Math.round(dy * 1.2)))
    }
    const onMove = (event: PointerEvent): void => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', refreshRect)
    const rectTimer = setInterval(refreshRect, 2000)
    onBeforeUnmount(() => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', refreshRect)
      clearInterval(rectTimer)
      cancelAnimationFrame(frame)
    })
  }

  return { watchPointer }
}
