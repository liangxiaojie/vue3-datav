<script setup lang="ts">
import { ref } from 'vue'
import { useAutoResize } from '../utils/autoResize'

const ready = ref(false)
const FullScreenContainer = ref<HTMLElement | null>(null)
const allWidth = window.screen.width

useAutoResize(FullScreenContainer, setAppScale, afterAutoResizeInit)

function afterAutoResizeInit() {
  const { width, height } = window.screen
  FullScreenContainer.value!.style.width = `${width}px`
  FullScreenContainer.value!.style.height = `${height}px`
  setAppScale()
  ready.value = true
}

function setAppScale() {
  const currentWidth = document.body.clientWidth
  FullScreenContainer.value!.style.transform = `scale(${currentWidth / allWidth})`
}
</script>

<template>
  <div class="dv-full-screen-container" ref="FullScreenContainer">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}
.dv-full-screen-container {
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
