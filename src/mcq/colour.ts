import { createCanvas, getCanvasColours } from "./canvas"
import { createImage } from "./image"

export type Colours = Uint8ClampedArray[]
export type Colour = Uint8ClampedArray

export async function getColoursFromUrl(
  url: string
): Promise<Colours | undefined> {
  const image = await createImage(url)
  const canvas = createCanvas(image)
  return getCanvasColours(canvas, image)
}

export function getAverageColour(colours: Colours): Colour {
  let red = 0
  let green = 0
  let blue = 0
  let alpha = 0

  let weights = 0
  for (const colour of colours) {
    const weight = (colour[3] ?? 0) / 255

    red += (colour[0] ?? 0) * weight
    green += (colour[1] ?? 0) * weight
    blue += (colour[2] ?? 0) * weight
    alpha += (colour[3] ?? 0) * weight

    weights += weight
  }

  return new Uint8ClampedArray([
    Math.round(red / weights),
    Math.round(green / weights),
    Math.round(blue / weights),
    Math.round(alpha / weights),
  ])
}

export function removeTransparentColours(colours: Colours): Colours {
  return colours.filter(colour => (colour[3] ?? 0) > 0)
}
