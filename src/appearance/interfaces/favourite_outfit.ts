import type { ParsableItem } from "./parsable_item"

export interface FavouriteOutfit extends NewFavouriteOutfit {
	readonly id: number
	readonly url: string
}

export interface NewFavouriteOutfit {
	readonly name: string
	readonly items: ParsableItem[]

	readonly blob: Blob
}
