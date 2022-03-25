<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

function getNowTime() {
  const myDate = new Date()
  const y = myDate.getFullYear()
  const M = myDate.getMonth() + 1
  const d = myDate.getDate()
  const h = myDate.getHours()
  const m = myDate.getMinutes()
  const s = myDate.getSeconds()
  const w = myDate.getDay()
  return `${y}-${check(M)}-${check(d)} ${check(h)}:${check(m)}:${check(s)} ${week[w]}`
}

// 时间数字小于10，则在之前加个“0”补位
function check(i: number) {
  return i < 10 ? '0' + i : i
}

let timeInterval: any
const nowTime = ref('')

onMounted(() => {
  nowTime.value = getNowTime()
  timeInterval = setInterval(() => {
    nowTime.value = getNowTime()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})
</script>

<template>
  <div class="dv-timer">{{ nowTime }}</div>
</template>

<style scoped>
.dv-timer {
  display: inline-block;
  padding: 0 5px;
  height: 64px;
  line-height: 64px;
  color: #ffffff;
  font-size: 1.3rem;
}
</style>
