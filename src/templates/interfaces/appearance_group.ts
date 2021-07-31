import type { Context } from "hogan.js"

export interface AppearanceGroup extends Context {
  category: string
  categoryid: number
  group: number
}
