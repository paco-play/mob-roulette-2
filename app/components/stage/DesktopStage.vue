<script setup lang="ts">
const game = useGame()
const { panda, wheel, settings } = game

const sceneRef = ref<HTMLElement | null>(null)
const floorRef = ref<HTMLElement | null>(null)
const pandaRef = ref<HTMLElement | null>(null)
const wheelRef = ref<{ $el: HTMLElement } | null>(null)
const wheelEl = computed(() => wheelRef.value?.$el ?? null)

useStageAnchors({ scene: sceneRef, wheel: wheelEl, panda: pandaRef, floor: floorRef }, game.setAnchors)
</script>

<template>
  <div class="app">
    <header class="topbar">
      <BrandLogo @click="game.clickLogo" />
      <CoordsReadout />
      <p class="scribble tagline">the original roulette</p>
      <SoundToggle :on="settings.sound" @toggle="game.toggleSound" />
    </header>

    <main class="stage">
      <section ref="sceneRef" class="scene">
        <SceneBackdrop :now="game.now.value" :lunch="settings.lunch" @knock="game.events.runRandom" />

        <!-- Drawn after the back desks and before the wheel, so it stands in front of one and behind the other -->
        <div class="big-plant"><DecorPlant /></div>

        <div class="arena">
          <div class="wheel-zone">
            <RouletteWheel
              ref="wheelRef"
              :segments="game.shownSegments.value"
              :angle="wheel.angle.value"
              :spinning="wheel.spinning.value"
              :speed="wheel.speed.value"
              :tick="wheel.tickCount.value"
              :winner-id="game.winnerId.value"
              :win-count="game.winCount.value"
              :disco="game.disco.value"
              @spin="game.spin"
            />
            <WinnerBanner :banner="game.banner.value" />
            <WheelStand />
          </div>

          <div ref="pandaRef" class="panda-zone">
            <div class="bubble-slot"><SpeechBubble :speech="panda.speech.value" /></div>
            <RedPanda :mood="panda.mood.value" @poke="game.pokePanda" />
            <ScribbleNote class="poke-note" text="barre espace pour tourner" arrow="left" :tilt="3" />
          </div>
        </div>
      </section>

      <aside class="side"><SidePanel /></aside>
    </main>

    <div ref="floorRef" class="floor-wrap">
      <FloorStrip :plants="game.plantViews.value" :tank="game.garden.garden.value.tank" :capacity="TANK_CAPACITY" @water="game.waterPlant" />
    </div>

    <EventLayer :event="game.events.active.value" :anchors="game.anchors.value" />
    <ConfettiLayer :bursts="game.confetti.bursts.value" />
    <DiscoLights :active="game.disco.value" />
  </div>
</template>

<style scoped>
.app {
  --scene-h: calc(100dvh - var(--topbar-h) - var(--floor-h) - 26px);
  --wheel-reserve: clamp(40px, 9vw, 190px);
  --arena-pad: calc(var(--wheel-reserve) * 0.4);
  --wheel: clamp(300px, min(calc(var(--scene-h) - 36px), calc(100vw - var(--board-w) - 64px - 32px - 340px - var(--wheel-reserve))), 720px);
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: var(--topbar-h) minmax(0, 1fr) var(--floor-h);
  height: 100dvh;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 0 32px;
}

.tagline {
  margin: 0 0 0 auto;
  font-size: 13px;
  transform: rotate(-1.5deg);
  animation: write 1.2s steps(30) 0.8s both;
}

.stage {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--board-w);
  gap: 32px;
  min-height: 0;
  padding: 26px 32px 0;
}

.scene {
  position: relative;
  /* Above the team panel, so the panda's speech bubble can overlap it */
  z-index: 3;
  min-height: 0;
}

/* Feet of the wheel stand and of the panda land on the floor line, which sits inside the floor strip. */
.big-plant {
  position: absolute;
  left: 30px;
  bottom: calc(-1 * var(--floor-line) + 4px);
  width: clamp(170px, 15vw, 260px);
}

.arena {
  position: absolute;
  inset: 0;
  bottom: calc(-1 * var(--floor-line));
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: clamp(24px, 4vw, 64px);
  /* Leaves room on the left for the big plant and the windows */
  padding-left: var(--arena-pad);
}

.wheel-zone {
  position: relative;
  flex: none;
  width: var(--wheel);
}

.panda-zone {
  position: relative;
  flex: none;
  width: clamp(160px, 14vw, 220px);
  margin-bottom: 2px;
  animation: hop-in 1s var(--ease-spring) 0.9s both;
}

.bubble-slot {
  position: absolute;
  left: -6%;
  bottom: calc(100% - 14px);
  z-index: 5;
}

.poke-note {
  position: absolute;
  /* Anchored on the right so the text grows toward the wheel, never under the team panel */
  right: 12%;
  bottom: 104%;
  z-index: 1;
  max-width: 210px;
  white-space: normal;
  line-height: 1.25;
}

.side {
  position: relative;
  display: flex;
  min-height: 0;
  /* Pulled up by the stage padding so the panel's top edge sits level with the ceiling beam */
  margin-top: -26px;
  padding-bottom: 16px;
}

.side > :deep(.panel) {
  flex: 1;
}

.floor-wrap {
  position: relative;
  z-index: 1;
}

@keyframes write {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes hop-in {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.8);
  }
}
</style>
