<template>
  <div class="ceiling" aria-hidden="true">
    <svg class="beam" viewBox="0 0 1000 14" preserveAspectRatio="none"><rect width="1000" height="14" /></svg>

    <div v-for="lamp in 3" :key="lamp" class="lamp" :class="`lamp-${lamp}`">
      <svg viewBox="0 0 90 150">
        <path class="cord" d="M45 0 V54" />
        <path class="glow" d="M20 70 L-24 150 H114 L70 70 Z" />
        <path class="shade" d="M10 78 Q10 54 45 54 Q80 54 80 78 Z" />
        <ellipse class="bulb" cx="45" cy="80" rx="12" ry="5" />
      </svg>
    </div>

    <div class="hanging">
      <svg viewBox="0 0 120 190">
        <path class="cord" d="M60 0 V14 M60 14 L26 50 M60 14 L94 50" />
        <path class="pot" d="M24 50 H96 Q92 86 60 88 Q28 86 24 50 Z" />
        <g class="vines">
          <path d="M34 80 C 26 110 40 130 30 170" />
          <path d="M60 86 C 66 118 52 140 62 184" />
          <path d="M86 80 C 98 108 84 130 94 160" />
          <ellipse cx="30" cy="172" rx="9" ry="5" />
          <ellipse cx="62" cy="186" rx="9" ry="5" />
          <ellipse cx="94" cy="162" rx="9" ry="5" />
          <ellipse cx="38" cy="132" rx="8" ry="4" />
          <ellipse cx="90" cy="130" rx="8" ry="4" />
        </g>
        <g class="top">
          <ellipse cx="42" cy="46" rx="16" ry="9" />
          <ellipse cx="78" cy="46" rx="16" ry="9" />
          <ellipse cx="60" cy="36" rx="14" ry="9" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.ceiling {
  position: absolute;
  inset: -26px 0 auto 0;
  height: 0;
  pointer-events: none;
}

.beam {
  position: absolute;
  left: -32px;
  right: -32px;
  top: 0;
  width: calc(100% + 64px);
  height: 14px;
}

.beam rect {
  fill: var(--forest);
  opacity: 0.85;
}

.lamp {
  position: absolute;
  top: 12px;
  width: 64px;
  transform-origin: 50% 0;
  animation: sway 7s ease-in-out infinite;
}

.lamp-1 {
  left: 30%;
}

.lamp-2 {
  left: 52%;
  animation-delay: -2s;
}

.lamp-3 {
  left: 74%;
  animation-delay: -4s;
}

.lamp svg,
.hanging svg {
  display: block;
  width: 100%;
  overflow: visible;
}

.cord {
  fill: none;
  stroke: var(--forest);
  stroke-width: 2.4;
  stroke-linecap: round;
}

.shade {
  fill: var(--sage);
  stroke: var(--forest);
  stroke-width: 3;
  stroke-linejoin: round;
}

.bulb {
  fill: #f6e6a8;
  stroke: var(--forest);
  stroke-width: 2;
}

.glow {
  fill: #f6e6a8;
  opacity: 0.22;
}

.hanging {
  position: absolute;
  left: 19%;
  top: 12px;
  width: 78px;
  transform-origin: 50% 0;
  animation: sway 9s ease-in-out infinite;
}

.pot {
  fill: #ece6cf;
  stroke: var(--forest);
  stroke-width: 3;
  stroke-linejoin: round;
}

.vines path {
  fill: none;
  stroke: #6d8a72;
  stroke-width: 3;
  stroke-linecap: round;
}

.vines ellipse,
.top ellipse {
  fill: #86a08a;
  stroke: var(--forest);
  stroke-width: 2.4;
}

@keyframes sway {
  50% {
    transform: rotate(1.6deg);
  }
}

@media (max-width: 1180px) {
  .hanging {
    display: none;
  }
}
</style>
