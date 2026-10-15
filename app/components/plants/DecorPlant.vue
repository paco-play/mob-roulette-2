<script setup lang="ts">
/** A tall fiddle-leaf fig in a big pot. Pure decor: it does not grow and can't be watered. */
const LEAF_COUNT = 13
const TRUNK_TOP = 46
const TRUNK_BOTTOM = 262

const leaves = Array.from({ length: LEAF_COUNT }, (_, i) => {
  const t = i / (LEAF_COUNT - 1)
  const side = i % 2 === 0 ? -1 : 1
  return {
    key: i,
    x: 80 + Math.sin(t * 3) * 4,
    y: TRUNK_BOTTOM - 40 - t * (TRUNK_BOTTOM - TRUNK_TOP - 40),
    angle: side * (62 - t * 34) + Math.sin(i * 1.7) * 6,
    path: leafPath(46 + Math.sin(i * 2.1) * 8 - t * 6, 0.72),
    fill: ['#7da06a', '#5f8a56', '#93b383'][i % 3]!,
  }
})
const topLeaf = leafPath(54, 0.7)
</script>

<template>
  <svg class="decor" viewBox="0 0 160 330" aria-hidden="true">
    <g class="crown">
      <path class="trunk" :d="`M80 ${TRUNK_BOTTOM} C 76 200, 88 120, 82 ${TRUNK_TOP}`" />
      <g v-for="leaf in leaves" :key="leaf.key" :transform="`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle})`">
        <path :d="leaf.path" :fill="leaf.fill" stroke="var(--forest)" stroke-width="2" stroke-linejoin="round" />
        <path class="rib" d="M0 0 V-30" />
      </g>
      <g transform="translate(82 50) rotate(-6)">
        <path :d="topLeaf" fill="#7da06a" stroke="var(--forest)" stroke-width="2" stroke-linejoin="round" />
      </g>
    </g>
    <path class="pot" d="M34 262 H126 L116 326 H44 Z" />
    <rect class="rim" x="28" y="254" width="104" height="16" rx="3" />
    <path class="band" d="M40 292 H120" />
  </svg>
</template>

<style scoped>
.decor {
  display: block;
  width: 100%;
  overflow: visible;
}

.crown {
  transform-origin: 80px 262px;
  animation: sway 8s ease-in-out infinite;
}

.trunk {
  fill: none;
  stroke: #6b5a44;
  stroke-width: 6;
  stroke-linecap: round;
}

.rib {
  stroke: var(--forest);
  stroke-opacity: 0.4;
  stroke-width: 1.4;
  stroke-linecap: round;
}

.pot {
  fill: var(--sage-2);
  stroke: var(--forest);
  stroke-width: 3;
  stroke-linejoin: round;
}

.rim {
  fill: var(--sage-3);
  stroke: var(--forest);
  stroke-width: 3;
}

.band {
  stroke: var(--forest);
  stroke-width: 2;
  stroke-opacity: 0.4;
}

@keyframes sway {
  50% {
    transform: rotate(1deg);
  }
}
</style>
