<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
</script>

<template>
  <div class="dv-btn">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.dv-btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  color: #fff;
  font-size: 1.3rem;
  background-color: #050d23;
  border-radius: 0 0 6px 6px;
  border-bottom: 6px solid transparent;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to bottom, #061625, #037c8d);
    border-bottom-color: #00f7ff;
  }
}
</style>
