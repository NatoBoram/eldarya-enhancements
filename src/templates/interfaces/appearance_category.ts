import type { Context } from "hogan.js"

export interface AppearanceCategory extends Context {
  readonly categoryid: number
  readonly category: string
  readonly categoryname: string
}
