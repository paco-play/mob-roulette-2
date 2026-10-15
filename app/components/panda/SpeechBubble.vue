<script setup lang="ts">
import type { Speech } from '~/types/scene'

const props = defineProps<{ speech: Speech | null }>()

const TYPE_INTERVAL_MS = 22

const shown = ref('')
/** Kept after the speech ends so the bubble keeps its text while it fades out. */
const fullText = ref('')
let typer: ReturnType<typeof setInterval> | undefined

watch(
  () => props.speech?.id,
  () => {
    clearInterval(typer)
    const text = props.speech?.text
    if (!text) return
    fullText.value = text
    let index = 0
    shown.value = ''
    typer = setInterval(() => {
      index++
      shown.value = text.slice(0, index)
      if (index >= text.length) clearInterval(typer)
    }, TYPE_INTERVAL_MS)
  },
)

onBeforeUnmount(() => clearInterval(typer))
</script>

<template>
  <Transition name="pop">
    <div v-if="speech" :key="speech.id" class="bubble" role="status">
      <span class="sr-only">{{ speech.text }}</span>
      <!-- The full text is laid out invisibly so the bubble never grows while it types -->
      <p class="ghost" aria-hidden="true">{{ fullText }}</p>
      <p class="typed" aria-hidden="true">{{ shown }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.bubble {
  position: relative;
  display: grid;
  width: max-content;
  max-width: min(300px, 70vw);
  padding: 10px 14px 11px;
  border: 1.8px solid var(--forest);
  border-radius: 14px 14px 14px 3px;
  background: var(--paper-2);
  box-shadow: 4px 4px 0 var(--sage);
  transform-origin: 20% 100%;
}

.bubble::after {
  content: '';
  position: absolute;
  left: 26px;
  bottom: -11px;
  width: 16px;
  height: 16px;
  background: var(--paper-2);
  border-right: 1.8px solid var(--forest);
  border-bottom: 1.8px solid var(--forest);
  transform: skewX(-22deg) rotate(45deg);
}

p {
  grid-area: 1 / 1;
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--forest);
}

.ghost {
  visibility: hidden;
}

.pop-enter-active {
  transition:
    transform 0.4s var(--ease-spring),
    opacity 0.2s;
}

.pop-leave-active {
  position: absolute;
  left: 0;
  bottom: 0;
  transition:
    transform 0.25s ease-in,
    opacity 0.25s;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.7) translateY(8px);
}
</style>
