import { ACCENT_FALLBACK } from './constants'

type RGB = [number, number, number]

function distance(a: RGB, b: RGB): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)
}

function toHex(v: number): string {
  return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
}

function rgbToHex([r, g, b]: RGB): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function extractDominantColor(image: HTMLImageElement, clusterCount = 4): string {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return ACCENT_FALLBACK

    ctx.drawImage(image, 0, 0, 10, 10)
    const data = ctx.getImageData(0, 0, 10, 10).data

    const points: RGB[] = []
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3]
      if (alpha < 120) continue
      points.push([data[i], data[i + 1], data[i + 2]])
    }

    if (points.length === 0) return ACCENT_FALLBACK

    const k = Math.min(clusterCount, points.length)
    let centroids: RGB[] = points.slice(0, k)
    let assignments = new Array<number>(points.length).fill(0)

    for (let iteration = 0; iteration < 10; iteration += 1) {
      for (let i = 0; i < points.length; i += 1) {
        let best = 0
        let bestDist = Number.POSITIVE_INFINITY
        for (let c = 0; c < centroids.length; c += 1) {
          const d = distance(points[i], centroids[c])
          if (d < bestDist) {
            bestDist = d
            best = c
          }
        }
        assignments[i] = best
      }

      const sums = Array.from({ length: k }, () => [0, 0, 0] as RGB)
      const counts = new Array<number>(k).fill(0)

      for (let i = 0; i < points.length; i += 1) {
        const group = assignments[i]
        sums[group][0] += points[i][0]
        sums[group][1] += points[i][1]
        sums[group][2] += points[i][2]
        counts[group] += 1
      }

      centroids = centroids.map((old, idx) => {
        if (counts[idx] === 0) return old
        return [
          sums[idx][0] / counts[idx],
          sums[idx][1] / counts[idx],
          sums[idx][2] / counts[idx],
        ]
      })
    }

    const clusterSizes = new Array<number>(k).fill(0)
    for (let i = 0; i < assignments.length; i += 1) {
      clusterSizes[assignments[i]] += 1
    }

    let dominant = 0
    for (let i = 1; i < clusterSizes.length; i += 1) {
      if (clusterSizes[i] > clusterSizes[dominant]) dominant = i
    }

    return rgbToHex(centroids[dominant])
  } catch {
    return ACCENT_FALLBACK
  }
}
