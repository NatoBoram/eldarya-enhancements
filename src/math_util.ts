export class MathUtil {
  static readonly phi = (1 + Math.sqrt(5)) / 2

  static randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }
}
