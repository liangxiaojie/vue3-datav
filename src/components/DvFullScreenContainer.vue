<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { debounce, observerDomResize } from '../utils'

onMounted(() => {
  autoResizeInit()
})

onUnmounted(() => {
  unbindDomResizeCallback()
})

const ready = ref(false)
const FullScreenContainer = ref<HTMLElement | null>(null)
let dom: HTMLElement | null, width: number

async function autoResizeInit() {
  await initWH(false)
  bindDomResizeCallback()
  afterAutoResizeInit()
}

function initWH(resize = true) {
  return new Promise(resolve => {
    nextTick(() => {
      dom = FullScreenContainer.value
      width = dom ? dom.clientWidth : 0
      resize && setAppScale()
      resolve(1)
    })
  })
}

function afterAutoResizeInit() {
  const { width, height } = window.screen
  dom!.style.width = `${width}px`
  dom!.style.height = `${height}px`
  setAppScale()
  ready.value = true
}

function setAppScale() {
  const currentWidth = document.body.clientWidth
  dom!.style.transform = `scale(${currentWidth / width})`
}

let domObserver: MutationObserver | null, debounceInitWHFun: any

function bindDomResizeCallback() {
  debounceInitWHFun = debounce(initWH)
  domObserver = observerDomResize(dom!, debounceInitWHFun)
  window.addEventListener('resize', debounceInitWHFun)
}

function unbindDomResizeCallback() {
  if (!domObserver) return
  domObserver.disconnect()
  domObserver.takeRecords()
  domObserver = null
  window.removeEventListener('resize', debounceInitWHFun)
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
