<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAutoResize } from '../../utils/autoResize'
import { uuid } from '../../utils'

const props = defineProps<{
  colors?: Array<any>
  dur?: Number
  reverse?: boolean
  backgroundColor?: string
}>()

const defaultColor = ['#235fa7', '#4fd2dd']
const boxRef = ref<HTMLElement | null>(null)
const mergedColor = Object.assign({}, defaultColor, props.colors)
const { width, height } = useAutoResize(boxRef)

const id = uuid()
const path = `border-box-8-path-${id}`
const gradient = `border-box-8-gradient-${id}`
const mask = `border-box-8-mask-${id}`
const length = computed(() => (width.value + height.value - 5) * 2)
const pathD = computed(() => {
  if (props.reverse) return `M 2.5, 2.5 L 2.5, ${height.value - 2.5} L ${width.value - 2.5}, ${height.value - 2.5} L ${width.value - 2.5}, 2.5 L 2.5, 2.5`
  return `M2.5, 2.5 L${width.value - 2.5}, 2.5 L${width.value - 2.5}, ${height.value - 2.5} L2.5, ${height.value - 2.5} L2.5, 2.5`
})
</script>

<template>
  <div class="dv-border-box-8" ref="boxRef">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <path :id="path" :d="pathD" fill="transparent" />
        <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
            <animateMotion :dur="`${dur || 3}s`" :path="pathD" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>

      <polygon :fill="props.backgroundColor || 'transparent'" :points="`5, 5 ${width - 5}, 5 ${width - 5} ${height - 5} 5, ${height - 5}`" />

      <use :stroke="mergedColor[0]" stroke-width="1" :xlink:href="`#${path}`" />

      <use :stroke="mergedColor[1]" stroke-width="3" :xlink:href="`#${path}`" :mask="`url(#${mask})`">
        <animate attributeName="stroke-dasharray" :from="`0, ${length}`" :to="`${length}, 0`" :dur="`${dur || 3}s`" repeatCount="indefinite" />
      </use>
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dv-border-box-8 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
