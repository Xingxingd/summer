<script setup lang="ts">
import MapleLeaf from '@/components/SVG/MapleLeaf.vue'
import { onMounted, ref } from 'vue'
import type { Pos } from '@/types/leaves'
import { generateLeaf } from '@/utils/drawLeaves'
const root = ref<HTMLDivElement>()
const fallSpeed = ref(3)
const leaves = ref<{ pos: Pos; color: string; depth: number }[]>([])

const enterWorld = () => {
  window.open('https://www.youtube.com/', '_blank')
}

onMounted(() => {
  const screenArea = root.value!.clientHeight
  const baseLeafCount = 200
  const baseFallSpeed = 2
  const leafCount = Math.floor(baseLeafCount * (screenArea / 7000))
  fallSpeed.value = baseFallSpeed * (screenArea / 2160)
  leaves.value = generateLeaf(root.value!, leafCount)
})
</script>

<template>
  <div class="root" ref="root">
    <div class="enter-world" @click="enterWorld">进入UNIBLUE的世界</div>
    <MapleLeaf
      v-for="leaf in leaves"
      :key="leaf.pos.x + '-' + leaf.pos.y"
      :color="leaf.color"
      :pos="leaf.pos"
      :depth="leaf.depth"
      :fall-speed="fallSpeed"
    ></MapleLeaf>
  </div>
</template>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #b87333, #f5deb3, #b87333);
  overflow: hidden;
  position: relative;
  perspective: 500px;
}
.enter-world {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: '楷体', KaiTi, serif;
  font-size: 48px;
  color: #8b4513;
  text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);
  font-weight: bold;
}
.enter-world:hover {
  cursor: pointer;
  font-size: 52px;
  color: #8b4553;
}
</style>
