import type { Colours } from "./colour"
import { createImage } from "./image"

export function createCanvas(image: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = image.width
  canvas.height = image.height
  canvas.getContext("2d")?.drawImage(image, 0, 0)
  return canvas
}

export async function createCanvasFromUrl(
  url: string
): Promise<HTMLCanvasElement> {
  const image = await createImage(url)
  return createCanvas(image)
}

export function getCanvasData(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
): Uint8ClampedArray | undefined {
  return canvas.getContext("2d")?.getImageData(0, 0, image.width, image.height)
    .data
}

export function getCanvasColours(data: Uint8ClampedArray): Colours {
  const colours: Colours = []

  for (let c = 0; c < data.length; c += 4) {
    colours.push(
      new Uint8ClampedArray([
        data[c + 0] ?? 0,
        data[c + 1] ?? 0,
        data[c + 2] ?? 0,
        data[c + 3] ?? 0,
      ])
    )
  }

  return colours
}
