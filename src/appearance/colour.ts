import { translate } from "../i18n/translate"
import { HSL } from "./hsl"
import type { RGBA } from "./rgba"

export class Colour {
  private static readonly black360 = new Colour(
    "#000000",
    translate.colour.black,
    360
  )
  private static readonly grey360 = new Colour(
    "#808080",
    translate.colour.grey,
    360
  )
  private static readonly red360 = new Colour(
    "#FF0000",
    translate.colour.red,
    360
  )
  private static readonly white360 = new Colour(
    "#FFFFFF",
    translate.colour.white,
    360
  )

  static readonly black = new Colour("#000000", translate.colour.black)
  static readonly blue = new Colour("#0000FF", translate.colour.blue)
  static readonly brown = new Colour("#804000", translate.colour.brown)
  static readonly cyan = new Colour("#00FFFF", translate.colour.cyan)
  static readonly green = new Colour("#00FF00", translate.colour.green)
  static readonly grey = new Colour("#808080", translate.colour.grey)
  static readonly magenta = new Colour("#FF00FF", translate.colour.magenta)
  static readonly orange = new Colour("#FF8000", translate.colour.orange)
  static readonly red = new Colour("#FF0000", translate.colour.red)
  static readonly rose = new Colour("#FF0080", translate.colour.rose)
  static readonly violet = new Colour("#8000FF", translate.colour.violet)
  static readonly white = new Colour("#FFFFFF", translate.colour.white)
  static readonly yellow = new Colour("#FFFF00", translate.colour.yellow)

  private static readonly list = [
    Colour.black,
    Colour.black360,
    Colour.blue,
    Colour.brown,
    Colour.cyan,
    Colour.green,
    Colour.grey,
    Colour.grey360,
    Colour.magenta,
    Colour.orange,
    Colour.red,
    Colour.red360,
    Colour.rose,
    Colour.violet,
    Colour.white,
    Colour.white360,
    Colour.yellow,
  ]

  readonly hsl: HSL
  readonly rgba: RGBA

  private constructor(
    public readonly hexadecimal: string,
    public readonly name: string,
    hue?: number
  ) {
    this.rgba = toRgba(hexadecimal)
    const hsl = rgbaToHsl(this.rgba)
    this.hsl = hue ? { ...hsl, hue } : hsl
  }

  static findClosestHsl(hsl: HSL): Colour {
    return Colour.getList()
      .sort((a, b) => hslDistance(a.hsl, hsl) - hslDistance(b.hsl, hsl))
      .find(Boolean)!
  }

  static findClosestRgb(rgba: RGBA): Colour {
    return Colour.getList()
      .sort((a, b) => rgbDistance(a.rgba, rgba) - rgbDistance(b.rgba, rgba))
      .find(Boolean)!
  }

  static getList(): Colour[] {
    return [...Colour.list]
  }
}

export function toHex(argb: RGBA): string {
  return `#${[argb.red, argb.green, argb.blue, argb.alpha]
    .map(c => c.toString(16))
    .join("")}`
}

export function toRgba(hex: string): RGBA {
  if (hex.startsWith("#")) hex = hex.slice(1).trim()
  if (hex.length === 6 || hex.length === 8)
    return {
      red: parseInt(hex.slice(0, 2), 16),
      green: parseInt(hex.slice(2, 4), 16),
      blue: parseInt(hex.slice(4, 6), 16),
      alpha: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) : 255,
    }
  throw new Error(`Unexpected hex colour: ${hex}`)
}

/** Calculates the Euclidean distance between two colours within the RGB colour
 * space.
 * @see https://en.wikipedia.org/wiki/Color_difference
 */
export function rgbDistance(first: RGBA, second: RGBA): number {
  if ((first.red + second.red) / 2 < 128) {
    return Math.sqrt(
      2 * Math.pow(first.red - second.red, 2) +
        4 * Math.pow(first.green - second.green, 2) +
        3 * Math.pow(first.blue - second.blue, 2)
    )
  } else {
    return Math.sqrt(
      3 * Math.pow(first.red - second.red, 2) +
        4 * Math.pow(first.green - second.green, 2) +
        2 * Math.pow(first.blue - second.blue, 2)
    )
  }
}

function hslDistance(first: HSL, second: HSL) {
  return (
    100 * Math.pow(first.hue / 360 - second.hue / 360, 2) +
    Math.pow(first.saturation - second.saturation, 2) +
    Math.pow(first.light - second.light, 2)
  )
}

/**
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 * @see https://stackoverflow.com/a/54071699/5083247
 * @see https://jsfiddle.net/Lamik/ypqm2xdt/3
 */
function rgbaToHsl(rgba: RGBA) {
  const red = rgba.red / 255
  const green = rgba.green / 255
  const blue = rgba.blue / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const range = max - min

  let hue = 0
  if (range) {
    if (max == red) hue = 60 * (0 + (green - blue) / range)
    if (max == green) hue = 60 * (2 + (blue - red) / range)
    if (max == blue) hue = 60 * (4 + (red - green) / range)
  }

  const f = 1 - Math.abs(max + min - 1)
  const saturation = f ? range / f : 0

  const light = (max + min) / 2
  return { hue: (hue < 0 ? hue + 360 : hue) % 360, saturation, light }
}

export function arrayToRgba(colour: Uint8ClampedArray): RGBA {
  return {
    red: colour[0] ?? 0,
    green: colour[1] ?? 0,
    blue: colour[2] ?? 0,
    alpha: colour[3] ?? 0,
  }
}

export function arrayToRgb(colour: Uint8ClampedArray): RGBA {
  return {
    red: colour[0] ?? 0,
    green: colour[1] ?? 0,
    blue: colour[2] ?? 0,
    alpha: 255,
  }
}

export function arrayToHsl(colour: Uint8ClampedArray): HSL {
  return rgbaToHsl(arrayToRgb(colour))
}

export function hslToString(hsl: HSL): string {
  return `hsl(${hsl.hue}, ${hsl.saturation * 100}%, ${hsl.light * 100}%)`
}
