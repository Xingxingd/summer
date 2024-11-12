import type { Pos } from '@/types/leaves'

const randomDepth = (n: number) => {
  const depths = Array.from({ length: n }, () => -Math.abs(Math.random() * 1000))
  return depths
}

const randomPos = (
  container: HTMLDivElement,
  n: number,
  maxWidth: number,
  maxHeight: number,
): Pos[] => {
  const pos: Pos[] = []
  for (let i = 0; i < n; i++) {
    pos.push({
      x: Math.random() * (container.clientWidth - maxWidth),
      y: Math.random() * (container.clientHeight - maxHeight),
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

export const generateLeaf = (container: HTMLDivElement, n: number) => {
  const depths = randomDepth(n)
  const maxDepth = Math.max(...depths)
  const pos = randomPos(container, n, maxDepth, maxDepth)
  const colors = randomColor(n)
  return pos.map((p, i) => {
    return {
      pos: p,
      depth: depths[i],
      color: colors[i],
    }
  })
}
