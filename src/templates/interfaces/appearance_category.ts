import type { Context } from "hogan.js"

export interface AppearanceCategory extends Context {
  categoryid: number
  category: string
  categoryname: string
}
