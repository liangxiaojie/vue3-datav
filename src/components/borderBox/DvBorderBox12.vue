<script setup lang="ts">
import { ref } from 'vue'
import { useAutoResize } from '../../utils/autoResize'
import { uuid } from '../../utils'
import { fade } from '../../utils/color'

const props = defineProps<{
  colors?: Array<any>
  dur?: Number
  backgroundColor?: string
}>()

const defaultColor = ['#2e6099', '#7ce7fd']
const boxRef = ref<HTMLElement | null>(null)
const mergedColor = Object.assign({}, defaultColor, props.colors)
const { width, height } = useAutoResize(boxRef)

const id = uuid()
const filterId = `border-box-12-filterId-${id}`
</script>

<template>
  <div class="dv-border-box-12" ref="boxRef">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <defs>
        <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
          <feFlood :flood-color="fade(mergedColor[1] || defaultColor[1], 70) || undefined" result="glowColor">
            <animate
              attributeName="flood-color"
              :values="`${fade(mergedColor[1] || defaultColor[1], 70)};${fade(mergedColor[1] || defaultColor[1], 30)};${fade(mergedColor[1] || defaultColor[1], 70)};`"
              dur="3s"
              begin="0s"
              repeatCount="indefinite"
            />
          </feFlood>
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        v-if="width && height"
        :fill="props.backgroundColor || 'transparent'"
        stroke-width="2"
        :stroke="mergedColor[0]"
        :d="`
          M15 5 L ${width - 15} 5 Q ${width - 5} 5, ${width - 5} 15
          L ${width - 5} ${height - 15} Q ${width - 5} ${height - 5}, ${width - 15} ${height - 5}
          L 15, ${height - 5} Q 5 ${height - 5} 5 ${height - 15} L 5 15
          Q 5 5 15 5
        `"
      />

      <path stroke-width="2" fill="transparent" stroke-linecap="round" :filter="`url(#${filterId})`" :stroke="mergedColor[1]" :d="`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`" />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="mergedColor[1]"
        :d="`M ${width - 20} 5 L ${width - 15} 5 Q ${width - 5} 5 ${width - 5} 15 L ${width - 5} 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="mergedColor[1]"
        :d="`
          M ${width - 20} ${height - 5} L ${width - 15} ${height - 5}
          Q ${width - 5} ${height - 5} ${width - 5} ${height - 15}
          L ${width - 5} ${height - 20}
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="mergedColor[1]"
        :d="`
          M 20 ${height - 5} L 15 ${height - 5}
          Q 5 ${height - 5} 5 ${height - 15}
          L 5 ${height - 20}
        `"
      />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dv-border-box-12 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
