<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue'
import { deepMerge } from '../utils'
import { useAutoResize } from '../utils/autoResize'

const props = defineProps<{
  config?: Object
}>()

const ScrollRankingBoardRef = ref<HTMLElement | null>(null)

const defaultConfig = {
  /**
   * @description Board data
   * @type {Array<Object>}
   * @default data = []
   */
  data: [],
  /**
   * @description Row num
   * @type {Number}
   * @default rowNum = 5
   */
  rowNum: 5,
  /**
   * @description Scroll wait time
   * @type {Number}
   * @default waitTime = 2000
   */
  waitTime: 2000,
  /**
   * @description Carousel type
   * @type {String}
   * @default carousel = 'single'
   * @example carousel = 'single' | 'page'
   */
  carousel: 'single',
  /**
   * @description Value unit
   * @type {String}
   * @default unit = ''
   * @example unit = 'ton'
   */
  unit: '',
  /**
   * @description Auto sort by value
   * @type {Boolean}
   * @default sort = true
   */
  sort: true,
  /**
   * @description Value formatter
   * @type {Function}
   * @default valueFormatter = null
   */
  valueFormatter: null,
}

let mergedConfig = deepMerge(defaultConfig, props.config || {})
let rowsData: any[] = []
let rows = ref<any[]>([])
let heights = ref<any[]>([])
let animationIndex = 0
let animationHandler = 0
let updater = 0
let avgHeight = 0

function afterAutoResizeMixinInit() {
  calcData()
}
function onResize() {
  if (!mergedConfig) return

  calcHeights(true)
}
function calcData() {
  mergeConfig()

  calcRowsData()

  calcHeights()

  animation(true)
}
function mergeConfig() {
  mergedConfig = deepMerge(defaultConfig, props.config || {})
}
function calcRowsData() {
  let { data, rowNum, sort } = mergedConfig

  sort &&
    data.sort((d1: any, d2: any) => {
      const a: number = d1?.value
      const b: number = d2?.value
      if (a > b) return -1
      if (a < b) return 1
      if (a === b) return 0
    })

  const value = data.map((d: any) => d.value)

  const min = Math.min(...value) || 0

  // abs of min
  const minAbs = Math.abs(min)

  const max = Math.max(...value) || 0

  // abs of max
  const maxAbs = Math.abs(max)

  const total = max + minAbs

  data = data.map((row: any, i: any) => ({ ...row, ranking: i + 1, percent: ((row.value + minAbs) / total) * 100 }))

  const rowLength = data.length

  if (rowLength > rowNum && rowLength < 2 * rowNum) {
    data = [...data, ...data]
  }

  data = data.map((d: any, i: any) => ({ ...d, scroll: i }))

  rowsData = data
  rows.value = data
}
function calcHeights(onresize = false) {
  const { rowNum, data } = mergedConfig
  avgHeight = (ScrollRankingBoardRef.value?.clientHeight || 0) / rowNum
  if (!onresize) heights.value = new Array(data.length).fill(avgHeight)
}
async function animation(start = false) {
  const { waitTime, carousel, rowNum } = mergedConfig

  const rowLength = rowsData.length

  if (rowNum >= rowLength) return

  if (start) {
    await new Promise(resolve => setTimeout(resolve, waitTime))
    if (updater !== updater) return
  }

  const animationNum = carousel === 'single' ? 1 : rowNum

  let rows1 = rowsData.slice(animationIndex)
  rows1.push(...rowsData.slice(0, animationIndex))

  rows.value = rows1.slice(0, rowNum + animationNum)
  heights.value = new Array(rowLength).fill(avgHeight)

  await new Promise(resolve => setTimeout(resolve, 300))
  if (updater !== updater) return

  heights.value.splice(0, animationNum, ...new Array(animationNum).fill(0))

  animationIndex += animationNum

  const back = animationIndex - rowLength
  if (back >= 0) animationIndex = back

  animationHandler = setTimeout(animation, waitTime - 300)
}
function stopAnimation() {
  updater = (updater + 1) % 999999

  if (!animationHandler) return

  clearTimeout(animationHandler)
}

useAutoResize(ScrollRankingBoardRef, onResize, afterAutoResizeMixinInit)

watch(
  () => props.config,
  () => {
    stopAnimation()
    calcData()
  }
)
onUnmounted(() => {
  stopAnimation()
})
</script>

<template>
  <div class="dv-scroll-ranking-board" ref="ScrollRankingBoardRef">
    <div class="row-item" v-for="(item, i) in rows" :key="item.toString() + item.scroll" :style="`height: ${heights[i]}px;`">
      <div class="ranking-info">
        <div class="rank">No.{{ item.ranking }}</div>
        <div class="info-name" v-html="item.name" />
        <div class="ranking-value">{{ mergedConfig.valueFormatter ? mergedConfig.valueFormatter(item) : item.value + mergedConfig.unit }}</div>
      </div>

      <div class="ranking-column">
        <div class="inside-column" :style="`width: ${item.percent}%;`">
          <div class="shine" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$color: #1370fb;

.dv-scroll-ranking-board {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
  .row-item {
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .ranking-info {
    display: flex;
    width: 100%;
    font-size: 13px;
    .rank {
      width: 40px;
      color: $color;
    }
    .info-name {
      flex: 1;
    }
  }
  .ranking-column {
    border-bottom: 2px solid #1370fb50;
    margin-top: 5px;
    .inside-column {
      position: relative;
      height: 6px;
      background-color: $color;
      margin-bottom: 2px;
      border-radius: 1px;
      overflow: hidden;
    }
    .shine {
      position: absolute;
      left: 0%;
      top: 2px;
      height: 2px;
      width: 50px;
      transform: translateX(-100%);
      background: radial-gradient(rgb(40, 248, 255) 5%, transparent 80%);
      animation: shine 3s ease-in-out infinite alternate;
    }
  }
}

@keyframes shine {
  80% {
    left: 0%;
    transform: translateX(-100%);
  }
  100% {
    left: 100%;
    transform: translateX(0%);
  }
}
</style>
