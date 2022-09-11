import { toWebFull } from "../eldarya_util"

export function getImageColour(image: HTMLImageElement): Colour | null {
  const data = getCanvasData(image)
  if (!data) return null

  let r = 0
  let g = 0
  let b = 0
  let w = 0

  for (let c = 0; c < data.length; c += 4) {
    const a = (data[c + 3] ?? 0) / 255
    r += (data[c] ?? 0) * a
    g += (data[c + 1] ?? 0) * a
    b += (data[c + 2] ?? 0) * a
    w += a
  }

  r = Math.round(r / w)
  g = Math.round(g / w)
  b = Math.round(b / w)

  return { red: r, green: g, blue: b, alpha: w / data.length / 4 }
}

export async function iconToWebFull(
  icon: HTMLImageElement
): Promise<HTMLImageElement> {
  return createImage(toWebFull(icon.src))
}

async function createImage(url: string): Promise<HTMLImageElement> {
  const image = document.createElement("img")
  image.src = url
  await new Promise(resolve => (image.onload = resolve))
  return image
}

function getCanvasData(image: HTMLImageElement): Uint8ClampedArray | undefined {
  const canvas = document.createElement("canvas")
  canvas.width = image.width
  canvas.height = image.height
  canvas.getContext("2d")?.drawImage(image, 0, 0)
  return canvas.getContext("2d")?.getImageData(0, 0, image.width, image.height)
    .data
}

interface Colour {
  red: number
  green: number
  blue: number
  alpha: number
}
