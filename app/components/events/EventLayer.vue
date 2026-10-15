<script setup lang="ts">
import type { ActiveEvent } from '~/composables/useStageEvents'
import type { StageAnchors } from '~/types/scene'

defineProps<{ event: ActiveEvent | null; anchors: StageAnchors | null }>()
</script>

<template>
  <div class="layer" aria-hidden="true">
    <template v-if="event && anchors">
      <CatActor v-if="event.id === 'cat'" :key="event.key" :phase="event.phase" :anchors="anchors" />
      <TripActor v-else-if="event.id === 'trip'" :key="event.key" :phase="event.phase" :anchors="anchors" />
      <RoombaActor v-else-if="event.id === 'roomba'" :key="event.key" :phase="event.phase" :anchors="anchors" />
      <PlaneActor v-else-if="event.id === 'plane'" :key="event.key" :phase="event.phase" :anchors="anchors" />
      <PigeonActor v-else-if="event.id === 'pigeon'" :key="event.key" :phase="event.phase" :anchors="anchors" />
    </template>
  </div>
</template>

<style scoped>
.layer {
  position: fixed;
  inset: 0;
  z-index: 30;
  pointer-events: none;
  overflow: hidden;
}
</style>
