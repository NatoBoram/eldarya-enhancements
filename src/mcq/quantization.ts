import { createCanvas, getCanvasColours } from "./canvas"
import type { Colours } from "./colour"
import {
  getAverageColour,
  getColoursFromUrl,
  removeTransparentColours,
} from "./colour"
import { medianCut } from "./median_cut"

/**
 * Performs color quantization on a list of colours using median cuts into
 * averages. Before proceeding, the fully transparent colours are removed.
 * @param colours The colours to quantize
 * @param passes The number of passes to perform on these colours. Each pass
 * *doubles* the amount of colours returned. Setting it to `0` just returns the
 * average colour.
 * @returns A colour palette generated from a list of colours.
 */
export function quantize(colours: Colours, passes = 0): Colours {
  if (passes < 0) passes = 0

  let groups: Colours[] = [removeTransparentColours(colours)]
  for (let c = 1; c <= passes; c++) {
    groups = groups.map(group => medianCut(group) ?? []).flat()
  }

  return groups.map(group => getAverageColour(group))
}

/**
 * Performs color quantization on an image using median cuts into averages.
 * Before proceeding, the fully transparent colours are removed.
 * @param url Image to extract a palette from
 * @param passes The number of passes to perform on this image. Each pass
 * *doubles* the amount of colours returned. Setting it to `0` just returns the
 * average colour.
 * @returns A colour palette generated from the given image URL.
 */
export async function quantizeUrl(
  url: string,
  passes = 0
): Promise<Colours | undefined> {
  const colours = await getColoursFromUrl(url)
  if (!colours) return

  return quantize(colours, passes)
}

/**
 * Performs color quantization on an image using median cuts into averages.
 * Before proceeding, the fully transparent colours are removed.
 * @param image Image to extract a palette from
 * @param passes The number of passes to perform on this image. Each pass
 * *doubles* the amount of colours returned. Setting it to `0` just returns the
 * average colour.
 * @returns A colour palette generated from the given image.
 */
export function quantizeImage(
  image: HTMLImageElement,
  passes = 0
): Colours | undefined {
  const canvas = createCanvas(image)
  const colours = getCanvasColours(canvas, image)
  if (!colours) return

  return quantize(colours, passes)
}
