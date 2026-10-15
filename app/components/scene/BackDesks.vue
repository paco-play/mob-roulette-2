<template>
  <div class="desks" aria-hidden="true">
    <svg v-for="desk in 6" :key="desk" class="desk" :class="{ typing: desk % 2 === 1, away: desk === 4 }" viewBox="0 0 150 120">
      <!-- chair -->
      <path class="chair" d="M48 62 Q40 62 40 76 V92 H60 V76 Q60 62 52 62 Z" />
      <path class="chair" d="M50 92 V108 M40 108 H62" />
      <!-- person -->
      <g v-if="desk !== 4" class="person">
        <circle class="skin" cx="62" cy="48" r="9" />
        <path class="body" d="M48 92 Q48 62 62 62 Q76 62 76 92 Z" />
      </g>
      <!-- desk and monitor -->
      <path class="top" d="M20 84 H146 V92 H20 Z" />
      <path class="leg" d="M30 92 V114 M136 92 V114" />
      <rect class="screen" x="82" y="50" width="34" height="26" rx="2" />
      <path class="stand" d="M99 76 V84 M90 84 H108" />
      <path class="lines" d="M88 58 H108 M88 64 H102 M88 70 H110" />
      <circle class="mug" cx="128" cy="79" r="4" />
    </svg>
  </div>
</template>

<style scoped>
/* A far row of workstations, drawn faint so the foreground stays the star */
.desks {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
  opacity: 0.9;
}

.desk {
  width: clamp(90px, 11vw, 160px);
  overflow: visible;
}

.chair,
.person path,
.person circle,
.top,
.screen,
.mug {
  fill: var(--sage-3);
  stroke: rgb(38 57 44 / 0.5);
  stroke-width: 2.2;
  stroke-linejoin: round;
}

.chair {
  fill: var(--sage-2);
}

.body {
  fill: var(--sage-2);
}

.top {
  fill: var(--paper-2);
}

.leg,
.stand {
  fill: none;
  stroke: rgb(38 57 44 / 0.5);
  stroke-width: 2.4;
  stroke-linecap: round;
}

.lines {
  fill: none;
  stroke: rgb(38 57 44 / 0.35);
  stroke-width: 2;
  stroke-linecap: round;
}

.typing .person {
  transform-origin: 62px 92px;
  animation: nod 2.8s ease-in-out infinite;
}

@keyframes nod {
  50% {
    transform: translateY(2px) rotate(1.5deg);
  }
}

@media (max-width: 1180px) {
  .desk:nth-child(n + 5) {
    display: none;
  }
}
</style>
