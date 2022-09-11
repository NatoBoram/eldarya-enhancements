import { translate } from "../i18n/translate"
import type { RGBA } from "./rgba"

export class Colour {
  static readonly black = new Colour("#000000", translate.colour.black)
  static readonly blue = new Colour("#0000FF", translate.colour.blue)
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
    Colour.blue,
    Colour.cyan,
    Colour.green,
    Colour.grey,
    Colour.magenta,
    Colour.orange,
    Colour.red,
    Colour.rose,
    Colour.violet,
    Colour.white,
    Colour.yellow,
  ]

  readonly rgba: RGBA

  private constructor(
    public readonly hexadecimal: string,
    public readonly name: string
  ) {
    this.rgba = toRgba(hexadecimal)
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

function rgbDistance(first: RGBA, second: RGBA): number {
  return (
    Math.abs(first.red - second.red) +
    Math.abs(first.green - second.green) +
    Math.abs(first.blue - second.blue)
  )
}
