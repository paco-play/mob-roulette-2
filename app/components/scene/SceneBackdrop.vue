<script setup lang="ts">
defineProps<{ now: number; lunch: string }>()
defineEmits<{ knock: [] }>()
</script>

<template>
  <div class="backdrop">
    <OfficeCeiling />
    <BackDesks />

    <div class="window"><WindowView @knock="$emit('knock')" /></div>
    <div class="window second"><WindowView @knock="$emit('knock')" /></div>
    <div class="board"><WhiteBoard /></div>
    <div class="clock"><WallClock :now="now" :lunch="lunch" /></div>

    <div class="shelf">
      <svg class="books" viewBox="0 0 150 70" aria-hidden="true">
        <rect x="4" y="12" width="14" height="56" />
        <rect x="20" y="22" width="12" height="46" />
        <rect x="34" y="8" width="16" height="60" />
        <path d="M58 68 L70 14 L84 18 L72 68 Z" />
        <rect x="88" y="26" width="16" height="42" />
        <path class="mug" d="M112 44 H134 V66 Q134 68 132 68 H114 Q112 68 112 66 Z M134 50 Q144 50 142 58 Q140 62 134 62" />
        <path class="steam" d="M118 38 q-3 -6 0 -10 M126 38 q-3 -6 0 -10" />
      </svg>
      <span class="plank" />
    </div>

    <div class="poster scribble" aria-hidden="true">
      <span>burger</span>
      <span class="eq">ou</span>
      <span>ramen</span>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.window,
.board,
.clock,
.shelf {
  position: absolute;
  pointer-events: auto;
  animation: appear 0.9s var(--ease-out) both;
}

.window {
  left: 2%;
  top: 9%;
  width: clamp(110px, 10vw, 170px);
  animation-delay: 0.2s;
}

.window.second {
  left: calc(2% + clamp(110px, 10vw, 170px) + 14px);
  animation-delay: 0.3s;
}

.board {
  right: 10.5%;
  top: 15%;
  width: clamp(190px, 19.5vw, 340px);
  animation-delay: 0.4s;
}

.clock {
  right: 3%;
  top: 8%;
  width: clamp(60px, 5.6vw, 90px);
  animation-delay: 0.5s;
}

.shelf {
  right: 2%;
  top: 49%;
  padding: 0 8px;
  animation-delay: 0.6s;
}

.plank {
  position: absolute;
  left: -6px;
  right: -6px;
  bottom: -9px;
  height: 9px;
  background: var(--forest);
  box-shadow: 3px 4px 0 rgb(38 57 44 / 0.18);
}

.books {
  display: block;
  width: 118px;
}

.books rect,
.books path:not(.steam) {
  fill: var(--sage);
  stroke: var(--forest);
  stroke-width: 2.4;
  stroke-linejoin: round;
}

.books rect:nth-child(2),
.books rect:nth-child(5),
.books .mug {
  fill: var(--paper-2);
}

.books rect:nth-child(3) {
  fill: var(--sage-2);
}

.steam {
  fill: none;
  stroke: var(--forest);
  stroke-width: 2;
  stroke-linecap: round;
  opacity: 0.4;
}

.poster {
  position: absolute;
  left: 3%;
  top: 40%;
  display: grid;
  gap: 2px;
  padding: 8px 12px;
  border: 1.5px solid var(--forest);
  background: var(--paper-2);
  font-size: 12px;
  text-align: center;
  transform: rotate(-3deg);
  box-shadow: 3px 3px 0 var(--sage-2);
  animation: appear 0.9s var(--ease-out) 0.7s both;
}

.eq {
  color: var(--accent);
  font-size: 14px;
  line-height: 1;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
}

@media (max-width: 1280px) {
  .window.second,
  .shelf,
  .poster {
    display: none;
  }
}
</style>
