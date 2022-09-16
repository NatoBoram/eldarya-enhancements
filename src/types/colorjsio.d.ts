/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

declare module "colorjs.io" {
  /**
   * Class that represents a color
   */
  export default class Color {
    #private
    alpha: any
    coords: any

    /**
     * Creates an instance of Color.
     * Signatures:
     * - `new Color(stringToParse)`
     * - `new Color(otherColor)`
     * - `new Color({space, coords, alpha})`
     * - `new Color(space, coords, alpha)`
     * - `new Color(spaceId, coords, alpha)`
     */
    constructor(...args: unknown[])

    get space(): any
    get spaceId(): any

    static defineFunction(name: any, code: any, o?: any, ...args: any[]): void
    static defineFunctions(o: any): void
    static extend(exports: any): void

    /**
     * Get a color from the argument passed
     * Basically gets us the same result as new Color(color) but doesn't clone an existing color object
     */
    static get(color: any, ...args: any[]): Color

    clone(): Color
    deltaE(c2: Color, o?: string): number
    deltaE2000(
      color: Color,
      sample?: any,
      { kL, kC, kH }?: { kL?: number; kC?: number; kH?: number }
    ): number
    deltaE76(color: Color, sample?: any): number
    deltaECMC(
      color: Color,
      sample?: any,
      { l, c }?: { l?: number; c?: number }
    ): number
    deltaEITP(color: Color, sample?: any): number
    deltaEJz(color: Color, sample?: any): number
    deltaEOK(color: Color, sample?: any): number
    display(...args: any[]): string

    /**
     * Euclidean distance of colors in an arbitrary color space
     */
    distance(color2: Color, space?: string): number
    equals(color1: any, color2: any): any
    get(color: any, prop: any): number

    /**
     * Get the coordinates of a color in another color space
     *
     * @param {string | ColorSpace} space
     * @returns {number[]}
     */
    getAll(color: any, space: ColorSpace | string): number[]

    /**
     * Check if a color is in gamut of either its own or another color space
     * @return {Boolean} Is the color in gamut?
     */
    inGamut(
      color: any,
      space?: any,
      { epsilon }?: { epsilon?: number }
    ): boolean
    set(color: any, prop: any, value: any, ...args: any[]): any
    setAll(color: any, space: any, coords: any): any

    /**
     * Convert to color space and return a new color
     * @param {Object|string} space - Color space object or id
     * @param {Object} options
     * @param {boolean} options.inGamut - Whether to force resulting color in gamut
     * @returns {Color}
     */
    to(color: any, space: any | string, { inGamut }?: { inGamut: any }): Color

    /**
     * Force coordinates to be in gamut of a certain color space.
     * Mutates the color it is passed.
     * @param {Object} options
     * @param {string} options.method - How to force into gamut.
     *        If "clip", coordinates are just clipped to their reference range.
     *        If in the form [colorSpaceId].[coordName], that coordinate is reduced
     *        until the color is in gamut. Please note that this may produce nonsensical
     *        results for certain coordinates (e.g. hue) or infinite loops if reducing the coordinate never brings the color in gamut.
     * @param {ColorSpace|string} options.space - The space whose gamut we want to map to
     */
    toGamut(
      color: any,
      { method, space }?: { method?: string; space?: any },
      ...args: any[]
    ): any
    toJSON(): { spaceId: any; coords: any; alpha: any }

    /**
     * Generic toString() method, outputs a color(spaceId ...coords) function, a functional syntax, or custom formats defined by the color space
     * @param {Object} options
     * @param {number} options.precision - Significant digits
     * @param {boolean} options.inGamut - Adjust coordinates to fit in gamut first? [default: false]
     */
    toString(
      color: any,
      {
        precision,
        format,
        inGamut,
        ...customOptions
      }?: { precision?: number; format?: string; inGamut?: boolean }
    ): any
  }
}
