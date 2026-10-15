<script setup lang="ts">
import { ME_GUSTA_SIZE, meGustaPaths } from '~/data/meGusta'

const gusta = meGustaPaths()
</script>

<template>
  <svg class="board" viewBox="0 0 260 160" aria-hidden="true">
    <rect class="frame" x="4" y="4" width="252" height="130" rx="3" />
    <path class="tray" d="M40 134 H220 V143 H40 Z" />
    <rect class="marker" x="62" y="127" width="26" height="6" rx="2" />
    <rect class="marker red" x="94" y="127" width="18" height="6" rx="2" />

    <!-- Formulas, scribbled -->
    <g class="formulas">
      <text x="16" y="34" class="big">E = mc²</text>
      <text x="16" y="58">∑ bugs → ∞</text>
      <text x="16" y="80">P(14 h) = 1/n</text>
      <text x="16" y="102">∫ café dt = commit</text>
      <text x="16" y="123" class="small">∴ 42</text>
    </g>

    <!-- A discreet pixel "me gusta" in the corner -->
    <svg class="gusta" x="200" y="26" width="46" height="46" :viewBox="`0 0 ${ME_GUSTA_SIZE} ${ME_GUSTA_SIZE}`" shape-rendering="crispEdges">
      <path v-for="p in gusta" :key="p.color" :d="p.d" :fill="p.color" />
    </svg>

    <!-- A little graph going the wrong way -->
    <path class="graph" d="M120 116 L132 108 L142 112 L154 98" />
    <rect class="note n1" x="228" y="100" width="22" height="20" />
  </svg>
</template>

<style scoped>
.board {
  display: block;
  width: 100%;
  overflow: visible;
}

.frame {
  fill: var(--paper-2);
  stroke: var(--forest);
  stroke-width: 4;
}

.tray {
  fill: var(--forest);
}

.marker {
  fill: var(--forest-3);
  stroke: var(--forest);
  stroke-width: 1.4;
}

.marker.red {
  fill: var(--accent);
}

.formulas text {
  font-family: var(--font-hand);
  font-size: 13px;
  fill: var(--forest);
}

.formulas .big {
  font-size: 19px;
}

.formulas .small {
  font-size: 11px;
  opacity: 0.7;
}

.graph {
  fill: none;
  stroke: var(--forest);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 3 4;
}

.note {
  stroke: var(--forest);
  stroke-width: 1.8;
}

.n1 {
  fill: #f6e6a8;
  transform: rotate(5deg);
  transform-origin: 239px 110px;
}

.gusta {
  animation: wink 6s ease-in-out infinite;
  transform-origin: 223px 49px;
}

@keyframes wink {
  0%,
  90%,
  100% {
    transform: scale(1);
  }
  94% {
    transform: scale(1.08) rotate(-3deg);
  }
}
</style>
