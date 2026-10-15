<script setup lang="ts">
const game = useGame()
const { panda, wheel } = game

const wheelRef = ref<{ $el: HTMLElement } | null>(null)
const pandaRef = ref<HTMLElement | null>(null)
const wheelEl = computed(() => wheelRef.value?.$el ?? null)
const sceneRef = ref<HTMLElement | null>(null)
const noFloor = ref<HTMLElement | null>(null)

useStageAnchors({ scene: sceneRef, wheel: wheelEl, panda: pandaRef, floor: noFloor }, game.setAnchors)
</script>

<template>
  <div class="mobile" :class="{ disco: game.disco.value }">
    <header class="bar">
      <BrandLogo @click="game.clickLogo" />
      <SoundToggle :on="game.settings.value.sound" @toggle="game.toggleSound" />
    </header>

    <section ref="sceneRef" class="scene">
      <div ref="pandaRef" class="buddy">
        <div class="mini"><RedPanda :mood="panda.mood.value" @poke="game.pokePanda" /></div>
        <SpeechBubble class="talk" :speech="panda.speech.value" />
      </div>

      <div class="wheel-wrap">
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
      </div>
    </section>

    <section class="panel-wrap"><SidePanel /></section>

    <ConfettiLayer :bursts="game.confetti.bursts.value" />
    <DiscoLights :active="game.disco.value" />
  </div>
</template>

<style scoped>
.mobile {
  --wheel: min(88vw, 46dvh, 420px);
  position: relative;
  z-index: 1;
  display: grid;
  gap: 18px;
  min-height: 100dvh;
  padding: 14px 16px 40px;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.scene {
  display: grid;
  justify-items: center;
  gap: 8px;
}

.buddy {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  width: 100%;
  height: 128px;
}

.mini {
  flex: none;
  width: 72px;
}

.talk {
  position: absolute;
  left: 84px;
  bottom: 44px;
}


.wheel-wrap {
  position: relative;
  padding-top: 24px;
}

.panel-wrap {
  padding-top: 28px;
  padding-right: 9px;
}

.panel-wrap :deep(.panel) {
  margin-bottom: 9px;
}
</style>
