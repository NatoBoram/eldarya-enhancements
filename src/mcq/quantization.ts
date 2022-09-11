import type { Colours } from "./colour"
import { getAverageColour } from "./colour"
import { medianCut } from "./median_cut"

/**
 * Performs color quantization on a list of colours using median cuts into averages.
 * @param colours The colours to quantize
 * @param passes The number of passes to perform on these colours. Each pass will double the amount of colours returned.
 * @returns A colour palette generated from a list of colours.
 */
export function quantize(colours: Colours, passes: number): Colours {
  let groups: Colours[] = [colours]
  for (let c = 1; c <= passes; c++) {
    groups = groups.map(group => medianCut(group) ?? []).flat()
  }

  return groups.map(group => getAverageColour(group))
}
