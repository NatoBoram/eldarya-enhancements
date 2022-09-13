import type { Colours } from "./colour"

export function createCanvas(image: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = image.width
  canvas.height = image.height
  canvas.getContext("2d")?.drawImage(image, 0, 0)
  return canvas
}

export function getCanvasData(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
): Uint8ClampedArray | undefined {
  return canvas.getContext("2d")?.getImageData(0, 0, image.width, image.height)
    .data
}

export function getCanvasColours(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
): Colours | undefined {
  const data = getCanvasData(canvas, image)
  if (!data) return

  return getColoursFromData(data)
}

export function getColoursFromData(data: Uint8ClampedArray): Colours {
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
