import Color from "colorjs.io"
import { translate } from "../i18n/translate"
import type { HSL } from "./hsl"
import type { RGBA } from "./rgba"

export class Swatch {
  private static readonly black360 = new Swatch(
    "#000000",
    translate.colour.black,
    1,
    360
  )
  private static readonly grey360 = new Swatch(
    "#808080",
    translate.colour.grey,
    1,
    360
  )
  private static readonly red360 = new Swatch(
    "#FF0000",
    translate.colour.red,
    1,
    360
  )
  private static readonly white360 = new Swatch(
    "#FFFFFF",
    translate.colour.white,
    1,
    360
  )

  static readonly black = new Swatch("#000000", translate.colour.black, 2.7)
  static readonly blue = new Swatch("#0000FF", translate.colour.blue)
  static readonly brown = new Swatch("#804000", translate.colour.brown, 1.8)
  static readonly cyan = new Swatch("#00FFFF", translate.colour.cyan, 1.1)
  static readonly green = new Swatch("#00FF00", translate.colour.green, 0.7)
  static readonly grey = new Swatch("#808080", translate.colour.grey, 3.4)
  static readonly magenta = new Swatch("#FF00FF", translate.colour.magenta)
  static readonly orange = new Swatch("#FF8000", translate.colour.orange)
  static readonly red = new Swatch("#FF0000", translate.colour.red, 0.9)
  static readonly rose = new Swatch("#FF0080", translate.colour.rose, 1.3)
  static readonly violet = new Swatch("#8000FF", translate.colour.violet, 0.9)
  static readonly white = new Swatch("#FFFFFF", translate.colour.white, 1.5)
  static readonly yellow = new Swatch("#FFFF00", translate.colour.yellow)

  private static readonly list = [
    Swatch.black,
    Swatch.blue,
    Swatch.brown,
    Swatch.cyan,
    Swatch.green,
    Swatch.grey,
    //Swatch.magenta,
    Swatch.orange,
    Swatch.red,
    Swatch.rose,
    Swatch.violet,
    Swatch.white,
    Swatch.yellow,
  ]

  private static readonly listHsl = [
    ...this.list,
    Swatch.black360,
    Swatch.grey360,
    Swatch.red360,
    Swatch.white360,
  ]

  readonly colorjsio: Color
  readonly hsl: HSL
  readonly rgba: RGBA

  private constructor(
    public readonly hexadecimal: string,
    public readonly name: string,
    public readonly multiplier = 1,
    hue?: number
  ) {
    this.rgba = hexToRgba(hexadecimal)
    const hsl = rgbaToHsl(this.rgba)
    this.hsl = hue ? { ...hsl, hue } : hsl
    this.colorjsio = new Color(hexadecimal)
  }

  static findClosestHsl(hsl: HSL): Swatch {
    return Swatch.getListHsl()
      .sort((a, b) => hslDistance(a.hsl, hsl) - hslDistance(b.hsl, hsl))
      .find(Boolean)!
  }

  static findClosestRgb(rgba: RGBA): Swatch {
    return Swatch.getList()
      .sort(
        (a, b) =>
          rgbDistance(a.rgba, rgba) * a.multiplier -
          rgbDistance(b.rgba, rgba) * b.multiplier
      )
      .find(Boolean)!
  }

  static findClosestDelta(colour: Color): Swatch {
    return Swatch.getList()
      .sort(
        (a, b) =>
          colour.deltaE(a.colorjsio) * a.multiplier -
          colour.deltaE(b.colorjsio) * b.multiplier
      )
      .find(Boolean)!
  }

  static getList(): Swatch[] {
    return [...Swatch.list]
  }

  static getListHsl(): Swatch[] {
    return [...Swatch.listHsl]
  }
}

export function rgbaToHex(rgba: RGBA): string {
  return `#${[rgba.red, rgba.green, rgba.blue, rgba.alpha]
    .map(c => c.toString(16).padStart(2, "0"))
    .join("")}`
}

export function hexToRgba(hex: string): RGBA {
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

function hslDistance(first: HSL, second: HSL): number {
  return (
    Math.pow(first.hue / 360 - second.hue / 360, 2) +
    Math.pow(first.saturation - second.saturation, 2) +
    Math.pow(first.light - second.light, 2)
  )
}

/**
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 * @see https://stackoverflow.com/a/54071699/5083247
 * @see https://jsfiddle.net/Lamik/ypqm2xdt/3
 */
function rgbaToHsl(rgba: RGBA): HSL {
  const red = rgba.red / 255
  const green = rgba.green / 255
  const blue = rgba.blue / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const range = max - min

  let hue = 0
  if (range) {
    if (max === red) hue = 60 * (0 + (green - blue) / range)
    if (max === green) hue = 60 * (2 + (blue - red) / range)
    if (max === blue) hue = 60 * (4 + (red - green) / range)
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

export function arrayToColorJsIo(colour: Uint8ClampedArray): Color {
  return new Color(rgbaToHex(arrayToRgb(colour)))
}
