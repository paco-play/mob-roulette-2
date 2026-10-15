<script setup lang="ts">
import { avatarById } from '~/data/avatars'
import type { WheelSegment } from '~/types/team'
import { SPRITE_SIZE } from '~/utils/spriteOutline'

/**
 * The slices only. It never knows the rotation (the parent rotates it with a CSS transform),
 * so spinning doesn't re-render a single node in here.
 */
const props = defineProps<{ segments: readonly WheelSegment[]; winnerId: string | null }>()

const CENTER = 250
const RADIUS = 232
const NAME_START = 96
const AVATAR_DISTANCE = 190
const GHOST_COLORS = ['#dfe5d2', '#e9e1cc', '#dfe5d2', '#e9e1cc', '#dfe5d2', '#e9e1cc']

interface Slice {
  id: string
  path: string
  fill: string
  rotation: number
  name: string
  fontSize: number
  avatarId: string
  avatarSize: number
  level: number
}

const slices = computed<Slice[]>(() => {
  const list = props.segments.length
    ? props.segments
    : GHOST_COLORS.map((color, i) => ({ id: `ghost-${i}`, name: '?', avatarId: '', color, digestion: null }))
  const step = 360 / list.length
  const arcAtAvatar = (2 * Math.PI * AVATAR_DISTANCE) / list.length
  return list.map((segment, i) => ({
    id: segment.id,
    path: wedgePath(CENTER, CENTER, RADIUS, i * step, (i + 1) * step),
    fill: segment.color,
    rotation: (i + 0.5) * step,
    name: segment.name,
    fontSize: clamp(66 / (Math.max(segment.name.length, 2) * 0.56), 11, 22),
    avatarId: segment.avatarId,
    avatarSize: clamp(arcAtAvatar * 0.8, 26, 58),
    level: warningLevel(segment.digestion),
  }))
})

const avatarPaths = (id: string) => (id ? spritePaths(avatarById(id)) : [])
</script>

<template>
  <svg class="disc" viewBox="0 0 500 500" aria-hidden="true">
    <defs>
      <pattern id="wheel-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
        <line x1="0" y1="0" x2="0" y2="9" stroke="#26392c" stroke-opacity="0.13" stroke-width="2.4" />
      </pattern>
    </defs>

    <g v-for="(slice, i) in slices" :key="slice.id" class="slice" :class="{ win: slice.id === winnerId, dim: winnerId && slice.id !== winnerId }">
      <path :d="slice.path" :fill="slice.fill" stroke="var(--forest)" stroke-width="2" stroke-linejoin="round" />
      <path v-if="i % 2" :d="slice.path" fill="url(#wheel-hatch)" />
      <g :transform="`rotate(${slice.rotation} ${CENTER} ${CENTER})`">
        <text class="name" :transform="`translate(${CENTER} ${CENTER - NAME_START}) rotate(-90)`" :font-size="slice.fontSize" dominant-baseline="central">
          {{ slice.name }}
        </text>
        <g v-if="slice.avatarId">
          <clipPath :id="`avatar-clip-${slice.id}`">
            <circle :cx="CENTER" :cy="CENTER - AVATAR_DISTANCE" :r="slice.avatarSize / 2" />
          </clipPath>
          <circle :cx="CENTER" :cy="CENTER - AVATAR_DISTANCE" :r="slice.avatarSize / 2" fill="var(--paper-2)" />
          <!-- The square sprite is clipped to the round frame, like a profile picture -->
          <g :clip-path="`url(#avatar-clip-${slice.id})`">
          <svg
            :x="CENTER - slice.avatarSize * 0.45"
            :y="CENTER - AVATAR_DISTANCE - slice.avatarSize * 0.42"
            :width="slice.avatarSize * 0.9"
            :height="slice.avatarSize * 0.9"
            :viewBox="`0 0 ${SPRITE_SIZE} ${SPRITE_SIZE}`"
            shape-rendering="crispEdges"
          >
            <path v-for="p in avatarPaths(slice.avatarId)" :key="p.color" :d="p.d" :fill="p.color" />
          </svg>
          </g>
          <circle :cx="CENTER" :cy="CENTER - AVATAR_DISTANCE" :r="slice.avatarSize / 2" fill="none" stroke="var(--forest)" stroke-width="1.8" />
        </g>
        <g v-if="slice.level" :transform="`translate(${CENTER} ${CENTER - 74})`">
          <g class="warn" :class="`level-${slice.level}`">
            <path d="M0 -10 L10 8 H-10 Z" fill="#f6dba0" stroke="var(--forest)" stroke-width="1.6" stroke-linejoin="round" />
            <path d="M0 -4 V2 M0 4.4 V4.6" stroke="var(--forest)" stroke-width="2" stroke-linecap="round" />
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.disc {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.name {
  font-family: var(--font-display);
  font-weight: 700;
  fill: var(--forest);
  letter-spacing: -0.02em;
  pointer-events: none;
}

.slice {
  transition: opacity 0.5s;
}

.slice.dim {
  opacity: 0.4;
}

.slice.win path:first-child {
  stroke-width: 5;
}

.warn {
  transform-box: fill-box;
  transform-origin: center;
}

.level-2 {
  animation: warn-pulse 2.6s ease-in-out infinite;
}

.level-3 {
  animation: warn-pulse 1.1s ease-in-out infinite;
}

.level-3 path:first-child {
  fill: #f1a98f;
}

@keyframes warn-pulse {
  50% {
    transform: scale(1.18);
  }
}
</style>
