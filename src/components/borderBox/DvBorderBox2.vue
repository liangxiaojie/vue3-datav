<script setup lang="ts">
import { ref } from 'vue'
import { useAutoResize } from '../../utils/autoResize'

const props = defineProps<{
  colors?: Array<any>
  backgroundColor?: string
}>()

const defaultColor = ['#fff', 'rgba(255, 255, 255, 0.6)']
const boxRef = ref<HTMLElement | null>(null)
const mergedColor = Object.assign({}, defaultColor, props.colors)
const { width, height } = useAutoResize(boxRef)
</script>

<template>
  <div class="dv-border-box-2" ref="boxRef">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon
        :fill="props.backgroundColor || 'transparent'"
        :points="`
        7, 7 ${width - 7}, 7 ${width - 7}, ${height - 7} 7, ${height - 7}
      `"
      />

      <polyline :stroke="mergedColor[0]" :points="`2, 2 ${width - 2} ,2 ${width - 2}, ${height - 2} 2, ${height - 2} 2, 2`" />
      <polyline :stroke="mergedColor[1]" :points="`6, 6 ${width - 6}, 6 ${width - 6}, ${height - 6} 6, ${height - 6} 6, 6`" />
      <circle :fill="mergedColor[0]" cx="11" cy="11" r="1" />
      <circle :fill="mergedColor[0]" :cx="width - 11" cy="11" r="1" />
      <circle :fill="mergedColor[0]" :cx="width - 11" :cy="height - 11" r="1" />
      <circle :fill="mergedColor[0]" cx="11" :cy="height - 11" r="1" />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dv-border-box-2 {
  position: relative;
  width: 100%;
  height: 100%;
  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;

    & > polyline {
      fill: none;
      stroke-width: 1;
    }
  }
  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
