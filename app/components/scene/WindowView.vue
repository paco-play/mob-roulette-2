<script setup lang="ts">
defineEmits<{ knock: [] }>()
</script>

<template>
  <button class="window" type="button" aria-label="Fenêtre" @click="$emit('knock')">
    <svg viewBox="0 0 260 300" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#d7e6dc" />
          <stop offset="1" stop-color="#eef0dc" />
        </linearGradient>
        <clipPath id="pane"><rect x="14" y="14" width="232" height="272" /></clipPath>
      </defs>
      <rect x="6" y="6" width="248" height="288" class="frame" />
      <g clip-path="url(#pane)">
        <rect x="14" y="14" width="232" height="272" fill="url(#sky)" />
        <g class="cloud c1"><path d="M30 70 q10 -16 28 -8 q10 -14 28 0 q16 0 14 14 H30 Z" /></g>
        <g class="cloud c2"><path d="M130 120 q8 -12 22 -6 q8 -10 22 0 q12 0 10 12 H130 Z" /></g>
        <!-- Skyline, three planes of sage -->
        <path class="far" d="M14 286 V210 H44 V180 H70 V214 H96 V160 H112 V150 H120 V160 H134 V200 H160 V176 H188 V220 H214 V190 H246 V286 Z" />
        <path class="mid" d="M14 286 V240 H38 V214 H62 V242 H92 V196 H118 V246 H148 V220 H176 V250 H206 V226 H246 V286 Z" />
        <path class="near" d="M14 286 V262 H50 V244 H84 V266 H130 V250 H170 V268 H210 V254 H246 V286 Z" />
        <g class="lights">
          <rect x="102" y="170" width="4" height="4" /><rect x="102" y="182" width="4" height="4" />
          <rect x="52" y="188" width="4" height="4" /><rect x="168" y="190" width="4" height="4" />
          <rect x="196" y="200" width="4" height="4" /><rect x="76" y="226" width="4" height="4" />
        </g>
      </g>
      <path class="mullion" d="M130 14 V286 M14 150 H246" />
      <rect x="0" y="288" width="260" height="12" class="sill" />
    </svg>
  </button>
</template>

<style scoped>
.window {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
}

svg {
  display: block;
  width: 100%;
  overflow: visible;
}

.frame {
  fill: none;
  stroke: var(--forest);
  stroke-width: 12;
}

.mullion {
  stroke: var(--forest);
  stroke-width: 7;
}

.sill {
  fill: var(--forest);
}

.far {
  fill: #b8c8b0;
}

.mid {
  fill: #93a98a;
}

.near {
  fill: #6d8a72;
}

.lights rect {
  fill: #f6e6a8;
}

.cloud {
  fill: #fbf8ec;
  stroke: var(--forest);
  stroke-width: 1.6;
  stroke-linejoin: round;
  animation: drift 60s linear infinite;
}

.c2 {
  animation-duration: 90s;
  animation-delay: -30s;
}

@keyframes drift {
  from {
    transform: translateX(-120px);
  }
  to {
    transform: translateX(260px);
  }
}
</style>
