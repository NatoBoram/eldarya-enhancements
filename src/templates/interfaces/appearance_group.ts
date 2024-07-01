import type { Context } from "hogan.js"
import type { AppearanceCategory } from "./appearance_category"

export interface AppearanceGroup extends Context, AppearanceCategory {
	readonly itemid: number
	readonly group: number
	readonly name: string
	readonly rarity: string
	readonly rarityname: string
}
