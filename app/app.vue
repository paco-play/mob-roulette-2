<script setup lang="ts">
const game = provideGame()
const { isMobile } = useViewport()

watchEffect(() => {
  game.mobile.value = isMobile.value
})
</script>

<template>
  <MobileStage v-if="isMobile" />
  <DesktopStage v-else />
</template>

<style>
@media (max-width: 980px) {
  body {
    overflow: auto;
  }
}
</style>
