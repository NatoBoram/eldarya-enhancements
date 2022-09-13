import type { Colours } from "./colour"

export function medianCut(colours: Colours): [Colours, Colours] | undefined {
  const index = findMaxRangeIndex(colours)
  if (index === undefined) return

  const first = sortByIndex(colours, index)
  const median = Math.round(first.length / 2)
  const second = first.splice(median)

  return [first, second]
}

function sortByIndex(colours: Colours, index: number): Colours {
  return colours.sort((a, b) => (a[index] ?? 0) - (b[index] ?? 0))
}

function findMaxRangeIndex(colours: Colours): number | undefined {
  let minRed = (colours[0] ?? [])[0] ?? 0
  let maxRed = (colours[0] ?? [])[0] ?? 0
  let minGreen = (colours[1] ?? [])[0] ?? 0
  let maxGreen = (colours[1] ?? [])[0] ?? 0
  let minBlue = (colours[2] ?? [])[0] ?? 0
  let maxBlue = (colours[2] ?? [])[0] ?? 0

  for (const colour of colours) {
    minRed = Math.min(minRed, colour[0] ?? 0)
    maxRed = Math.max(maxRed, colour[0] ?? 0)
    minGreen = Math.min(minGreen, colour[1] ?? 0)
    maxGreen = Math.max(maxGreen, colour[1] ?? 0)
    minBlue = Math.min(minBlue, colour[2] ?? 0)
    maxBlue = Math.max(maxBlue, colour[2] ?? 0)
  }

  const redRange = maxRed - minRed
  const greenRange = maxGreen - minGreen
  const blueRange = maxBlue - minBlue

  const ranges = [
    { index: 0, range: redRange },
    { index: 1, range: greenRange },
    { index: 2, range: blueRange },
  ]

  const maxRange = Math.max(redRange, greenRange, blueRange)
  const maximumRanges = ranges.filter(range => range.range === maxRange)

  return maximumRanges[Math.floor(Math.random() * maximumRanges.length)]?.index
}
