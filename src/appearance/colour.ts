import { translate } from "../i18n/translate"

export class Colour {
  private constructor(
    readonly hexadecimal: string,
    readonly name: string,
    readonly rgba: RGBA
  ) {}

  static readonly black = new Colour(
    "#000000",
    translate.colour.black,
    toRgba("#000000")
  )
  static readonly blue = new Colour(
    "#0000FF",
    translate.colour.blue,
    toRgba("#0000FF")
  )
  static readonly cyan = new Colour(
    "#00FFFF",
    translate.colour.cyan,
    toRgba("#00FFFF")
  )
  static readonly green = new Colour(
    "#00FF00",
    translate.colour.green,
    toRgba("#00FF00")
  )
  static readonly grey = new Colour(
    "#808080",
    translate.colour.grey,
    toRgba("#808080")
  )
  static readonly magenta = new Colour(
    "#FF00FF",
    translate.colour.magenta,
    toRgba("#FF00FF")
  )
  static readonly orange = new Colour(
    "#FF8000",
    translate.colour.orange,
    toRgba("#FF8000")
  )
  static readonly red = new Colour(
    "#FF0000",
    translate.colour.red,
    toRgba("#FF0000")
  )
  static readonly rose = new Colour(
    "#FF0080",
    translate.colour.rose,
    toRgba("#FF0080")
  )
  static readonly violet = new Colour(
    "#8000FF",
    translate.colour.violet,
    toRgba("#8000FF")
  )
  static readonly white = new Colour(
    "#FFFFFF",
    translate.colour.white,
    toRgba("#FFFFFF")
  )
  static readonly yellow = new Colour(
    "#FFFF00",
    translate.colour.yellow,
    toRgba("#FFFF00")
  )

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
  static getList(): Colour[] {
    return [...Colour.list]
  }

  static findClosestRgb(rgba: RGBA): Colour {
    return Colour.getList()
      .sort((a, b) => rgbDistance(a.rgba, rgba) - rgbDistance(b.rgba, rgba))
      .find(Boolean)!
  }

  static findClosestRgba(rgba: RGBA): Colour {
    return Colour.getList()
      .sort((a, b) => rgbaDistance(a.rgba, rgba) - rgbaDistance(b.rgba, rgba))
      .find(Boolean)!
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

function rgbaDistance(first: RGBA, second: RGBA): number {
  return rgbDistance(first, second) + Math.abs(first.alpha - second.alpha)
}

interface RGBA {
  red: number
  green: number
  blue: number
  alpha: number
}
