<template>
  <svg class="stand" viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden="true">
    <ellipse class="shadow" cx="120" cy="84" rx="110" ry="6" />
    <path class="leg" d="M120 0 L52 82 M120 0 L188 82 M120 0 V70" />
    <path class="foot" d="M40 84 H64 M176 84 H200 M108 80 H132" />
    <rect class="axle" x="104" y="0" width="32" height="12" rx="3" />
  </svg>
</template>

<style scoped>
.stand {
  display: block;
  width: 62%;
  height: var(--stand-h, 70px);
  margin: -10px auto 0;
  overflow: visible;
}

.shadow {
  fill: rgb(38 57 44 / 0.2);
}

.leg {
  fill: none;
  stroke: var(--forest);
  stroke-width: 9;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.foot {
  stroke: var(--forest);
  stroke-width: 7;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.axle {
  fill: var(--forest);
}
</style>
