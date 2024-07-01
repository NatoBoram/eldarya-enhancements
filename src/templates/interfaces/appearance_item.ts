import type { Context } from "hogan.js"
import type { AppearanceGroup } from "./appearance_group"

export interface AppearanceItem extends Context, AppearanceGroup {
	readonly icon: string
	readonly itemid: number
	readonly name: string
	readonly rarity: string
	readonly rarityname: string
}
