<script setup lang="ts">
import { avatarById } from '~/data/avatars'
const props = defineProps<{ avatarId: string }>()

const avatar = computed(() => avatarById(props.avatarId))
const paths = computed(() => spritePaths(avatar.value))
</script>

<template>
  <svg class="pixel" viewBox="0 0 14 14" shape-rendering="crispEdges" role="img" :aria-label="avatar.label">
    <path v-for="path in paths" :key="path.color" :d="path.d" :fill="path.color" />
  </svg>
</template>

<style scoped>
.pixel {
  display: block;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}
</style>
