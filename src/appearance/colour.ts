import Color from "colorjs.io"
import { translate } from "../i18n/translate"
import type { RGBA } from "./rgba"

export class Swatch {
  static readonly black = new Swatch("#000000", translate.colour.black, [
    "#18182A",
    "#363433",
    "#222A32",
  ])
  static readonly blue = new Swatch("#0000FF", translate.colour.blue, [
    "#354466",
    "#1A2656",
  ])
  static readonly brown = new Swatch("#804000", translate.colour.brown, [
    "#87675D",
    "#94797B",
    "#562C27",
    "#A19180",
  ])
  static readonly cyan = new Swatch("#00FFFF", translate.colour.cyan, [
    "#20383E",
    "#2D8D9D",
    "#6E8797",
    "#A3C1D2",
  ])
  static readonly green = new Swatch("#00FF00", translate.colour.green, [
    "#1E6048",
    "#284433",
    "#538B5F",
    "#648B76",
    "#87A186",
    "#DFF0B5",
  ])
  static readonly grey = new Swatch("#808080", translate.colour.grey, [
    "#534E4C",
    "#BBA8AC",
    "#63697F",
    "#979CBB",
    "#89939E",
    "#AFB3B2",
    "#D8D2C9",
    "#C1B8BC",
    "#CBBDB5",
    "#4D5062",
    "#786C76",
  ])
  static readonly magenta = new Swatch("#FF00FF", translate.colour.magenta, [])
  static readonly orange = new Swatch("#FF8000", translate.colour.orange, [
    "#C69F8A",
    "#C46857",
  ])
  static readonly red = new Swatch("#FF0000", translate.colour.red, ["#7C1515"])
  static readonly rose = new Swatch("#FF0080", translate.colour.rose, [
    "#9A6C79",
    "#9B7D8F",
    "#AB8398",
    "#D3ADBA",
    "#E1B9CC",
    "#D4C2CA",
    "#70264C",
  ])
  static readonly violet = new Swatch("#8000FF", translate.colour.violet, [
    "#9685A7",
    "#271A4F",
    "#441151",
    "#462850",
    "#492C71",
    "#846D9E",
    "#E7D3FA",
    "#B38AF9",
    "#4800AE",
    "#343054",
  ])
  static readonly white = new Swatch("#FFFFFF", translate.colour.white, [
    "#C8D0DE",
    "#D3D0EA",
    "#C9C3CD",
    "#F8E3E0",
  ])
  static readonly yellow = new Swatch("#FFFF00", translate.colour.yellow, [
    "#F9ECD2",
    "#F1E5A4",
    "#8A8562",
  ])

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

  readonly colorjsio: Color
  readonly intermediaries: Color[]
  readonly rgba: RGBA

  private constructor(
    public readonly hexadecimal: string,
    public readonly name: string,
    intermediaries: string[]
  ) {
    this.colorjsio = new Color(hexadecimal)
    this.intermediaries = intermediaries.map(i => new Color(i))
    this.rgba = hexToRgba(hexadecimal)
  }

  static findClosestRgb(rgba: RGBA): Swatch {
    return Swatch.getList()
      .sort((a, b) => rgbDistance(a.rgba, rgba) - rgbDistance(b.rgba, rgba))
      .find(Boolean)!
  }

  deltaE2000(colour: Color): number {
    return [...this.intermediaries, this.colorjsio]
      .sort((a, b) => colour.deltaE2000(a) - colour.deltaE2000(b))
      .find(Boolean)!
      .deltaE2000(colour)
  }

  static findClosestDelta(colour: Color): Swatch {
    return Swatch.getList()
      .sort((a, b) => a.deltaE2000(colour) - b.deltaE2000(colour))
      .find(Boolean)!
  }

  static getList(): Swatch[] {
    return [...Swatch.list]
  }
}

export function rgbaToHex(rgba: RGBA): string {
  return `#${[rgba.red, rgba.green, rgba.blue, rgba.alpha]
    .map(c => c.toString(16).padStart(2, "0"))
    .join("")}`
}

export function rgbToHex(rgba: RGBA): string {
  return `#${[rgba.red, rgba.green, rgba.blue]
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

export function arrayToColorJsIo(colour: Uint8ClampedArray): Color {
  return new Color(rgbaToHex(arrayToRgb(colour)))
}
