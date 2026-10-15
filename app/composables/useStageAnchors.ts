import type { Ref } from 'vue'

interface AnchorTargets {
  /** Element that gets resized (the scene). */
  scene: Ref<HTMLElement | null>
  wheel: Ref<HTMLElement | null>
  panda: Ref<HTMLElement | null>
  floor: Ref<HTMLElement | null>
}

/**
 * Measures where things are on screen so scripted actors know where to run, jump and land.
 * Re-measures on resize and once the intro animations have settled.
 */
export function useStageAnchors(targets: AnchorTargets, onMeasure: (anchors: StageAnchors) => void) {
  function measure(): void {
    const wheel = targets.wheel.value?.getBoundingClientRect()
    const panda = targets.panda.value?.getBoundingClientRect()
    const floor = targets.floor.value
    if (!wheel || !panda) return
    const floorLine = floor ? parseFloat(getComputedStyle(floor).getPropertyValue('--floor-line')) || 108 : 108
    const floorTop = floor?.getBoundingClientRect().top ?? window.innerHeight - 70
    onMeasure({
      width: window.innerWidth,
      floorY: floorTop + floorLine,
      wheel: { x: wheel.left + wheel.width / 2, y: wheel.top + wheel.height / 2, r: wheel.width / 2 },
      panda: { x: panda.left + panda.width / 2, y: panda.bottom },
    })
  }

  let observer: ResizeObserver | undefined
  let settle: ReturnType<typeof setTimeout> | undefined

  onMounted(() => {
    if (targets.scene.value) {
      observer = new ResizeObserver(measure)
      observer.observe(targets.scene.value)
    }
    window.addEventListener('resize', measure)
    settle = setTimeout(measure, 1800)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('resize', measure)
    clearTimeout(settle)
  })

  return { measure }
}
