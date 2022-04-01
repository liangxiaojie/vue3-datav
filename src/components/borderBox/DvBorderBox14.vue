<script setup lang="ts">
import { ref } from 'vue'
import { useAutoResize } from '../../utils/autoResize'

const props = defineProps<{
  colors?: Array<any>
  backgroundColor?: string
}>()

const defaultColor = ['#1a3f72', '#00f7ff']
const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom']
const boxRef = ref<HTMLElement | null>(null)
const mergedColor = Object.assign({}, defaultColor, props.colors)
const { width, height } = useAutoResize(boxRef)
</script>

<template>
  <div class="dv-border-box-14" ref="boxRef" :style="`border: 2px solid ${mergedColor[0]}`">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon :fill="props.backgroundColor || 'transparent'" :points="`4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height} 4, ${height} 0, ${height - 4} 0, 4`" />
    </svg>

    <svg width="25px" height="25px" :key="item" v-for="item in border" :class="`${item} dv-border-svg-container`">
      <polygon :fill="mergedColor[1]" points="25, 0 0, 0 0, 25 3, 25 3, 3 3, 3 25, 3" />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dv-border-box-14 {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .dv-border-svg-container {
    position: absolute;
    display: block;
  }
  .left-top {
    top: -2px;
    left: -2px;
  }
  .right-top {
    top: -2px;
    right: -2px;
    transform: rotateY(180deg);
  }
  .left-bottom {
    bottom: -2px;
    left: -2px;
    transform: rotateX(180deg);
  }
  .right-bottom {
    right: -2px;
    bottom: -2px;
    transform: rotateX(180deg) rotateY(180deg);
  }
  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
