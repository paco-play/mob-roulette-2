<script setup lang="ts">
export interface Banner {
  key: number
  name: string
  avatarId: string
  color: string
}

defineProps<{ banner: Banner | null }>()
</script>

<template>
  <Transition name="banner">
    <div v-if="banner" :key="banner.key" class="banner" role="status">
      <span class="face" :style="{ background: banner.color }"><PixelAvatar :avatar-id="banner.avatarId" /></span>
      <span class="text">
        <span class="kicker">au clavier</span>
        <span class="name">{{ banner.name }}</span>
      </span>
    </div>
  </Transition>
</template>

<style scoped>
.banner {
  position: absolute;
  left: 50%;
  top: calc(var(--wheel, 500px) / 2);
  z-index: 6;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 26px 10px 12px;
  border: 2.5px solid var(--forest);
  background: var(--paper-2);
  box-shadow: 6px 6px 0 var(--sage);
  transform: translate(-50%, -50%) rotate(-3deg);
  pointer-events: none;
}

.face {
  width: 56px;
  height: 56px;
  padding: 8px;
  border: 2px solid var(--forest);
  border-radius: 50%;
  overflow: hidden;
}

.text {
  display: grid;
}

.kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.name {
  font-weight: 700;
  font-size: clamp(30px, 3.4vw, 48px);
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--forest);
}

.banner-enter-active {
  transition:
    transform 0.6s var(--ease-spring),
    opacity 0.2s;
}

.banner-leave-active {
  transition:
    transform 0.4s ease-in,
    opacity 0.4s;
}

.banner-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) rotate(-3deg) scale(0.3);
}

.banner-leave-to {
  opacity: 0;
  transform: translate(-50%, -80%) rotate(-3deg) scale(0.9);
}
</style>
