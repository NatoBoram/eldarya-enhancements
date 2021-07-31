import type { Context } from "hogan.js"

export interface AppearanceItem extends Context {
  group: number
  icon: string
  itemid: number
  name: string
  rarity: string
  rarityname: string
}
