import type { Rarity } from "../marketplace/enums/rarity.enum"
import type { Type } from "../marketplace/enums/type.enum"

export interface WishedItem {
	icon: string
	name: string
	price: number
	type: Type
	rarity?: Rarity

	/**
	 * Subtitle of a market item under its name or tooltip content of a mall item
	 * in the mall menu
	 */
	abstractType?: string

	/** Latest error received from Eldarya. */
	error?: string
}
