<script setup lang="ts">
import { ref } from 'vue'
import { useAutoResize } from '../../utils/autoResize'

const props = defineProps<{
  colors?: Array<any>
  backgroundColor?: string
}>()

const defaultColor = ['#2862b7', '#2862b7']
const boxRef = ref<HTMLElement | null>(null)
const mergedColor = Object.assign({}, defaultColor, props.colors)
const { width, height } = useAutoResize(boxRef)
</script>

<template>
  <div class="dv-border-box-3" ref="boxRef">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <polygon :fill="props.backgroundColor || 'transparent'" :points="`23, 23 ${width - 24}, 23 ${width - 24}, ${height - 24} 23, ${height - 24}`" />

      <polyline class="dv-bb3-line1" :stroke="mergedColor[0]" :points="`4, 4 ${width - 22} ,4 ${width - 22}, ${height - 22} 4, ${height - 22} 4, 4`" />
      <polyline class="dv-bb3-line2" :stroke="mergedColor[1]" :points="`10, 10 ${width - 16}, 10 ${width - 16}, ${height - 16} 10, ${height - 16} 10, 10`" />
      <polyline class="dv-bb3-line2" :stroke="mergedColor[1]" :points="`16, 16 ${width - 10}, 16 ${width - 10}, ${height - 10} 16, ${height - 10} 16, 16`" />
      <polyline class="dv-bb3-line2" :stroke="mergedColor[1]" :points="`22, 22 ${width - 4}, 22 ${width - 4}, ${height - 4} 22, ${height - 4} 22, 22`" />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dv-border-box-3 {
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
    }
  }
  .dv-bb3-line1 {
    stroke-width: 3;
  }
  .dv-bb3-line2 {
    stroke-width: 1;
  }
  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
