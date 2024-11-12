<script setup lang="ts">
import MapleLeaf from '@/components/SVG/MapleLeaf.vue'
import { onMounted, ref } from 'vue'
import type { Pos } from '@/types/leaves'
const root = ref<HTMLDivElement>()
const fallSpeed = ref(3)
const leaves = ref<{ pos: Pos; color: string; size: number }[]>([])

const randomSize = (n: number) => {
  const sizes = Array.from({ length: n }, () => Math.random() * 200)
  return sizes
}

const randomPos = (n: number, maxWidth: number, maxHeight: number): Pos[] => {
  const pos: Pos[] = []
  for (let i = 0; i < n; i++) {
    pos.push({
      x: Math.random() * (root.value!.clientWidth - maxWidth),
      y: Math.random() * (root.value!.clientHeight - maxHeight),
    })
  }
  return pos
}

const randomColor = (n: number) => {
  const colors = Array.from({ length: n }, () => {
    const colors = ['#e74c3c', '#c0392b', '#d35400', '#e67e22', '#f39c12', '#f1c40f']
    return colors[Math.floor(Math.random() * colors.length)]
  })
  return colors
}

const generateLeaf = (n: number) => {
  const sizes = randomSize(n)
  const maxSize = Math.max(...sizes)
  const pos = randomPos(n, maxSize, maxSize)
  const colors = randomColor(n)
  return pos.map((p, i) => {
    return {
      pos: p,
      size: sizes[i],
      color: colors[i],
    }
  })
}

onMounted(() => {
  const screenArea = root.value!.clientHeight
  const baseLeafCount = 200
  const baseFallSpeed = 2
  const leafCount = Math.floor(baseLeafCount * (screenArea / 7000))
  fallSpeed.value = baseFallSpeed * (screenArea / 2160)
  leaves.value = generateLeaf(leafCount)
})
</script>

<template>
  <div class="root" ref="root">
    <div class="hello-world">Hello 钟老师!</div>
    <MapleLeaf
      v-for="leaf in leaves"
      :key="leaf.pos.x + '-' + leaf.pos.y"
      :color="leaf.color"
      :pos="leaf.pos"
      :size="leaf.size"
      :fall-speed="fallSpeed"
    ></MapleLeaf>
  </div>
</template>

<style scoped lang="less">
.root {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #b87333, #f5deb3, #b87333);
  overflow: hidden;
  position: relative;
  .hello-world {
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
}
</style>
